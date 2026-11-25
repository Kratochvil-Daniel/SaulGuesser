create table if not exists public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  score integer not null check (score between 0 and 10),
  avg_seconds numeric(4, 2) not null check (avg_seconds between 0 and 10),
  created_at timestamptz not null default now()
);

alter table public.leaderboard_entries enable row level security;

revoke all on public.leaderboard_entries from anon, authenticated;
grant select, insert on public.leaderboard_entries to anon, authenticated;

drop policy if exists "Anyone can read leaderboard entries" on public.leaderboard_entries;
create policy "Anyone can read leaderboard entries"
  on public.leaderboard_entries
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can submit leaderboard entries" on public.leaderboard_entries;
create policy "Anyone can submit leaderboard entries"
  on public.leaderboard_entries
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 40
    and score between 0 and 10
    and avg_seconds between 0 and 10
    and created_at <= now()
    and created_at >= now() - interval '5 minutes'
  );

create index if not exists leaderboard_entries_created_at_score_idx
  on public.leaderboard_entries (created_at desc, score desc, avg_seconds asc);

create table if not exists public.album_quiz_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  score integer not null check (score between 0 and 15),
  avg_seconds numeric(5, 2) not null check (avg_seconds between 0 and 15),
  created_at timestamptz not null default now()
);

alter table public.album_quiz_entries
  add column if not exists avg_seconds numeric(5, 2) not null default 0;

alter table public.album_quiz_entries
  drop constraint if exists album_quiz_entries_avg_seconds_check;

alter table public.album_quiz_entries
  add constraint album_quiz_entries_avg_seconds_check
  check (avg_seconds between 0 and 15);

alter table public.album_quiz_entries enable row level security;

revoke all on public.album_quiz_entries from anon, authenticated;
grant select, insert on public.album_quiz_entries to anon, authenticated;

drop policy if exists "Anyone can read album quiz entries" on public.album_quiz_entries;
create policy "Anyone can read album quiz entries"
  on public.album_quiz_entries
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can submit album quiz entries" on public.album_quiz_entries;
create policy "Anyone can submit album quiz entries"
  on public.album_quiz_entries
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 40
    and score between 0 and 15
    and avg_seconds between 0 and 15
    and created_at <= now()
    and created_at >= now() - interval '5 minutes'
  );

create index if not exists album_quiz_entries_created_at_score_idx
  on public.album_quiz_entries (created_at desc, score desc, avg_seconds asc);

create table if not exists public.daily_saul_completions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  completed_at timestamptz not null default now()
);

create index if not exists daily_saul_completions_user_completed_idx
  on public.daily_saul_completions (user_id, completed_at desc);

alter table public.daily_saul_completions enable row level security;
revoke all on public.daily_saul_completions from anon, authenticated;

create or replace function public.get_daily_saul_quota()
returns table (allowed boolean, remaining integer, reset_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  requesting_user uuid := auth.uid();
  completed_count bigint;
  first_completion timestamptz;
begin
  if requesting_user is null then
    raise exception 'Daily Saul requires an authenticated user';
  end if;

  delete from public.daily_saul_completions
  where user_id = requesting_user
    and completed_at <= now() - interval '30 minutes';

  select count(*), min(completed_at)
    into completed_count, first_completion
  from public.daily_saul_completions
  where user_id = requesting_user
    and completed_at > now() - interval '30 minutes';

  return query
    select completed_count < 5,
      greatest(5 - completed_count, 0)::integer,
      case when completed_count >= 5
        then first_completion + interval '30 minutes'
        else null::timestamptz
      end;
end;
$$;

create or replace function public.complete_daily_saul_game()
returns table (allowed boolean, remaining integer, reset_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  requesting_user uuid := auth.uid();
  completed_count bigint;
  first_completion timestamptz;
begin
  if requesting_user is null then
    raise exception 'Daily Saul requires an authenticated user';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(requesting_user::text, 0)
  );

  delete from public.daily_saul_completions
  where user_id = requesting_user
    and completed_at <= now() - interval '30 minutes';

  select count(*), min(completed_at)
    into completed_count, first_completion
  from public.daily_saul_completions
  where user_id = requesting_user
    and completed_at > now() - interval '30 minutes';

  if completed_count >= 5 then
    return query
      select false, 0::integer, first_completion + interval '30 minutes';
    return;
  end if;

  insert into public.daily_saul_completions (user_id) values (requesting_user);
  completed_count := completed_count + 1;

  return query
    select true,
      greatest(5 - completed_count, 0)::integer,
      case when completed_count >= 5
        then coalesce(first_completion, now()) + interval '30 minutes'
        else null::timestamptz
      end;
end;
$$;

revoke all on function public.get_daily_saul_quota() from public, anon, authenticated;
revoke all on function public.complete_daily_saul_game() from public, anon, authenticated;
grant execute on function public.get_daily_saul_quota() to authenticated;
grant execute on function public.complete_daily_saul_game() to authenticated;
