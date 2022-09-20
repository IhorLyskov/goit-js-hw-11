import '~node_modules/modern-normalize/modern-normalize.css';
import './css/gallery.css';

import { getPictures } from './js/getPictures';
import { renderPictures } from './js/markup';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.gallery__search-form');
const galleryPictures = document.querySelector('.gallery__pictures');
const loadMore = document.querySelector('.load-more');

let gQuery;
let gPage = 1;
let gTotalHits = 0;

async function searchPictures() {
  try {
    const pictures = await getPictures(gQuery, gPage);

    if (Number(pictures.totalHits)) {
      galleryPictures.innerHTML = renderPictures(pictures);
      loadMore.classList.remove('visually-hidden');
      gPage += 1;
    } else {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch {
    Notiflix.Notify.failure('Error!');
  }
}
// document.cookie = 'cookie2=value2; SameSite=None; Secure';
document.cookie = 'cookie1=value1; SameSite=Strict';

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { searchQuery },
  } = evt.currentTarget;

  gQuery = searchQuery.value.trim();
  console.log(gQuery);

  if (gQuery === '') {
    Notiflix.Notify.failure('Please fill in search field!');
  } else {
    gPage = 1;
    searchPictures(gQuery);
  }
  evt.currentTarget.reset();
}

loadMore.addEventListener('click', onLoadMoreForm);

function onLoadMoreForm(evt) {
  gPage += 1;
  searchPictures(gQuery);
}
