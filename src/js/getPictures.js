import axios from './axios';

import { gPage, KEY } from './globals';

export async function getPictures(q, page = 1, per_page = 40) {
  const response = await axios.get('', {
    params: {
      key: `${KEY}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q,
      gPage,
      per_page,
      SameSite: 'Lax',
    },
  });
  return response.data;
}
