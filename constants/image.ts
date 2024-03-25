import colors from 'tailwindcss/colors';

export const TMDB_IMAGE_BASE_ORIGINAL = 'https://image.tmdb.org/t/p/original';
export const TMDB_IMAGE_BASE_THUMB = 'https://image.tmdb.org/t/p/w185';
export const TMDB_IMAGE_BASE_BACKDROP = 'https://image.tmdb.org/t/p/w1280';

export const TMDB_THUMB_WIDTH = 185;
export const TMDB_THUMB_HEIGHT = 278;

export const TMDB_BACKDROP_WIDTH = 1280;
export const TMDB_BACKDROP_HEIGHT = 720;

const avatarBackgroundColors = [
  ...Object.entries(colors.indigo).filter((entry) => 400 <= Number(entry[0]) && Number(entry[0]) <= 700).map((entry) => entry[1].substring(1)),
  ...Object.entries(colors.fuchsia).filter((entry) => 500 <= Number(entry[0]) && Number(entry[0]) <= 700).map((entry) => entry[1].substring(1)),
].join(',');

export const AVATAR_FALLBACK_BASE = `https://api.dicebear.com/8.x/thumbs/svg?backgroundColor=transparent&shapeColor=${avatarBackgroundColors}`;
