import '~node_modules/modern-normalize/modern-normalize.css';
import './css/gallery.css';

import { getPictures } from './js/getPictures';
import { renderPictures } from './js/markup';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.gallery__search-form');
const galleryPictures = document.querySelector('.gallery__pictures');
const loadMore = document.querySelector('.load-more');

let gQuery;
let gPage = 1;
let gTotalHits = 0;
const PER_PAGE_MAX = 40;
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function searchPictures() {
  try {
    loadMore.classList.add('visually-hidden');
    const pictures = await getPictures(gQuery, gPage, PER_PAGE_MAX);
    if (pictures.totalHits) {
      if (gPage === 1) {
        galleryPictures.innerHTML = '';
        gTotalHits = pictures.totalHits;
        Notiflix.Notify.info(`Hooray! We found ${gTotalHits} images.`);
      }
      galleryPictures.insertAdjacentHTML('beforeend', renderPictures(pictures));
      gallery.refresh();
      gPage += 1;
      gTotalHits -= pictures.hits.length;
      if (gTotalHits > 0) {
        loadMore.classList.remove('visually-hidden');
      } else {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } else {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch {
    Notiflix.Notify.failure('Error!');
  }
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { searchQuery },
  } = evt.currentTarget;

  gQuery = searchQuery.value.trim();

  if (gQuery === '') {
    Notiflix.Notify.failure('Please fill in search field!');
  } else {
    gPage = 1;
    searchPictures(PER_PAGE_MAX);
  }
  evt.currentTarget.reset();
}

loadMore.addEventListener('click', onLoadMoreForm);

function onLoadMoreForm(evt) {
  if (gTotalHits > 0) {
    searchPictures();
  }
}
