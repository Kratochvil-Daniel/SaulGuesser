import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase, supabaseConfigError, supabaseConfigured } from './lib/supabase.js';

const songs = [
  { id: 1, title: 'Bliss', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Bliss.mp3' },
  { id: 2, title: 'Exit', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Exit.mp3' },
  { id: 3, title: 'Mayday', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Mayday.mp3' },
  { id: 4, title: 'Moment', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Moment.mp3' },
  { id: 5, title: 'Niekde v oblakoch', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Niekde-v-oblakoch.mp3' },
  { id: 6, title: 'Nový svet', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Novy-svet.mp3' },
  { id: 7, title: 'Premena', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Premena.mp3' },
  { id: 8, title: 'Satén', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Saten.mp3' },
  { id: 9, title: 'Spoločnosť', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Spolocnost.mp3' },
  { id: 10, title: 'Temné miesta', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Temne-miesta.mp3' },
  { id: 11, title: 'Vertigo', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Vertigo.mp3' },
  { id: 12, title: 'Za obzory', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Za-obzory.mp3' },
  { id: 13, title: 'Do nebe', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Do-nebe.mp3' },
  { id: 14, title: 'Kde boli', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Kde-boli.mp3' },
  { id: 15, title: 'Kým sa zobudí', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Kym-sa-zobudi.mp3' },
  { id: 16, title: 'Málo', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Malo.mp3' },
  { id: 17, title: 'Mezi prsty', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Mezi-prsty.mp3' },
  { id: 18, title: 'Nejsem sám', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Nejsem-sam.mp3' },
  { id: 19, title: 'Neuvidia', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Neuvidia.mp3' },
  { id: 20, title: 'Od nekonečna do dávna', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Od-nekonecna-do-davna.mp3' },
  { id: 21, title: 'Vrav menej, hýb sa viac', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Vrav-menej-hyb-sa-viac.mp3' },
  { id: 22, title: 'Zrkadla', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Zrkadla.mp3' },
  { id: 23, title: 'Chaoz teraz', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Chaoz-teraz.mp3' },
  { id: 24, title: 'Chaoz vtedy (interlude)', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Chaoz-vtedy-interlude.mp3' },
  { id: 25, title: 'Dosť hodín', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Dost-hodin.mp3' },
  { id: 26, title: 'Echo', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Echo.mp3' },
  { id: 27, title: 'Eufória', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Euforia.mp3' },
  { id: 28, title: 'Krv', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Krv.mp3' },
  { id: 29, title: 'Nostalgia', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Nostalgia.mp3' },
  { id: 30, title: 'Panoptikon', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Panoptikon.mp3' },
  { id: 31, title: 'Plán', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Plan.mp3' },
  { id: 32, title: 'Prišli a zmizli', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Prisli-a-zmizli.mp3' },
  { id: 33, title: 'Raz budem chápať', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Raz-budem-chapat.mp3' },
  { id: 34, title: 'Ringere', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Ringere.mp3' },
  { id: 35, title: 'Salme', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Salme.mp3' },
  { id: 36, title: 'Slnovrat', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Slnovrat.mp3' },
  { id: 37, title: 'Spln a nov', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Spln-a-nov.mp3' },
  { id: 38, title: 'Správny čas', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Spravny-cas.mp3' },
  { id: 39, title: '471', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/471.mp3' },
  { id: 40, title: 'Cestou časom', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Cestou-casom.mp3' },
  { id: 41, title: 'Hotel', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Hotel.mp3' },
  { id: 42, title: 'O.K.', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Ok.mp3' },
  { id: 43, title: 'Byť tu navždy', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Byt-tu-navzdy.mp3' },
  { id: 44, title: 'Carmen', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Carmen.mp3' },
  { id: 45, title: 'Dažď', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Dazd.mp3' },
  { id: 46, title: 'Diabol je preodetý', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Diabol-je-preodety.mp3' },
  { id: 47, title: 'Král nad ránom', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Kral-nad-ranom.mp3' },
  { id: 48, title: 'Mali', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Mali.mp3' },
  { id: 49, title: 'Na očiach vyryté', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Na-ociach-vyryte.mp3' },
  { id: 50, title: 'Prázdnym rukám', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Prazdnym-rukam.mp3' },
  { id: 51, title: 'Pre dni', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Pre-dni.mp3' },
  { id: 52, title: 'S tým, čo mám', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/S-tym-co-mam.mp3' },
  { id: 53, title: 'Stále ale môžeme ožiť', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Stale-ale-mozeme-ozit.mp3' },
  { id: 54, title: 'Tiché vody', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Tiche-vody.mp3' },
  { id: 55, title: 'Trpezlivosť', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Trpenzlivost.mp3' },
  { id: 56, title: 'Včera mi zhorel dom', album: 'Agónia & Extáza', previewUrl: '/songs/Album/Agonia-Extaza/Vcera-mi-zhorel-dom.mp3' },
  { id: 57, title: 'Motýľ', album: 'Agónia & Extáza', previewUrl: '/songs/Album/Agonia-Extaza/Motyl.mp3' },
];

const saulSingles = [
  { id: 1, title: 'Nwm Čo Príde Zajtra', album: 'Nwm Čo Príde Zajtra', previewUrl: '/songs/Singles/Nwm-co-pride-zajtra.mp3' },
  { id: 2, title: 'Tvoje Slzy Hasia Moje Peklo', album: 'Tvoje Slzy Hasia Moje Peklo', previewUrl: '/songs/Singles/Tvoje-slzy-hasia.mp3' },
  { id: 3, title: 'Za Obzory - Hujdy Remix', album: 'Za Obzory (Hujdy Remix)', previewUrl: '/songs/Singles/za-obzory-remix.mp3' },
  

];

const featSongs = [
  { id: 1, title: '4eva - Dalyb', album: 'TEEN(R)AGE', previewUrl: '/songs/Feats/4eva.mp3' },
  { id: 2, title: 'ARA - Zayo', album: 'ADHD', previewUrl: '/songs/Feats/ARA.mp3' },
  { id: 3, title: 'BEZ SLOV RMX - Shimmi', album: 'KIDDO', previewUrl: '/songs/Feats/BEZ-SLOV-RMX.mp3' },
  { id: 4, title: 'Boží Mlýny Melou Furt - Yzomandias', album: 'Kruhy & Vlny (217 Twins Edition)', previewUrl: '/songs/Feats/Bozi-mlyny-melou-furt.mp3' },
  { id: 5, title: 'Cesta Za Sluncem - Hasan', album: 'Space Blues Music', previewUrl: '/songs/Feats/Cesta-Za-Sluncem.mp3' },
  { id: 6, title: 'Čo bolo včera - Nicholas Naison', album: 'SNY II', previewUrl: '/songs/Feats/Co-bolo-vcera.mp3' },
  { id: 7, title: 'VERÍME - Ego', album: 'MIER', previewUrl: '/songs/Feats/VERIME.mp3' },
  { id: 8, title: 'Nemůžu Tě Soudit - Hasan', album: 'Album, co mi změnilo život', previewUrl: '/songs/Feats/Nemuzu-te-soudit.mp3' },
  { id: 9, title: 'Voľný Pád - Hujdy', album: 'Voľný Pád', previewUrl: '/songs/Feats/Volny-pad.mp3' },
  { id: 10, title: 'LOW&HIGH - Zayo', album: 'HAPPY HALLOWEEN', previewUrl: '/songs/Feats/LOW-HIGH.mp3' },
  { id: 11, title: 'Nahotel - VR/NOBODY', album: 'Zelený oči černý srdce', previewUrl: '/songs/Feats/Nahotel.mp3' },
  { id: 12, title: 'Noc - Duch', album: 'Adhdkidd', previewUrl: '/songs/Feats/Noc.mp3' },
  { id: 13, title: 'OHEN - Porshe Boy, WEN', album: 'EAST SIDE SOUND 2', previewUrl: '/songs/Feats/OHEN.mp3' },
  { id: 14, title: 'PANTOMIMA - WEN', album: 'Tiene Svetla: Chapter 2', previewUrl: '/songs/Feats/PANTOMIMA.mp3' },
  { id: 15, title: 'Percepcia - YOO', album: 'TRIP TO 67', previewUrl: '/songs/Feats/Percepcia.mp3' },
  { id: 16, title: 'RiSK - WEN', album: 'LiGHT BLUE', previewUrl: '/songs/Feats/RiSK.mp3' },
  { id: 17, title: 'S tebou - Hasan', album: 'Space', previewUrl: '/songs/Feats/S-tebou.mp3' },
  { id: 18, title: 'lotus - Samey', album: 'XYZ', previewUrl: '/songs/Feats/lotus.mp3' },
  { id: 19, title: 'malaga - Samey', album: 'Slzy Ulic', previewUrl: '/songs/Feats/malaga.mp3' },
  { id: 20, title: 'Nadej - Samey', album: 'Nadej', previewUrl: '/songs/Feats/Nadej.mp3' },
  { id: 21, title: 'tma - Samey', album: 'Anarchia', previewUrl: '/songs/Feats/tma.mp3' },
  { id: 22, title: 'Vlasy Vejou Vo Vetru - Samey', album: 'Mama Neviem Kedy Pridem Domov', previewUrl: '/songs/Feats/Vlasy-Vejou-Vo-Vetru.mp3' },
  { id: 23, title: 'Nočná - Separ', album: 'FLOWDEMORT', previewUrl: '/songs/Feats/Nocna.mp3' },
  { id: 24, title: 'Jedna noc a jedno rano - SIMILIVINLIFE', album: '23:69', previewUrl: '/songs/Feats/Jedna-noc-a-jedno-rano.mp3' },
  { id: 25, title: 'so mnou - Hujdy', album: 'Split', previewUrl: '/songs/Feats/so-mnou.mp3' },
  { id: 26, title: 'sober - Porshe Boy', album: 'BREAKUP PARTY', previewUrl: '/songs/Feats/sober.mp3' },
  { id: 27, title: 'TOČIMTOČIMTOČIM - Annet X', album: 'KOUKEJ SE MNOU', previewUrl: '/songs/Feats/tocim.mp3' },
  { id: 28, title: 'Vášeň - Loudz1', album: 'Cloud', previewUrl: '/songs/Feats/Vasen.mp3' },
  { id: 29, title: 'Cígo a káva - Viktor Sheen', album: 'Impostor syndrom', previewUrl: '/songs/Feats/cigo-kava.mp3' },
  { id: 30, title: 'No Offence - WEN', album: 'Tiene Svetla: Chapter 1', previewUrl: '/songs/Feats/No-Offence.mp3' },
  { id: 31, title: 'NFS - Yzomandias', album: 'J.EDEN E-G3N (#freekarlo edition)', previewUrl: '/songs/Feats/NFS.mp3' },
  { id: 32, title: 'Zavři Oči - Shimmi', album: 'YO', previewUrl: '/songs/Feats/Zavri-oci.mp3' },
  
];

const mysterySongs = [
  ...songs.map((song) => ({ ...song, sourceType: 'album' })),
  ...featSongs.map((song) => ({ ...song, sourceType: 'feat' })),
  ...saulSingles.map((song) => ({ ...song, sourceType: 'single' })),
];

const albumOptions = [...new Set(songs.map((song) => song.album))];
const albumCoverFiles = {
  'Niekde v oblakoch': 'niekde-v-oblakoch.webp',
  'Od Nekonečna Do Dávna': 'ondd.webp',
  'Chaos, Vtedy a Teraz': 'chaos.webp',
  'Hotel 471': 'hotel471.webp',
  'S.A.M.O': 'samo.webp',
  'Agónia & Extáza': 'agonia-extaza.webp',
};

const shuffleSongDeck = (songList) => {
  const shuffledSongs = [...songList];
  for (let currentIndex = shuffledSongs.length - 1; currentIndex > 0; currentIndex -= 1) {
    const swapIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledSongs[currentIndex], shuffledSongs[swapIndex]] = [
      shuffledSongs[swapIndex],
      shuffledSongs[currentIndex],
    ];
  }
  return shuffledSongs;
};

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeAnswer = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim();

const LEADERBOARD_STORAGE_KEY = 'saulguesser_leaderboard';
const ALBUM_LEADERBOARD_STORAGE_KEY = 'saulguesser_album_quiz_leaderboard';
const LEADERBOARD_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const LEADERBOARD_TABLE = 'leaderboard_entries';
const ALBUM_LEADERBOARD_TABLE = 'album_quiz_entries';
const DAILY_SAUL_LEADERBOARD_STORAGE_KEY = 'saulguesser_daily_saul_leaderboard';
const DAILY_SAUL_LEADERBOARD_TABLE = 'daily_saul_entries';
const DAILY_SAUL_SESSION_STORAGE_KEY = 'saulguesser_daily_saul_session';
const DAILY_SAUL_MAX_POINTS = 10;
const LEADERBOARD_LIMIT = 100;
const DAILY_SAUL_COMPLETION_STORAGE_KEY = 'saulguesser_daily_saul_completions';
const DAILY_SAUL_LIMIT = 5;
const DAILY_SAUL_WINDOW_MS = 30 * 60 * 1000;

const getDailySaulQuotaFromTimestamps = (timestamps) => {
  const now = Date.now();
  const sortedTimestamps = timestamps
    .map((timestamp) => new Date(timestamp).getTime())
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  let cycle = [];
  let lockedUntil = null;
  sortedTimestamps.forEach((timestamp) => {
    if (lockedUntil !== null && timestamp < lockedUntil) return;
    if (lockedUntil !== null) {
      cycle = [];
      lockedUntil = null;
    }
    cycle = cycle.filter((completion) => timestamp - completion < DAILY_SAUL_WINDOW_MS);
    cycle.push(timestamp);
    if (cycle.length >= DAILY_SAUL_LIMIT) lockedUntil = timestamp + DAILY_SAUL_WINDOW_MS;
  });

  if (lockedUntil !== null && now < lockedUntil) {
    return { allowed: false, remaining: 0, resetAt: new Date(lockedUntil) };
  }

  const activeCount = lockedUntil !== null
    ? 0
    : cycle.filter((completion) => now - completion < DAILY_SAUL_WINDOW_MS).length;
  const remaining = Math.max(0, DAILY_SAUL_LIMIT - activeCount);
  return { allowed: remaining > 0, remaining, resetAt: null };
};

const loadLocalDailySaulCompletions = () => {
  try {
    const stored = window.localStorage.getItem(DAILY_SAUL_COMPLETION_STORAGE_KEY);
    const timestamps = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    const recentTimestamps = Array.isArray(timestamps)
      ? timestamps.filter((timestamp) => {
        const completionTime = new Date(timestamp).getTime();
        // A lockout can end up to 2 windows after the oldest game of its cycle.
        return Number.isFinite(completionTime) && now - completionTime < 2 * DAILY_SAUL_WINDOW_MS;
      })
      : [];
    window.localStorage.setItem(DAILY_SAUL_COMPLETION_STORAGE_KEY, JSON.stringify(recentTimestamps));
    return recentTimestamps;
  } catch (error) {
    throw new Error('Nepodařilo se načíst limit Daily Saul z tohoto prohlížeče.', { cause: error });
  }
};

const ensureDailySaulUser = async () => {
  if (!supabase) return null;

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (sessionData.session?.user) return sessionData.session.user.id;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    throw new Error('Pro limit Daily Saul zapni v Supabase Anonymous Sign-Ins.', { cause: error });
  }
  return data.user.id;
};

const normalizeDailySaulQuota = (data) => {
  const row = Array.isArray(data) ? data[0] : data;
  return {
    allowed: Boolean(row?.allowed),
    remaining: Number(row?.remaining ?? 0),
    resetAt: row?.reset_at ? new Date(row.reset_at) : null,
  };
};

const getDailySaulQuota = async () => {
  if (!supabase) return getDailySaulQuotaFromTimestamps(loadLocalDailySaulCompletions());

  await ensureDailySaulUser();
  const { data, error } = await supabase.rpc('get_daily_saul_quota');
  if (error) throw error;
  return normalizeDailySaulQuota(data);
};

const recordDailySaulCompletion = async () => {
  if (!supabase) {
    const completions = loadLocalDailySaulCompletions();
    const currentQuota = getDailySaulQuotaFromTimestamps(completions);
    if (!currentQuota.allowed) return currentQuota;

    const updatedCompletions = [...completions, new Date().toISOString()];
    window.localStorage.setItem(DAILY_SAUL_COMPLETION_STORAGE_KEY, JSON.stringify(updatedCompletions));
    return getDailySaulQuotaFromTimestamps(updatedCompletions);
  }

  await ensureDailySaulUser();
  const { data, error } = await supabase.rpc('complete_daily_saul_game');
  if (error) throw error;
  return normalizeDailySaulQuota(data);
};

const purgeOldEntries = (entries) => {
  const now = Date.now();
  return entries.filter((entry) => {
    const entryTime = new Date(entry.timestamp).getTime();
    return Number.isFinite(entryTime) && now - entryTime <= LEADERBOARD_RETENTION_MS;
  });
};

const loadLocalLeaderboard = (storageKey = LEADERBOARD_STORAGE_KEY) => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(storageKey);
    const entries = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(entries)) throw new Error('Lokální leaderboard má neplatný formát.');
    const filtered = purgeOldEntries(entries);
    if (filtered.length !== entries.length) {
      window.localStorage.setItem(storageKey, JSON.stringify(filtered));
    }
    return filtered;
  } catch (error) {
    throw new Error('Nepodařilo se načíst leaderboard z tohoto prohlížeče.', { cause: error });
  }
};

const mapAlbumLeaderboardRow = ({ id, name, score, avg_seconds, created_at }) => ({
  id,
  name,
  score,
  avgSeconds: Number(avg_seconds),
  timestamp: created_at,
});

const mapLeaderboardRow = ({ id, name, score, avg_seconds, created_at }) => ({
  id,
  name,
  score,
  avgSeconds: Number(avg_seconds),
  timestamp: created_at,
});

const loadLeaderboard = async () => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) return loadLocalLeaderboard();

  const { data, error } = await supabase
    .from(LEADERBOARD_TABLE)
    .select('id, name, score, avg_seconds, created_at')
    .gte('created_at', new Date(Date.now() - LEADERBOARD_RETENTION_MS).toISOString())
    .order('score', { ascending: false })
    .order('avg_seconds', { ascending: true })
    .limit(LEADERBOARD_LIMIT);

  if (error) throw error;
  return data.map(mapLeaderboardRow);
};

const loadAlbumLeaderboard = async () => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) return loadLocalLeaderboard(ALBUM_LEADERBOARD_STORAGE_KEY);

  const { data, error } = await supabase
    .from(ALBUM_LEADERBOARD_TABLE)
    .select('id, name, score, avg_seconds, created_at')
    .gte('created_at', new Date(Date.now() - LEADERBOARD_RETENTION_MS).toISOString())
    .order('score', { ascending: false })
    .order('avg_seconds', { ascending: true })
    .limit(LEADERBOARD_LIMIT);

  if (error) throw error;
  return data.map(mapAlbumLeaderboardRow);
};

const saveAlbumLeaderboardEntry = async ({ name, score, avgSeconds }) => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) {
    const timestamp = new Date().toISOString();
    const entry = {
      id: `${Date.now()}-${name}`,
      name,
      score,
      avgSeconds,
      timestamp,
    };
    const entries = purgeOldEntries([
      ...loadLocalLeaderboard(ALBUM_LEADERBOARD_STORAGE_KEY),
      entry,
    ]);
    window.localStorage.setItem(ALBUM_LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
    return entry;
  }

  const { data, error } = await supabase
    .from(ALBUM_LEADERBOARD_TABLE)
    .insert({ name, score, avg_seconds: avgSeconds })
    .select('id, name, score, avg_seconds, created_at')
    .single();

  if (error) throw error;
  return mapAlbumLeaderboardRow(data);
};

const loadDailySaulLeaderboard = async () => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) return loadLocalLeaderboard(DAILY_SAUL_LEADERBOARD_STORAGE_KEY);

  const { data, error } = await supabase
    .from(DAILY_SAUL_LEADERBOARD_TABLE)
    .select('id, name, score, avg_seconds, created_at')
    .gte('created_at', new Date(Date.now() - LEADERBOARD_RETENTION_MS).toISOString())
    .order('score', { ascending: false })
    .order('avg_seconds', { ascending: true })
    .limit(LEADERBOARD_LIMIT);

  if (error) throw error;
  return data.map(mapLeaderboardRow);
};

const saveDailySaulLeaderboardEntry = async ({ name, score, avgSeconds }) => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) {
    const entry = {
      id: `${Date.now()}-${name}`,
      name,
      score,
      avgSeconds,
      timestamp: new Date().toISOString(),
    };
    const entries = purgeOldEntries([
      ...loadLocalLeaderboard(DAILY_SAUL_LEADERBOARD_STORAGE_KEY),
      entry,
    ]);
    window.localStorage.setItem(DAILY_SAUL_LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
    return entry;
  }

  const { data, error } = await supabase
    .from(DAILY_SAUL_LEADERBOARD_TABLE)
    .insert({ name, score, avg_seconds: avgSeconds })
    .select('id, name, score, avg_seconds, created_at')
    .single();

  if (error) throw error;
  return mapLeaderboardRow(data);
};

const emptyDailySaulSession = () => ({ games: [], registered: false });

const loadDailySaulSession = () => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(DAILY_SAUL_SESSION_STORAGE_KEY) || 'null');
    if (!stored || !Array.isArray(stored.games)) return emptyDailySaulSession();
    return {
      games: stored.games
        .filter((game) => Number.isFinite(game?.points) && Number.isFinite(game?.seconds))
        .slice(0, DAILY_SAUL_LIMIT),
      registered: Boolean(stored.registered),
    };
  } catch {
    return emptyDailySaulSession();
  }
};

const saveDailySaulSession = (session) => {
  try {
    window.localStorage.setItem(DAILY_SAUL_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // The session still lives in React state for this visit.
  }
};

const saveLeaderboardEntry = async ({ name, score, avgSeconds }) => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) {
    const timestamp = new Date().toISOString();
    const entry = {
      id: `${Date.now()}-${name}`,
      name,
      score,
      avgSeconds,
      timestamp,
    };
    const entries = purgeOldEntries([...loadLocalLeaderboard(), entry]);
    window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
    return entry;
  }

  const { data, error } = await supabase
    .from(LEADERBOARD_TABLE)
    .insert({ name, score, avg_seconds: avgSeconds })
    .select('id, name, score, avg_seconds, created_at')
    .single();

  if (error) throw error;
  return mapLeaderboardRow(data);
};

const formatCountdown = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const getAssetUrl = (path) => {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;

  const basePath = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}${normalizedPath}`;
};

const getSongPreviewUrl = (song) => {
  if (song.previewUrl) return getAssetUrl(song.previewUrl);
  const folder = song.albumFolder ? song.albumFolder : slugify(song.album);
  return getAssetUrl(`/songs/Album/${folder}/${slugify(song.title)}.mp3`);
};

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isPlayButtonSpinning, setIsPlayButtonSpinning] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentView, setCurrentView] = useState('game');
  const [mysteryStatus, setMysteryStatus] = useState('idle');
  const [mysteryPhase, setMysteryPhase] = useState('type');
  const [mysterySong, setMysterySong] = useState(null);
  const [mysteryTypeGuess, setMysteryTypeGuess] = useState('');
  const [mysteryAlbumGuess, setMysteryAlbumGuess] = useState('');
  const [mysteryTitleGuess, setMysteryTitleGuess] = useState('');
  const [mysteryAlbumHints, setMysteryAlbumHints] = useState(0);
  const [mysteryTitleHints, setMysteryTitleHints] = useState(0);
  const [mysteryAlbumRevealed, setMysteryAlbumRevealed] = useState(false);
  const [mysteryAnswerStatus, setMysteryAnswerStatus] = useState('idle');
  const [mysteryFeedback, setMysteryFeedback] = useState('');
  const [mysteryQuota, setMysteryQuota] = useState(null);
  const [isMysteryQuotaLoading, setIsMysteryQuotaLoading] = useState(false);
  const [mysteryQuotaError, setMysteryQuotaError] = useState('');
  const [mysteryQuotaMessage, setMysteryQuotaMessage] = useState('');
  const [mysteryQuotaNow, setMysteryQuotaNow] = useState(() => Date.now());
  const [mysteryRoundPoints, setMysteryRoundPoints] = useState(null);
  const [dailySaulSession, setDailySaulSession] = useState(loadDailySaulSession);
  const [dailySaulLeaderboard, setDailySaulLeaderboard] = useState([]);
  const [isDailySaulLeaderboardLoading, setIsDailySaulLeaderboardLoading] = useState(true);
  const [dailySaulLeaderboardError, setDailySaulLeaderboardError] = useState('');
  const [dailySaulPlayerName, setDailySaulPlayerName] = useState('');
  const [isDailySaulSubmitting, setIsDailySaulSubmitting] = useState(false);
  const [dailySaulSubmitMessage, setDailySaulSubmitMessage] = useState('');
  const [isMysteryAudioPlaying, setIsMysteryAudioPlaying] = useState(false);
  const [mysteryAudioError, setMysteryAudioError] = useState('');
  const [includeFeats, setIncludeFeats] = useState(false);
  const [albumQuizStatus, setAlbumQuizStatus] = useState('idle');
  const [albumQuizSong, setAlbumQuizSong] = useState(null);
  const [albumQuizTimeLeft, setAlbumQuizTimeLeft] = useState(15);
  const [albumQuizScore, setAlbumQuizScore] = useState({ correct: 0, total: 0 });
  const [albumQuizTimes, setAlbumQuizTimes] = useState([]);
  const [albumQuizAverageTime, setAlbumQuizAverageTime] = useState(0);
  const [albumQuizFeedback, setAlbumQuizFeedback] = useState(null);
  const [albumQuizAudioError, setAlbumQuizAudioError] = useState('');
  const [isAlbumQuizPlaying, setIsAlbumQuizPlaying] = useState(false);
  const [viewTransitionPhase, setViewTransitionPhase] = useState('idle');
  const [leaderboard, setLeaderboard] = useState([]);
  const [albumLeaderboard, setAlbumLeaderboard] = useState([]);
  const [leaderboardCategory, setLeaderboardCategory] = useState('song');
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [isAlbumLeaderboardLoading, setIsAlbumLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [albumLeaderboardError, setAlbumLeaderboardError] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [albumPlayerName, setAlbumPlayerName] = useState('');
  const [isAlbumRegistered, setIsAlbumRegistered] = useState(false);
  const [isAlbumSubmitting, setIsAlbumSubmitting] = useState(false);
  const [albumSubmitMessage, setAlbumSubmitMessage] = useState('');
  const [gameTimes, setGameTimes] = useState([]);
  const [submitMessage, setSubmitMessage] = useState('');
  const [countdownValue, setCountdownValue] = useState(3);
  const [roundStatus, setRoundStatus] = useState('ready');

  const audioRef = useRef(null);
  const previewTimerRef = useRef(null);
  const countdownRef = useRef(null);
  const roundCountdownRef = useRef(null);
  const nextRoundTimeoutRef = useRef(null);
  const currentSongRef = useRef(null);
  const songDeckRef = useRef([]);
  const albumQuizSongDeckRef = useRef([]);
  const mysterySongDeckRef = useRef([]);
  const mysteryAnswerTimeoutRef = useRef(null);
  const mysteryStartPendingRef = useRef(false);
  const mysteryCompletionRecordedRef = useRef(false);
  const mysteryMistakesRef = useRef(0);
  const mysteryRoundStartRef = useRef(0);
  const albumQuizSongRef = useRef(null);
  const albumQuizRoundActiveRef = useRef(false);
  const albumQuizRemainingTimeRef = useRef(15);
  const albumQuizTimerRef = useRef(null);
  const albumQuizAudioTimeoutRef = useRef(null);
  const pendingViewRef = useRef(null);
  const viewTransitionPhaseRef = useRef('idle');
  const maxRounds = 10;
  const albumQuizMaxRounds = 15;
  const isFinished = score.total >= maxRounds;
  const round = score.total < maxRounds ? score.total + 1 : maxRounds;
  const isRoundActive = ['countdown', 'playing'].includes(roundStatus);
  const shouldShowUtilityChrome = currentView === 'game' && !isRoundActive && !isFinished && score.total === 0;
  const shouldShowTutorial = shouldShowUtilityChrome;
  const shouldShowNav = shouldShowUtilityChrome || currentView === 'album-quiz' || currentView === 'music-quiz' || currentView === 'leaderboard';
  const showHeroStartButton = roundStatus === 'ready' && score.total === 0;
  const hasStartedGame = score.total > 0 || isRoundActive;
  const shouldShowRoundPanel = hasStartedGame;

  const clearAlbumQuizTimers = () => {
    if (albumQuizTimerRef.current) {
      clearInterval(albumQuizTimerRef.current);
      albumQuizTimerRef.current = null;
    }
    if (albumQuizAudioTimeoutRef.current) {
      clearTimeout(albumQuizAudioTimeoutRef.current);
      albumQuizAudioTimeoutRef.current = null;
    }
  };

  const stopAlbumQuizRound = () => {
    clearAlbumQuizTimers();
    albumQuizRoundActiveRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlbumQuizPlaying(false);
  };

  const finishAlbumQuizRound = (selectedAlbum) => {
    const resolvedSong = albumQuizSongRef.current;
    if (!albumQuizRoundActiveRef.current || !resolvedSong) return;

    albumQuizRoundActiveRef.current = false;
    clearAlbumQuizTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlbumQuizPlaying(false);

    const isCorrect = selectedAlbum === resolvedSong.album;
    const elapsedSeconds = selectedAlbum === null
      ? 15
      : Math.max(0, 15 - albumQuizRemainingTimeRef.current);
    setAlbumQuizTimes((previousTimes) => {
      const nextTimes = [...previousTimes, elapsedSeconds];
      setAlbumQuizAverageTime(nextTimes.reduce((sum, value) => sum + value, 0) / nextTimes.length);
      return nextTimes;
    });
    setAlbumQuizScore((previousScore) => ({
      correct: previousScore.correct + (isCorrect ? 1 : 0),
      total: previousScore.total + 1,
    }));
    setAlbumQuizFeedback({
      type: selectedAlbum === null ? 'timeout' : isCorrect ? 'success' : 'error',
      selectedAlbum,
      song: resolvedSong,
    });
    setAlbumQuizStatus(albumQuizScore.total + 1 >= albumQuizMaxRounds ? 'finished' : 'answered');
  };

  const replayAlbumQuizSong = () => {
    const audio = audioRef.current;
    if (!audio || !albumQuizSongRef.current || albumQuizStatus !== 'playing') return;

    audio.currentTime = 0;
    audio.play()
      .then(() => setIsAlbumQuizPlaying(true))
      .catch((error) => {
        console.error('Audio replay failed', error);
        setAlbumQuizAudioError('Ukázku se nepodařilo přehrát.');
      });
  };

  const startAlbumQuizRound = () => {
    if (albumQuizScore.total >= albumQuizMaxRounds) return;

    clearAlbumQuizTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (albumQuizSongDeckRef.current.length === 0) {
      albumQuizSongDeckRef.current = shuffleSongDeck(songs);
    }
    const nextSong = albumQuizSongDeckRef.current.pop();
    albumQuizSongRef.current = nextSong;
    albumQuizRoundActiveRef.current = true;
    albumQuizRemainingTimeRef.current = 15;
    setAlbumQuizSong(nextSong);
    setAlbumQuizTimeLeft(15);
    setAlbumQuizFeedback(null);
    setAlbumQuizAudioError('');
    setAlbumQuizStatus('playing');
    setIsAlbumQuizPlaying(false);

    const audio = audioRef.current;
    if (audio) {
      audio.src = getSongPreviewUrl(nextSong);
      audio.currentTime = 0;
      audio.load();
      audio.play()
        .then(() => setIsAlbumQuizPlaying(true))
        .catch((error) => {
          console.error('Audio play failed', error);
          setAlbumQuizAudioError('Ukázku se nepodařilo přehrát.');
        });
      albumQuizAudioTimeoutRef.current = window.setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setIsAlbumQuizPlaying(false);
        albumQuizAudioTimeoutRef.current = null;
      }, 15000);
    }

    albumQuizTimerRef.current = window.setInterval(() => {
      const nextTime = Math.max(0, albumQuizRemainingTimeRef.current - 1);
      albumQuizRemainingTimeRef.current = nextTime;
      setAlbumQuizTimeLeft(nextTime);
      if (nextTime === 0) finishAlbumQuizRound(null);
    }, 1000);
  };

  const resetAlbumQuiz = () => {
    stopAlbumQuizRound();
    albumQuizSongDeckRef.current = shuffleSongDeck(songs);
    albumQuizSongRef.current = null;
    setAlbumQuizScore({ correct: 0, total: 0 });
    setAlbumQuizTimes([]);
    setAlbumQuizAverageTime(0);
    setAlbumQuizTimeLeft(15);
    setAlbumQuizFeedback(null);
    setAlbumQuizAudioError('');
    setAlbumQuizStatus('idle');
    setAlbumPlayerName('');
    setIsAlbumRegistered(false);
    setIsAlbumSubmitting(false);
    setAlbumSubmitMessage('');
  };

  const startMysteryRound = async () => {
    if (mysteryStartPendingRef.current) return;
    mysteryStartPendingRef.current = true;
    setIsMysteryQuotaLoading(true);
    setMysteryQuotaError('');
    setMysteryQuotaMessage('');

    try {
      const quota = await getDailySaulQuota();
      setMysteryQuota(quota);
      if (!quota.allowed) {
        setMysteryStatus('blocked');
        setMysteryQuotaMessage('Dohrál jsi 5 her. Další hra se odemkne 30 minut po dohrání té poslední.');
        return;
      }
      if (quota.remaining === DAILY_SAUL_LIMIT) {
        const freshSession = emptyDailySaulSession();
        setDailySaulSession(freshSession);
        saveDailySaulSession(freshSession);
        setDailySaulSubmitMessage('');
      }
    } catch (error) {
      console.error('Daily Saul quota check failed', error);
      setMysteryStatus('blocked');
      setMysteryQuotaError(error.message || 'Nepodařilo se ověřit limit hry.');
      return;
    } finally {
      mysteryStartPendingRef.current = false;
      setIsMysteryQuotaLoading(false);
    }

    if (mysteryAnswerTimeoutRef.current) {
      clearTimeout(mysteryAnswerTimeoutRef.current);
      mysteryAnswerTimeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (mysterySongDeckRef.current.length === 0) {
      mysterySongDeckRef.current = shuffleSongDeck(mysterySongs);
    }

    const nextSong = mysterySongDeckRef.current.pop();
    setMysterySong(nextSong);
    setMysteryStatus('playing');
    setMysteryPhase('type');
    setMysteryTypeGuess('');
    setMysteryAlbumGuess('');
    setMysteryTitleGuess('');
    setMysteryAlbumHints(0);
    setMysteryTitleHints(0);
    setMysteryAlbumRevealed(false);
    setMysteryAnswerStatus('idle');
    setMysteryFeedback('');
    setMysteryAudioError('');
    setMysteryQuotaMessage('');
    setIsMysteryAudioPlaying(false);
    setMysteryRoundPoints(null);
    mysteryCompletionRecordedRef.current = false;
    mysteryMistakesRef.current = 0;
    mysteryRoundStartRef.current = Date.now();
  };

  const flashMysteryAnswer = (status, onComplete) => {
    if (mysteryAnswerTimeoutRef.current) {
      clearTimeout(mysteryAnswerTimeoutRef.current);
    }
    setMysteryAnswerStatus(status);
    mysteryAnswerTimeoutRef.current = window.setTimeout(() => {
      mysteryAnswerTimeoutRef.current = null;
      if (status === 'wrong') setMysteryAnswerStatus('idle');
      onComplete?.();
    }, status === 'wrong' ? 700 : 520);
  };

  const stopMysteryAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsMysteryAudioPlaying(false);
  };

  const playMysterySong = () => {
    const audio = audioRef.current;
    if (!audio || !mysterySong) return;

    audio.src = getSongPreviewUrl(mysterySong);
    audio.currentTime = 0;
    audio.load();
    audio.play()
      .then(() => setIsMysteryAudioPlaying(true))
      .catch((error) => {
        console.error('Mystery game audio failed', error);
        setMysteryAudioError('Skladbu se nepodařilo přehrát.');
      });
  };

  const revealMysterySong = async ({ skipPlayback = false, points = 0 } = {}) => {
    if (!mysterySong || mysteryCompletionRecordedRef.current) return;
    mysteryCompletionRecordedRef.current = true;

    // Browsers only allow audio.play() synchronously inside a user gesture, so it must run before any await.
    if (!skipPlayback) playMysterySong();

    const seconds = Math.min(1800, (Date.now() - mysteryRoundStartRef.current) / 1000);
    setMysteryRoundPoints(points);

    try {
      const quota = await recordDailySaulCompletion();
      setMysteryQuota(quota);
      if (!quota.allowed) {
        setMysteryQuotaMessage('Limit byl mezitím vyčerpán v jiné kartě. Tato hra se už do limitu nevešla.');
      } else {
        setDailySaulSession((session) => {
          const nextSession = {
            ...session,
            games: [...session.games, { points, seconds }].slice(-DAILY_SAUL_LIMIT),
          };
          saveDailySaulSession(nextSession);
          return nextSession;
        });
      }
    } catch (error) {
      console.error('Daily Saul completion could not be recorded', error);
      setMysteryQuotaMessage(error.message || 'Dokončení hry se nepodařilo uložit.');
      mysteryCompletionRecordedRef.current = false;
    }

    setMysteryTitleHints(5);
    setMysteryStatus('revealed');
    setMysteryPhase('revealed');
    setMysteryFeedback(`Skladba: ${mysterySong.title}`);
  };

  const submitMysteryType = (type) => {
    if (!mysterySong) return;
    setMysteryTypeGuess(type);
    if (type !== mysterySong.sourceType) {
      mysteryMistakesRef.current += 1;
      setMysteryFeedback('To není správný typ skladby. Zkus to znovu.');
      return;
    }

    if (type === 'single') {
      setMysteryPhase('title');
      setMysteryFeedback('Správně. Jde o singl bez alba; teď uhodni jeho název.');
      return;
    }

    setMysteryPhase('album');
    setMysteryFeedback('Správně. Teď uhodni album nebo projekt.');
  };

  const submitMysteryAlbum = (event) => {
    event.preventDefault();
    if (!mysterySong || !mysteryAlbumGuess.trim() || mysteryAnswerStatus === 'correct') return;
    if (normalizeAnswer(mysteryAlbumGuess) !== normalizeAnswer(mysterySong.album)) {
      mysteryMistakesRef.current += 1;
      setMysteryFeedback('Album nesouhlasí. Zkus další tip nebo nápovědu.');
      flashMysteryAnswer('wrong');
      return;
    }

    setMysteryFeedback('Správně. Teď uhodni název skladby.');
    flashMysteryAnswer('correct', () => {
      setMysteryAlbumRevealed(true);
      setMysteryPhase('title');
      setMysteryAnswerStatus('idle');
    });
  };

  const revealMysteryAlbumHint = () => {
    if (!mysterySong || mysteryAlbumRevealed) return;
    const nextHint = Math.min(mysteryAlbumHints + 1, 3);
    setMysteryAlbumHints(nextHint);
    if (nextHint === 3) {
      setMysteryAlbumRevealed(true);
      setMysteryFeedback(`Album je „${mysterySong.album}“. Pokračuj k názvu skladby.`);
    }
  };

  const submitMysteryTitle = (event) => {
    event.preventDefault();
    if (!mysterySong || !mysteryTitleGuess.trim() || mysteryAnswerStatus === 'correct') return;
    const normalizedGuess = normalizeAnswer(mysteryTitleGuess);
    const normalizedTitle = normalizeAnswer(mysterySong.title);
    const normalizedSongName = normalizeAnswer(mysterySong.title.split(' - ')[0]);
    if (normalizedGuess !== normalizedTitle && normalizedGuess !== normalizedSongName) {
      mysteryMistakesRef.current += 1;
      setMysteryFeedback('Název nesouhlasí. Zkus další tip nebo nápovědu.');
      flashMysteryAnswer('wrong');
      return;
    }
    const points = Math.max(
      0,
      DAILY_SAUL_MAX_POINTS - mysteryAlbumHints - mysteryTitleHints - mysteryMistakesRef.current,
    );
    setMysteryFeedback('Správně!');
    playMysterySong();
    flashMysteryAnswer('correct', () => revealMysterySong({ skipPlayback: true, points }));
  };

  const revealMysteryTitleHint = () => {
    if (!mysterySong || mysteryStatus === 'revealed') return;
    const nextHint = Math.min(mysteryTitleHints + 1, 5);
    setMysteryTitleHints(nextHint);
    if (nextHint === 5) revealMysterySong();
  };

  const transitionToView = (nextView) => {
    if (nextView === currentView || viewTransitionPhaseRef.current !== 'idle') return;

    if (currentView === 'album-quiz' && nextView !== 'album-quiz' && albumQuizRoundActiveRef.current) {
      stopAlbumQuizRound();
      setAlbumQuizStatus('idle');
      setAlbumQuizSong(null);
      albumQuizSongRef.current = null;
    }

    if (currentView === 'music-quiz' && nextView !== 'music-quiz') {
      stopMysteryAudio();
      if (mysteryAnswerTimeoutRef.current) {
        clearTimeout(mysteryAnswerTimeoutRef.current);
        mysteryAnswerTimeoutRef.current = null;
      }
    }

    pendingViewRef.current = nextView;
    viewTransitionPhaseRef.current = 'out';
    setViewTransitionPhase('out');
  };

  const handleViewTransitionEnd = () => {
    if (viewTransitionPhaseRef.current === 'out') {
      setCurrentView(pendingViewRef.current);
      viewTransitionPhaseRef.current = 'in';
      setViewTransitionPhase('in');
      return;
    }

    if (viewTransitionPhaseRef.current === 'in') {
      viewTransitionPhaseRef.current = 'idle';
      setViewTransitionPhase('idle');
    }
  };

  const getSongPool = (addFeats = includeFeats) => {
    const saulSongPool = [...songs, ...saulSingles];
    return addFeats && featSongs.length > 0
      ? [...saulSongPool, ...featSongs]
      : saulSongPool;
  };

  const pickRandomSong = () => {
    if (songDeckRef.current.length === 0) {
      songDeckRef.current = shuffleSongDeck(getSongPool());
    }
    return songDeckRef.current.pop();
  };

  const clearRoundTimers = () => {
    if (roundCountdownRef.current) {
      clearInterval(roundCountdownRef.current);
      roundCountdownRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    if (nextRoundTimeoutRef.current) {
      clearTimeout(nextRoundTimeoutRef.current);
      nextRoundTimeoutRef.current = null;
    }
  };

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setIsPlayingPreview(false);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const resetGame = () => {
    clearRoundTimers();
    stopPreview();
    songDeckRef.current = shuffleSongDeck(getSongPool());
    setScore({ correct: 0, total: 0 });
    setGuess('');
    setFeedback(null);
    setShowSuggestions(false);
    const nextSong = pickRandomSong();
    currentSongRef.current = nextSong;
    setCurrentSong(nextSong);
    setTimeLeft(10);
    setGameTimes([]);
    setPlayerName('');
    setIsRegistered(false);
    setSubmitMessage('');
    setCountdownValue(3);
    setRoundStatus('ready');
  };

  const enterGame = () => {
    setIsEntering(true);
    const transitionDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520;
    window.setTimeout(() => setHasEntered(true), transitionDuration);
  };

  const startCountdown = () => {
    stopCountdown();
    setTimeLeft(10);
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopCountdown();
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const playPreview = (song = currentSong) => {
    if (!song || isFinished) return;

    const previewUrl = getSongPreviewUrl(song);
    if (!previewUrl) {
      setFeedback({
        type: 'error',
        message: 'Nenašiel sa žiadny audio súbor pre túto skladbu. Pridaj ho do /songs/.',
      });
      return;
    }

    stopPreview();
    stopCountdown();
    setTimeLeft(10);
    setRoundStatus('playing');

    const audioEl = audioRef.current;
    if (!audioEl) {
      setFeedback({
        type: 'error',
        message: 'Audio element nie je pripravený. Obnov stránku a skúste znovu.',
      });
      return;
    }

    audioEl.src = previewUrl;
    audioEl.currentTime = 0;
    audioEl.load();

    audioEl.play().then(() => {
      setIsPlayingPreview(true);
      previewTimerRef.current = setTimeout(() => {
        stopPreview();
      }, 10000);
      startCountdown();
    }).catch((error) => {
      console.error('Audio play failed', error, previewUrl);
      setFeedback({
        type: 'error',
        message: `Ukážku sa nepodarilo prehrať (${previewUrl}). Skontroluj súbor a skúšaj znovu.`,
      });
    });
  };

  const startRoundSequence = () => {
    if (isFinished) return;

    clearRoundTimers();
    stopPreview();
    setGuess('');
    setFeedback(null);
    setShowSuggestions(false);
    const nextSong = pickRandomSong();
    currentSongRef.current = nextSong;
    setCurrentSong(nextSong);
    setTimeLeft(10);
    setRoundStatus('countdown');
    setCountdownValue(3);

    const runCountdownStep = (value) => {
      if (value < 0) {
        setRoundStatus('playing');
        playPreview(nextSong);
        return;
      }

      setCountdownValue(value);
      roundCountdownRef.current = window.setTimeout(() => {
        runCountdownStep(value - 1);
      }, 900);
    };

    runCountdownStep(3);
  };

  const finalizeRound = (isCorrect) => {
    if (isFinished) return;

    const resolvedSong = currentSongRef.current || currentSong;
    if (!resolvedSong) return;

    stopPreview();
    stopCountdown();
    const currentTime = Math.max(0, 10 - timeLeft);
    const nextCorrect = score.correct + (isCorrect ? 1 : 0);
    const nextTotal = score.total + 1;

    if (isCorrect) {
      setGameTimes((prev) => [...prev, currentTime]);
    }

    setScore({
      correct: nextCorrect,
      total: nextTotal,
    });

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect
        ? `Správná odpověď! Song: ${resolvedSong.title} | Album: ${resolvedSong.album}.`
        : `Špatná odpověď. Správná odpověď byla “${resolvedSong.title}”.`,
    });

    if (nextTotal >= maxRounds) {
      setRoundStatus('finished');
      return;
    }

    setRoundStatus('ready');
    setCountdownValue(3);
    setTimeLeft(10);
    setGuess('');
    setShowSuggestions(false);

    if (nextRoundTimeoutRef.current) {
      clearTimeout(nextRoundTimeoutRef.current);
      nextRoundTimeoutRef.current = null;
    }
  };

  const handleTimeout = () => {
    if (isFinished) return;
    finalizeRound(false);
  };

  const handleGuess = () => {
    if (!currentSong || isFinished || !guess.trim()) return;

    const normalizedGuess = normalizeAnswer(guess);
    const normalizedTitle = normalizeAnswer(currentSong.title);
    const normalizedSongName = normalizeAnswer(currentSong.title.split(' - ')[0]);
    const normalizedArtistName = normalizeAnswer(currentSong.title.split(' - ').slice(1).join(' - '));
    const isCorrect = normalizedGuess === normalizedTitle
      || normalizedGuess === normalizedSongName
      || (normalizedArtistName && `${normalizedSongName} ${normalizedArtistName}` === normalizedGuess);

    setGuess('');
    setShowSuggestions(false);
    finalizeRound(isCorrect);
  };

  const handleSuggestionClick = (title) => {
    setGuess(title);
    setShowSuggestions(false);
  };

  const handleAlbumLeaderboardSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = albumPlayerName.trim();
    if (!trimmedName) {
      setAlbumSubmitMessage('Zadej prosím jméno.');
      return;
    }
    if (trimmedName.length > 40) {
      setAlbumSubmitMessage('Jméno může mít nejvýše 40 znaků.');
      return;
    }

    setIsAlbumSubmitting(true);
    setAlbumSubmitMessage('');
    try {
      const entry = await saveAlbumLeaderboardEntry({
        name: trimmedName,
        score: albumQuizScore.correct,
        avgSeconds: albumQuizAverageTime,
      });
      setAlbumLeaderboard((entries) => [...entries, entry]);
      setIsAlbumRegistered(true);
      setAlbumSubmitMessage(supabaseConfigured
        ? 'Výsledek byl uložen do Album Quiz leaderboardu.'
        : 'Výsledek je uložen jen v tomto prohlížeči.');
    } catch (error) {
      console.error('Failed to save album leaderboard entry', error);
      setAlbumSubmitMessage(`Výsledek se nepodařilo uložit: ${error.message || 'neznámá chyba'}`);
    } finally {
      setIsAlbumSubmitting(false);
    }
  };

  const dailySaulTotalPoints = dailySaulSession.games.reduce((sum, game) => sum + game.points, 0);
  const dailySaulAverageSeconds = dailySaulSession.games.length
    ? dailySaulSession.games.reduce((sum, game) => sum + game.seconds, 0) / dailySaulSession.games.length
    : 0;
  const isDailySaulSessionComplete = dailySaulSession.games.length >= DAILY_SAUL_LIMIT;

  const handleDailySaulLeaderboardSubmit = async (event) => {
    event.preventDefault();
    if (!isDailySaulSessionComplete || dailySaulSession.registered) return;
    const trimmedName = dailySaulPlayerName.trim();
    if (!trimmedName) {
      setDailySaulSubmitMessage('Zadej prosím jméno.');
      return;
    }
    if (trimmedName.length > 40) {
      setDailySaulSubmitMessage('Jméno může mít nejvýše 40 znaků.');
      return;
    }

    setIsDailySaulSubmitting(true);
    setDailySaulSubmitMessage('');
    try {
      const entry = await saveDailySaulLeaderboardEntry({
        name: trimmedName,
        score: dailySaulTotalPoints,
        avgSeconds: Number(dailySaulAverageSeconds.toFixed(2)),
      });
      setDailySaulLeaderboard((entries) => [...entries, entry]);
      const registeredSession = { ...dailySaulSession, registered: true };
      setDailySaulSession(registeredSession);
      saveDailySaulSession(registeredSession);
      setDailySaulSubmitMessage(supabaseConfigured
        ? 'Výsledek byl uložen do Daily Saul leaderboardu.'
        : 'Výsledek je uložen jen v tomto prohlížeči.');
    } catch (error) {
      console.error('Failed to save Daily Saul leaderboard entry', error);
      setDailySaulSubmitMessage(`Výsledek se nepodařilo uložit: ${error.message || 'neznámá chyba'}`);
    } finally {
      setIsDailySaulSubmitting(false);
    }
  };

  const dailySaulRegisterBlock = isDailySaulSessionComplete ? (
    <div className="sg-register sg-daily-saul-register">
      <h3>Zapsat se do Daily Saul leaderboardu</h3>
      <p className="sg-daily-saul-total">
        Celkem <strong>{dailySaulTotalPoints} / {DAILY_SAUL_LIMIT * DAILY_SAUL_MAX_POINTS}</strong> bodů
        · průměr {dailySaulAverageSeconds.toFixed(1)} s na hru
      </p>
      <form onSubmit={handleDailySaulLeaderboardSubmit} className="sg-register-form">
        <label className="sr-only" htmlFor="dailySaulPlayerName">Jméno</label>
        <input
          id="dailySaulPlayerName"
          value={dailySaulPlayerName}
          onChange={(event) => setDailySaulPlayerName(event.target.value)}
          maxLength={40}
          placeholder="Zadej své jméno"
          className="sg-input"
          disabled={dailySaulSession.registered}
        />
        <button
          type="submit"
          disabled={dailySaulSession.registered || isDailySaulSubmitting}
          className="sg-button sg-button-primary"
        >
          {isDailySaulSubmitting ? 'Ukládám…' : dailySaulSession.registered ? 'Uloženo' : 'Uložit výsledek'}
        </button>
      </form>
      {dailySaulSubmitMessage && <p className="sg-submit-message">{dailySaulSubmitMessage}</p>}
      <button
        type="button"
        onClick={() => {
          setLeaderboardCategory('daily');
          transitionToView('leaderboard');
        }}
        className="sg-button sg-button-secondary"
      >
        Zobrazit Daily Saul leaderboard
      </button>
    </div>
  ) : null;

  const handleLeaderboardSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setSubmitMessage('Zadej prosím jméno.');
      return;
    }
    if (trimmedName.length > 40) {
      setSubmitMessage('Jméno může mít nejvýše 40 znaků.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const entry = await saveLeaderboardEntry({
        name: trimmedName,
        score: score.correct,
        avgSeconds: averageTime ?? 0,
      });
      setLeaderboard((entries) => [...entries, entry]);
      setIsRegistered(true);
      setSubmitMessage(supabaseConfigured
        ? 'Výsledek byl uložen do Supabase.'
        : 'Výsledek je uložen pouze v tomto prohlížeči. Pro sdílený leaderboard nastav Supabase.');
    } catch (error) {
      console.error('Failed to save leaderboard entry', error);
      setSubmitMessage(`Výsledek se nepodařilo uložit: ${error.message || 'neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestions = useMemo(() => {
    if (!guess.trim()) {
      return [];
    }

    return getSongPool()
      .filter((song) => {
        const normalizedQuery = normalizeAnswer(guess);
        const normalizedTitle = normalizeAnswer(song.title);
        const songNameBeforeDash = normalizedTitle.split(' - ')[0];
        return normalizedTitle.includes(normalizedQuery)
          || songNameBeforeDash.includes(normalizedQuery);
      })
      .slice(0, 4);
  }, [guess]);

  const averageTime = useMemo(() => {
    if (!gameTimes.length) return null;
    return gameTimes.reduce((sum, value) => sum + value, 0) / gameTimes.length;
  }, [gameTimes]);

  const sortedSongLeaderboard = useMemo(() => {
    return [...leaderboard].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.avgSeconds - b.avgSeconds;
    });
  }, [leaderboard]);

  const sortedAlbumLeaderboard = useMemo(() => {
    return [...albumLeaderboard].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.avgSeconds - b.avgSeconds;
    });
  }, [albumLeaderboard]);

  const sortedDailySaulLeaderboard = useMemo(() => {
    return [...dailySaulLeaderboard].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.avgSeconds - b.avgSeconds;
    });
  }, [dailySaulLeaderboard]);

  const sortedLeaderboard = {
    album: sortedAlbumLeaderboard,
    daily: sortedDailySaulLeaderboard,
  }[leaderboardCategory] ?? sortedSongLeaderboard;
  const activeLeaderboardLoading = {
    album: isAlbumLeaderboardLoading,
    daily: isDailySaulLeaderboardLoading,
  }[leaderboardCategory] ?? isLeaderboardLoading;
  const activeLeaderboardError = {
    album: albumLeaderboardError,
    daily: dailySaulLeaderboardError,
  }[leaderboardCategory] ?? leaderboardError;

  const refreshLeaderboard = async () => {
    setIsLeaderboardLoading(true);
    setLeaderboardError('');
    try {
      setLeaderboard(await loadLeaderboard());
    } catch (error) {
      console.error('Failed to load leaderboard', error);
      setLeaderboardError(error.message || 'Nepodařilo se načíst leaderboard.');
    } finally {
      setIsLeaderboardLoading(false);
    }
  };

  const refreshAlbumLeaderboard = async () => {
    setIsAlbumLeaderboardLoading(true);
    setAlbumLeaderboardError('');
    try {
      setAlbumLeaderboard(await loadAlbumLeaderboard());
    } catch (error) {
      console.error('Failed to load album leaderboard', error);
      setAlbumLeaderboardError(error.message || 'Nepodařilo se načíst Album Quiz leaderboard.');
    } finally {
      setIsAlbumLeaderboardLoading(false);
    }
  };

  const refreshDailySaulLeaderboard = async () => {
    setIsDailySaulLeaderboardLoading(true);
    setDailySaulLeaderboardError('');
    try {
      setDailySaulLeaderboard(await loadDailySaulLeaderboard());
    } catch (error) {
      console.error('Failed to load Daily Saul leaderboard', error);
      setDailySaulLeaderboardError(error.message || 'Nepodařilo se načíst Daily Saul leaderboard.');
    } finally {
      setIsDailySaulLeaderboardLoading(false);
    }
  };

  const refreshActiveLeaderboard = {
    album: refreshAlbumLeaderboard,
    daily: refreshDailySaulLeaderboard,
  }[leaderboardCategory] ?? refreshLeaderboard;

  useEffect(() => {
    let isActive = true;
    setIsLeaderboardLoading(true);
    loadLeaderboard()
      .then((entries) => {
        if (isActive) setLeaderboard(entries);
      })
      .catch((error) => {
        console.error('Failed to load leaderboard', error);
        if (isActive) {
          setLeaderboardError(error.message || 'Nepodařilo se načíst leaderboard.');
        }
      })
      .finally(() => {
        if (isActive) setIsLeaderboardLoading(false);
      });

    setIsAlbumLeaderboardLoading(true);
    loadAlbumLeaderboard()
      .then((entries) => {
        if (isActive) setAlbumLeaderboard(entries);
      })
      .catch((error) => {
        console.error('Failed to load album leaderboard', error);
        if (isActive) {
          setAlbumLeaderboardError(error.message || 'Nepodařilo se načíst Album Quiz leaderboard.');
        }
      })
      .finally(() => {
        if (isActive) setIsAlbumLeaderboardLoading(false);
      });

    setIsDailySaulLeaderboardLoading(true);
    loadDailySaulLeaderboard()
      .then((entries) => {
        if (isActive) setDailySaulLeaderboard(entries);
      })
      .catch((error) => {
        console.error('Failed to load Daily Saul leaderboard', error);
        if (isActive) {
          setDailySaulLeaderboardError(error.message || 'Nepodařilo se načíst Daily Saul leaderboard.');
        }
      })
      .finally(() => {
        if (isActive) setIsDailySaulLeaderboardLoading(false);
      });

    const initialSong = pickRandomSong('saul');
    currentSongRef.current = initialSong;
    setCurrentSong(initialSong);
    return () => {
      isActive = false;
    };
  }, []);

  const mysteryResetAtMs = mysteryQuota?.resetAt ? mysteryQuota.resetAt.getTime() : null;

  useEffect(() => {
    if (mysteryResetAtMs === null) return undefined;
    setMysteryQuotaNow(Date.now());
    const intervalId = window.setInterval(() => {
      const now = Date.now();
      setMysteryQuotaNow(now);
      if (now >= mysteryResetAtMs) {
        window.clearInterval(intervalId);
        setMysteryQuota({ allowed: true, remaining: DAILY_SAUL_LIMIT, resetAt: null });
        setMysteryQuotaMessage('');
        setMysteryStatus((status) => (status === 'blocked' ? 'idle' : status));
      }
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [mysteryResetAtMs]);

  const mysteryCountdown = mysteryResetAtMs !== null
    ? formatCountdown(mysteryResetAtMs - mysteryQuotaNow)
    : null;

  useEffect(() => {
    return () => {
      clearRoundTimers();
      clearAlbumQuizTimers();
      stopPreview();
    };
  }, []);

  if (!hasEntered) {
    return (
      <main className={`sg-app sg-splash ${isEntering ? 'is-exiting' : ''}`}>
        <div className="sg-splash-atmosphere" aria-hidden="true">
          <span className="sg-splash-image sg-splash-image-one" />
          <span className="sg-splash-image sg-splash-image-two" />
          <span className="sg-splash-image sg-splash-image-three" />
        </div>
        <div className="sg-splash-content">
          <h1 className="sg-title">SaulGuesser</h1>
          <button
            type="button"
            className="sg-start-button"
            onClick={enterGame}
            disabled={isEntering}
          >
            Začít hrát
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="sg-app sg-main">
      <div className="sg-splash-atmosphere" aria-hidden="true">
        <span className="sg-splash-image sg-splash-image-one" />
        <span className="sg-splash-image sg-splash-image-two" />
        <span className="sg-splash-image sg-splash-image-three" />
      </div>
      <audio ref={audioRef} preload="auto" />
      {viewTransitionPhase !== 'idle' && (
        <div
          className={`sg-view-transition is-${viewTransitionPhase}`}
          onAnimationEnd={handleViewTransitionEnd}
          aria-hidden="true"
        />
      )}

      {roundStatus === 'countdown' && (
        <div className="sg-fullscreen-countdown" aria-live="polite" aria-atomic="true">
          <div key={countdownValue} className="sg-fullscreen-countdown-value">{countdownValue}</div>
        </div>
      )}

      <div className={`sg-header ${isRoundActive || score.total > 0 || currentView === 'album-quiz' || currentView === 'music-quiz' ? 'sg-header-compact' : ''}`}>
        {shouldShowUtilityChrome && (
          <div className="sg-kicker">
            Jsi pravý fanoušek Saula? Ověř si to přes:
          </div>
        )}
        <h1 className="sg-title">SaulGuesser</h1>
        {shouldShowNav && (
          <div className="sg-tabs">
            <button
              type="button"
              onClick={() => transitionToView('game')}
              className={`sg-tab ${currentView === 'game' ? 'is-active' : ''}`}
            >
              Song Guesser
            </button>
            <button
              type="button"
              onClick={() => transitionToView('album-quiz')}
              className={`sg-tab ${currentView === 'album-quiz' ? 'is-active' : ''}`}
            >
              Album Quiz
            </button>
            <button
              type="button"
              onClick={() => transitionToView('music-quiz')}
              className={`sg-tab ${currentView === 'music-quiz' ? 'is-active' : ''}`}
            >
              Daily Saul
            </button>
            <button
              type="button"
              onClick={() => transitionToView('leaderboard')}
              className={`sg-tab ${currentView === 'leaderboard' ? 'is-active' : ''}`}
            >
              Leaderboard
            </button>
          </div>
        )}
        {shouldShowTutorial && (
          <p className="sg-intro">
            Spusť hru tak, že zmáčkneš tlačítko „Přehrát ukázku“. Máš přesně 10 sekund na uhodnutí skladby! Když uhodneš nebo neuhodneš, pokračuj dále tlačítkem „Nové kolo".
          </p>
        )}
      </div>

      {currentView === 'leaderboard' ? (
        <div className="sg-panel sg-leaderboard">
          <div className="sg-section-heading">
            <div>
              <h2>Leaderboard</h2>
              <div className="sg-leaderboard-categories" aria-label="Leaderboard hry">
                <button
                  type="button"
                  className={`sg-leaderboard-category ${leaderboardCategory === 'song' ? 'is-active' : ''}`}
                  onClick={() => setLeaderboardCategory('song')}
                >
                  Song Guesser
                </button>
                <button
                  type="button"
                  className={`sg-leaderboard-category ${leaderboardCategory === 'album' ? 'is-active' : ''}`}
                  onClick={() => setLeaderboardCategory('album')}
                >
                  Album Quiz
                </button>
                <button
                  type="button"
                  className={`sg-leaderboard-category ${leaderboardCategory === 'daily' ? 'is-active' : ''}`}
                  onClick={() => setLeaderboardCategory('daily')}
                >
                  Daily Saul
                </button>
              </div>
            </div>
            <div className="sg-section-actions">
              <button
                type="button"
                onClick={() => transitionToView('game')}
                className="sg-button sg-button-secondary"
              >
                Zpět do hry
              </button>
              <span className="sg-entry-count">{sortedLeaderboard.length} výsledků</span>
            </div>
          </div>
          {!supabaseConfigured && (
            <p className="sg-notice">
              {supabaseConfigError
                ? `${supabaseConfigError} Výsledky se ukládají jen v tomto prohlížeči.`
                : 'Supabase není nastavený. Výsledky se ukládají jen v tomto prohlížeči.'}
            </p>
          )}
          {activeLeaderboardError && (
            <div role="alert" className="sg-error">
              <p>Nepodařilo se načíst leaderboard: {activeLeaderboardError}</p>
              <button
                type="button"
                onClick={refreshActiveLeaderboard}
                disabled={activeLeaderboardLoading}
                className="sg-button sg-button-secondary"
              >
                Zkusit znovu
              </button>
            </div>
          )}
          {activeLeaderboardLoading ? (
            <div className="sg-empty">
              Načítám leaderboard…
            </div>
          ) : sortedLeaderboard.length === 0 && !activeLeaderboardError ? (
            <div className="sg-empty">
              Zatím není žádný výsledek. Zahraj hru a přidej se na leaderboard!
            </div>
          ) : sortedLeaderboard.length > 0 ? (
            <div className="sg-table">
              <div className="sg-table-row sg-table-head">
                <span>#</span>
                <span>Hráč</span>
                <span>Skóre</span>
                <span>{leaderboardCategory === 'album' ? 'Čas' : 'Průměr'}</span>
                <span>Datum</span>
              </div>
              {sortedLeaderboard.map((entry, index) => (
                <div key={entry.id} className={`sg-table-row ${index < 3 ? `sg-rank-${index + 1}` : ''}`}>
                  <span className="sg-rank">{String(index + 1).padStart(2, '0')}</span>
                  <span className="sg-player-name">{entry.name}</span>
                  <span className="sg-score">{entry.score}</span>
                  <span>{`${entry.avgSeconds.toFixed(2)}s`}</span>
                  <span className="sg-date">{new Date(entry.timestamp).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : currentView === 'album-quiz' ? (
        <div className="sg-album-view">
          <div className="sg-album-heading">
            <p className="sg-eyebrow"></p>
            <h2>Přiřaď album</h2>
            <p>Poslechni si náhodnou skladbu a vyber album, ze kterého pochází. Na odpověď máš 15 sekund.</p>
          </div>

          <div className="sg-panel sg-album-game">
          <div className="sg-album-stats">
            <div className="sg-album-stat">
              <span className="sg-label">Kolo</span>
              <strong>{Math.min(albumQuizScore.total + 1, albumQuizMaxRounds)} / {albumQuizMaxRounds}</strong>
            </div>
            <div className="sg-album-stat sg-album-time">
              <span className="sg-label">Čas</span>
              <strong>{albumQuizTimeLeft}<small>s</small></strong>
            </div>
            <div className="sg-album-stat">
              <span className="sg-label">Skóre</span>
              <strong>{albumQuizScore.correct}</strong>
            </div>
          </div>

          {albumQuizStatus === 'idle' && (
            <div className="sg-album-start">
              <button type="button" onClick={startAlbumQuizRound} className="sg-button sg-button-primary">
                Spustit hru
              </button>
            </div>
          )}

          {albumQuizStatus === 'playing' && (
            <>
              <button type="button" className={`sg-album-song ${isAlbumQuizPlaying ? 'is-playing' : ''}`} onClick={replayAlbumQuizSong}>
                <span className="sg-album-song-icon" aria-hidden="true">▶</span>
                <span>{isAlbumQuizPlaying ? 'Ukázka hraje · přehrát znovu' : 'Přehrát ukázku znovu'}</span>
              </button>
              {albumQuizAudioError && <p role="alert" className="sg-album-audio-error">{albumQuizAudioError}</p>}
              <p className="sg-album-prompt">Klikni na album, ze kterého skladba pochází:</p>
            </>
          )}

          <div className={`sg-album-options ${albumQuizFeedback ? 'has-result' : ''}`}>
            {albumOptions.map((album) => {
              const isCorrectAlbum = albumQuizFeedback?.song.album === album;
              const isSelectedAlbum = albumQuizFeedback?.selectedAlbum === album;
              const isSelectedWrong = albumQuizFeedback?.selectedAlbum === album && albumQuizFeedback.type === 'error';
              return (
                <button
                  key={album}
                  type="button"
                  disabled={albumQuizStatus !== 'playing'}
                  onClick={() => finishAlbumQuizRound(album)}
                  onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
                    event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
                  }}
                  className={`sg-album-choice ${isCorrectAlbum ? 'is-correct' : ''} ${isSelectedAlbum ? 'is-selected' : ''} ${isSelectedWrong ? 'is-wrong' : ''}`}
                >
                  <span
                    className="sg-album-cover"
                    style={{ backgroundImage: `url("${getAssetUrl(`/Images/album-covers/${albumCoverFiles[album]}`)}")` }}
                  >
                    <span className="sg-album-name">{album}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {albumQuizStatus === 'answered' && albumQuizFeedback && (
            <div className={`sg-album-feedback is-${albumQuizFeedback.type}`}>
              <p>
                {albumQuizFeedback.type === 'success'
                  ? 'Správně!'
                  : albumQuizFeedback.type === 'timeout'
                    ? 'Čas vypršel.'
                    : 'Tohle album nesedí.'}
              </p>
              <p><strong>{albumQuizFeedback.song.title}</strong> · {albumQuizFeedback.song.album}</p>
              <button type="button" onClick={startAlbumQuizRound} className="sg-button sg-button-primary">
                Další skladba
              </button>
            </div>
          )}

          {(albumQuizStatus === 'playing' || albumQuizStatus === 'answered') && (
            <div className="sg-album-restart">
              <button type="button" onClick={resetAlbumQuiz} className="sg-button sg-button-secondary">
                Restart hry
              </button>
            </div>
          )}

          {albumQuizStatus === 'finished' && (
            <div className="sg-album-result">
              <div className="sg-result">
                <p className="sg-eyebrow">Konec hry!</p>
                <h2>Tvoje výsledky</h2>
                <p>Správné odpovědi: <strong>{albumQuizScore.correct} / {albumQuizMaxRounds}</strong></p>
              </div>
              <div className="sg-register">
                <h3>Zapsat se do Album Quiz leaderboardu</h3>
                <form onSubmit={handleAlbumLeaderboardSubmit} className="sg-register-form">
                  <label className="sr-only" htmlFor="albumPlayerName">Jméno</label>
                  <input
                    id="albumPlayerName"
                    value={albumPlayerName}
                    onChange={(event) => setAlbumPlayerName(event.target.value)}
                    maxLength={40}
                    placeholder="Zadej své jméno"
                    className="sg-input"
                  />
                  <button
                    type="submit"
                    disabled={isAlbumRegistered || isAlbumSubmitting}
                    className="sg-button sg-button-primary"
                  >
                    {isAlbumSubmitting ? 'Ukládám…' : isAlbumRegistered ? 'Uloženo' : 'Uložit výsledky'}
                  </button>
                </form>
                {albumSubmitMessage && (
                  <p className="sg-submit-message">{albumSubmitMessage}</p>
                )}
              </div>
              <div className="sg-album-restart">
                <button
                  type="button"
                  onClick={() => {
                    setLeaderboardCategory('album');
                    transitionToView('leaderboard');
                  }}
                  className="sg-button sg-button-secondary"
                >
                  Zobrazit Album Quiz leaderboard
                </button>
                <button type="button" onClick={resetAlbumQuiz} className="sg-button sg-button-primary">
                  Restart hry
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      ) : currentView === 'music-quiz' ? (
        <div className="sg-album-view sg-daily-saul-view">
          <div className="sg-album-heading sg-daily-saul-heading">
            <p className="sg-eyebrow">DENNÍ VÝZVA · 3 KROKY</p>
            <h2>Daily Saul</h2>
            <p>Rozpoznej track, odhal jeho původ a nech se dovést až k názvu.</p>
          </div>
          <div className={`sg-panel sg-mystery-game sg-daily-saul-panel ${mysteryStatus === 'idle' ? 'is-idle' : ''}`}>
            {mysteryStatus === 'idle' && (
              <div className="sg-mystery-intro">
                <button
                  type="button"
                  disabled={isMysteryQuotaLoading}
                  onClick={startMysteryRound}
                  className="sg-daily-saul-start"
                >
                  <span className="sg-daily-saul-start-mark" aria-hidden="true">▶</span>
                  <span>{isMysteryQuotaLoading ? 'Ověřuji přístup…' : 'Spustit výzvu'}</span>
                  <span className="sg-daily-saul-start-arrow" aria-hidden="true">↗</span>
                </button>
                {mysteryQuota && (
                  <p className="sg-mystery-quota-remaining">
                    Zbývá {mysteryQuota.remaining} z {DAILY_SAUL_LIMIT} dokončení v limitu 30 minut.
                  </p>
                )}
              </div>
            )}

            {mysteryStatus === 'blocked' && (
              <div className="sg-mystery-quota-block">
                <p className="sg-eyebrow">Daily Saul</p>
                <h3>{mysteryQuotaError ? 'Přístup nelze ověřit' : 'Limit pro tuto chvíli vyčerpán'}</h3>
                <p>{mysteryQuotaError || mysteryQuotaMessage}</p>
                {mysteryCountdown && (
                  <div className="sg-mystery-countdown" role="timer" aria-live="off">
                    <span className="sg-mystery-countdown-label">Další hra za</span>
                    <strong className="sg-mystery-countdown-value">{mysteryCountdown}</strong>
                    <span className="sg-mystery-countdown-at">
                      v {mysteryQuota.resetAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
                {!mysteryQuotaError && !dailySaulSession.registered && dailySaulRegisterBlock}
                <button
                  type="button"
                  disabled={isMysteryQuotaLoading}
                  onClick={startMysteryRound}
                  className="sg-button sg-button-secondary"
                >
                  {isMysteryQuotaLoading ? 'Ověřuji…' : 'Zkontrolovat znovu'}
                </button>
              </div>
            )}

            {mysteryStatus === 'playing' && mysterySong && (
              <>
                <div className="sg-mystery-progress" key={`progress-${mysteryPhase}`}>
                  <span>{mysteryPhase === 'type' ? '1 / 3' : mysteryPhase === 'album' ? '2 / 3' : mysterySong.sourceType === 'single' ? '2 / 2' : '3 / 3'}</span>
                  <span>{mysteryPhase === 'type' ? 'Původ skladby' : mysteryPhase === 'album' ? 'Album / projekt' : 'Název skladby'}</span>
                </div>

                {mysteryPhase === 'type' && (
                  <div className="sg-mystery-stage" key="mystery-type-stage">
                    <h3>Jak se Saul podílel na skladbě?</h3>
                    <div className="sg-mystery-type-options">
                      {[
                        { value: 'feat', label: 'Feat', note: 'Hostuje u jiného interpreta', number: '01' },
                        { value: 'single', label: 'Singl', note: 'Samostatně vydaná skladba', number: '02' },
                        { value: 'album', label: 'Z alba', note: 'Skladba z jeho alba', number: '03' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => submitMysteryType(option.value)}
                          className={`sg-mystery-type-choice is-${option.value} ${mysteryTypeGuess === option.value ? 'is-selected' : ''}`}
                        >
                          <span className="sg-mystery-type-number">{option.number}</span>
                          <strong>{option.label}</strong>
                          <small>{option.note}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mysteryPhase === 'album' && (
                  <div className="sg-mystery-stage" key="mystery-album-stage">
                    <h3>Ze kterého alba nebo projektu skladba je?</h3>
                    {!mysteryAlbumRevealed ? (
                      <>
                        <form
                          className={`sg-mystery-answer-row is-${mysteryAnswerStatus}`}
                          onSubmit={submitMysteryAlbum}
                        >
                          <input
                            value={mysteryAlbumGuess}
                            onChange={(event) => setMysteryAlbumGuess(event.target.value)}
                            placeholder="Napiš album nebo projekt"
                            className={`sg-input sg-mystery-answer-input is-${mysteryAnswerStatus}`}
                            aria-label="Název alba nebo projektu"
                          />
                          <button type="submit" className="sg-button sg-button-primary">Ověřit</button>
                        </form>
                        <button type="button" onClick={revealMysteryAlbumHint} className="sg-mystery-hint">
                          <span className="sg-mystery-hint-icon" aria-hidden="true">?</span>
                          <span>Nápověda {mysteryAlbumHints} / 3</span>
                        </button>
                        {mysteryAlbumHints > 0 && (
                          <p className="sg-mystery-hint-text" key={`album-hint-${mysteryAlbumHints}`}>Začíná na: <strong>{mysterySong.album.slice(0, mysteryAlbumHints)}…</strong></p>
                        )}
                      </>
                    ) : (
                      <div className="sg-mystery-reveal-block">
                        <p>Album / projekt: <strong>{mysterySong.album}</strong></p>
                        <button type="button" onClick={() => setMysteryPhase('title')} className="sg-button sg-button-primary">
                          Pokračovat k názvu skladby
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {mysteryPhase === 'title' && (
                  <div className="sg-mystery-stage" key="mystery-title-stage">
                    <h3>Jak se skladba jmenuje?</h3>
                    <form
                      className={`sg-mystery-answer-row is-${mysteryAnswerStatus}`}
                      onSubmit={submitMysteryTitle}
                    >
                      <input
                        value={mysteryTitleGuess}
                        onChange={(event) => setMysteryTitleGuess(event.target.value)}
                        placeholder="Napiš název skladby"
                        className={`sg-input sg-mystery-answer-input is-${mysteryAnswerStatus}`}
                        aria-label="Název skladby"
                      />
                      <button type="submit" className="sg-button sg-button-primary">Ověřit</button>
                    </form>
                    <button type="button" onClick={revealMysteryTitleHint} className="sg-mystery-hint">
                      <span className="sg-mystery-hint-icon" aria-hidden="true">?</span>
                      <span>Nápověda {mysteryTitleHints} / 5</span>
                    </button>
                    {mysteryTitleHints > 0 && (
                      <p className="sg-mystery-hint-text" key={`title-hint-${mysteryTitleHints}`}>Název začíná na: <strong>{mysterySong.title.slice(0, mysteryTitleHints)}…</strong></p>
                    )}
                  </div>
                )}

                {mysteryFeedback && (
                  <p className={`sg-mystery-feedback is-${mysteryAnswerStatus}`}>
                    {mysteryFeedback}
                  </p>
                )}
                {mysteryAudioError && <p role="alert" className="sg-album-audio-error">{mysteryAudioError}</p>}
              </>
            )}

            {mysteryStatus === 'revealed' && mysterySong && (
              <div className="sg-mystery-revealed" key={`revealed-${mysterySong.id}`}>
                <p className="sg-eyebrow">Odhalená skladba</p>
                <h3>{mysterySong.title}</h3>
                <p>{mysterySong.sourceType === 'feat' ? `Feat · ${mysterySong.album}` : mysterySong.sourceType === 'single' ? 'Samostatný singl' : mysterySong.album}</p>
                {mysteryRoundPoints !== null && (
                  <p className="sg-daily-saul-points">
                    <strong>+{mysteryRoundPoints}</strong> / {DAILY_SAUL_MAX_POINTS} bodů
                    {dailySaulSession.games.length > 0 && (
                      <span> · hra {dailySaulSession.games.length} / {DAILY_SAUL_LIMIT}, celkem {dailySaulTotalPoints} bodů</span>
                    )}
                  </p>
                )}
                {dailySaulRegisterBlock}
                {mysteryQuota && (
                  <p className="sg-mystery-quota-remaining">
                    Zbývá {mysteryQuota.remaining} z {DAILY_SAUL_LIMIT} dokončení v limitu 30 minut.
                  </p>
                )}
                {mysteryCountdown && (
                  <div className="sg-mystery-countdown" role="timer" aria-live="off">
                    <span className="sg-mystery-countdown-label">Další hra za</span>
                    <strong className="sg-mystery-countdown-value">{mysteryCountdown}</strong>
                    <span className="sg-mystery-countdown-at">
                      v {mysteryQuota.resetAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
                {mysteryQuotaMessage && <p role="status" className="sg-mystery-quota-message">{mysteryQuotaMessage}</p>}
                {mysteryAudioError && <p role="alert" className="sg-album-audio-error">{mysteryAudioError}</p>}
                <div className="sg-mystery-actions">
                  <button type="button" onClick={playMysterySong} className="sg-button sg-button-secondary">
                    {isMysteryAudioPlaying ? 'Přehrát znovu' : 'Přehrát skladbu'}
                  </button>
                  <button type="button" onClick={startMysteryRound} className="sg-button sg-button-primary">
                    Další skladba
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={`sg-panel sg-game ${showHeroStartButton ? 'sg-game-intro' : ''}`}>
          {!isFinished ? (
            <>
              {showHeroStartButton && (
                <label className="sg-song-feat-toggle">
                  <span>
                    <strong>Featy</strong>
                    <small>{featSongs.length > 0 ? 'Jsi pokročilý a chceš si to ztížit? Přidej si featové skladby!' : 'Připravujeme'}</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={includeFeats}
                    disabled={featSongs.length === 0}
                    onChange={(event) => {
                      const nextValue = event.target.checked;
                      setIncludeFeats(nextValue);
                      songDeckRef.current = shuffleSongDeck(getSongPool(nextValue));
                      setScore({ correct: 0, total: 0 });
                      setGuess('');
                      setFeedback(null);
                      setTimeLeft(10);
                    }}
                  />
                  <span className="sg-song-feat-toggle-track" aria-hidden="true">
                    <span />
                  </span>
                </label>
              )}

              {showHeroStartButton && (
                <div className="sg-start-panel">
                  <button
                    type="button"
                    className={`sg-hero-button ${isPlayingPreview ? 'is-playing' : ''} ${isPlayButtonSpinning ? 'is-spinning' : ''}`}
                    onClick={startRoundSequence}
                    onMouseEnter={() => setIsPlayButtonSpinning(true)}
                  >
                    <span
                      className="sg-hero-image"
                      aria-hidden="true"
                      style={{ backgroundImage: `url("${getAssetUrl('/Images/play-btn.jpg')}")` }}
                      onAnimationEnd={() => setIsPlayButtonSpinning(false)}
                    />
                    <span className="sg-hero-content">
                      <span className="sg-play-icon" aria-hidden="true">▶</span>
                      <span className="sg-play-text">Přehrát ukázku</span>
                    </span>
                  </button>
                </div>
              )}

              {!showHeroStartButton && (
                <div className="sg-stage">
                  {hasStartedGame && (
                    <div className="sg-hero-scoreboard">
                      <div className="sg-score-pill">
                        <span className="sg-label">Skóre</span>
                        <strong>{score.correct} / {maxRounds}</strong>
                      </div>

                      <div className="sg-stage-status">
                        <div className="sg-timer sg-round-timer">
                          <span className="sg-label">Čas</span>
                          <span className="sg-timer-value">{timeLeft}<small>s</small></span>
                        </div>
                      </div>

                      <div className="sg-score-pill">
                        <span className="sg-label">Kolo</span>
                        <strong>{round}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="sg-result-panel">
              <div className="sg-result">
                <p className="sg-eyebrow">Konec hry!</p>
                <h2>Tvoje výsledky</h2>
                <p>Správné odpovědi: <strong>{score.correct} / {maxRounds}</strong></p>
                <p>Průměrná doba uhodnutí správných tipů: <strong>{averageTime ? `${averageTime.toFixed(2)} s` : 'N/A'}</strong></p>
              </div>

              <div className="sg-register">
                <h3>Zapsat se do leaderboardu</h3>
                <form onSubmit={handleLeaderboardSubmit} className="sg-register-form">
                  <label className="sr-only" htmlFor="playerName">Jméno</label>
                  <input
                    id="playerName"
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                    maxLength={40}
                    placeholder="Zadej své jméno"
                    className="sg-input"
                  />
                  <button
                    type="submit"
                    disabled={isRegistered || isSubmitting}
                    className="sg-button sg-button-primary"
                  >
                    {isSubmitting ? 'Ukládám…' : isRegistered ? 'Uloženo' : 'Uložit výsledky'}
                  </button>
                </form>
                {submitMessage && (
                  <p className="sg-submit-message">{submitMessage}</p>
                )}
                <div className="sg-register-actions">
                  <button
                    type="button"
                    onClick={() => transitionToView('leaderboard')}
                    className="sg-button sg-button-secondary sg-register-link"
                  >
                    Zobrazit leaderboard
                  </button>
                  <button
                    type="button"
                    onClick={resetGame}
                    className="sg-button sg-button-secondary"
                  >
                    Restart hry
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isFinished && shouldShowRoundPanel && (
            <>
              <div className="sg-guess">
                <label htmlFor="guess">
                  Tvůj tip
                </label>
                <div className="sg-input-wrap">
                  <input
                    id="guess"
                    value={guess}
                    onChange={(event) => {
                      setGuess(event.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Tab' && suggestions.length === 1) {
                        event.preventDefault();
                        setGuess(suggestions[0].title);
                        setShowSuggestions(false);
                      }
                      if (event.key === 'Enter' && guess.trim()) {
                        event.preventDefault();
                        handleGuess();
                      }
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                    placeholder="Napr. Niekde v oblakoch"
                    className="sg-input"
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="sg-suggestions">
                      {suggestions.map((song) => (
                        <li key={song.id}>
                          <button
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleSuggestionClick(song.title)}
                            className="sg-suggestion"
                          >
                            <span>{song.title}</span>
                            <span>{song.album}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="sg-actions">
                <button
                  onClick={handleGuess}
                  disabled={!guess.trim()}
                  className="sg-button sg-button-secondary sg-submit-guess sg-submit-guess-animate"
                >
                  <span aria-hidden="true">✓</span>
                </button>
                <button
                  onClick={startRoundSequence}
                  className="sg-button sg-button-secondary sg-button-highlight"
                >
                  Nové kolo
                </button>
                <button
                  onClick={resetGame}
                  className="sg-button sg-button-secondary"
                >
                  Restart hry
                </button>
              </div>
            </>
          )}

          {feedback && (
            <div
              className={`sg-feedback ${feedback.type === 'success' ? 'is-success' : 'is-error'}`}
            >
              <p className="font-semibold">{feedback.message}</p>
              {feedback.type !== 'success' && (
                <div>
                  <p><span>Album:</span> {currentSong?.album}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <footer className="sg-footer">
        <p>Developed by <a href='https://github.com/Kratomchvil' target="_blank" rel="noopener noreferrer">Daniel Kratochvíl</a> <span aria-hidden="true">·</span> SaulGuesser © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
