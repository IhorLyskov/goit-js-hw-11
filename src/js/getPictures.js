import axios from './axios';

const KEY = '30038078-5a44fa1b8ec715db4f1777f11';

export async function getPictures(q, page = 1, per_page = 40) {
  const response = await axios.get('', {
    params: {
      key: `${KEY}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q,
      page,
      per_page,
    },
  });
  return response.data;
}
