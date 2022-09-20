import pictureTpl from '../templates/picture.hbs';

export function renderPictures(pictures) {
  return pictures.hits.reduce(
    (acc, picture) => (acc += pictureTpl(picture)),
    ''
  );
}
