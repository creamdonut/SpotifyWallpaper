import SpotifyWebApi from 'spotify-web-api-node';

import axios from 'axios';
import request from 'request';
import Jimp from 'jimp';

import fs from 'fs';

import { AXIOS_CONFIG } from './consts';

export const setAccessToken = (spotifyApi: SpotifyWebApi) => {
  axios('https://accounts.spotify.com/api/token', AXIOS_CONFIG)
    .then(function (response: { data: { access_token: string } }) {
      spotifyApi.setAccessToken(response.data.access_token);
    })
    .catch(function (error: Error) {
      console.log(error);
    });
};

export const saveImage = (url: string, path: string, callback: any) => {
  request.head(url, () => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

export const buildWallpapperAndSave = () => {
  Jimp.read('./image.png', async (err, image: any) => {
    if (err) throw err;
    const back = await Jimp.read('black-screen.jpg');

    const cover = back.blur(2).blit(image, 650, 250);
    cover.contain(1920, 1080).write('image-wall.jpg'); // save
  });
};
