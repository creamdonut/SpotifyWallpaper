import qs from 'qs';
require('dotenv').config();

export const IMAGE_PATH = './image.png';

const data = qs.stringify({
  grant_type: 'refresh_token',
  refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
});

export const AXIOS_CONFIG = {
  method: 'post' as const,
  headers: {
    Authorization: `Basic ${process.env.SPOTIFY_BASIC}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie:
      '__Host-device_id=AQBINWrHUUM2WezCoF2HBZ8pkGkX93KhMbF_hkOs3MpHVsQRQoVrCbcXc2zwEYvvrrxuCsU84VBGQoHI7Jc_RR4HHWYsuRYdyCk'
  },
  data: data
};
