import SpotifyWebApi from 'spotify-web-api-node';
import wallpaper from 'wallpaper';
import { IMAGE_PATH } from './consts';
import { buildWallpapperAndSave, saveImage, setAccessToken } from './utils';

const spotifyApi = new SpotifyWebApi();

(async () => {
  await setAccessToken(spotifyApi);

  let isIntervalActive = true;

  const reload = setInterval(async () => {
    const data = await spotifyApi.getMyCurrentPlayingTrack();

    if (!data.body.is_playing) {
      isIntervalActive = false;
      return;
    }

    if (!data?.body?.item?.album.images[0].url) return;

    const coverLink = data?.body?.item?.album.images[0].url;
    saveImage(coverLink, IMAGE_PATH, async () => {
      await buildWallpapperAndSave();
    });

    setTimeout(() => {
      wallpaper.set('./image-wall.jpg');
      console.log('setted successfully');
    }, 2000);
  }, 5000);

  if (!isIntervalActive) {
    clearInterval(reload);
    console.log('exited');
  }
})().catch((e) => {
  console.error(e);
  console.log(process.pid);

  process.kill(process.pid);
});
