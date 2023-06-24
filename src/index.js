import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { SearchImages } from './js/pixabay-api';
import {
  createCardMarkup,
  resetGalleryMarkup,
  removeClass,
  addClass,
} from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';

const refs = {
  header: document.querySelector('.header-section'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('.load-more'),
  endGallery: document.querySelector('.end-gallery '),
};

refs.form.addEventListener('submit', createGallery);
// refs.loadMoreBtn.addEventListener('click', appendToGallery);

const lightbox = new SimpleLightbox('.gallery a');
const { height: heightHeader } = refs.header.getBoundingClientRect();

const newSearch = new SearchImages({
  searchQuery: '',
  imageType: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  perPage: 40,
});

async function createGallery(event) {
  event.preventDefault();
  newSearch.page = 1;

  //   addClass(refs.loadMoreBtn, 'is-hidden');
  addClass(refs.endGallery, 'is-hidden');
  resetGalleryMarkup(refs.gallery);
  getInputValue(event);
  const searchData = await getSearchData();
  parseSearchData(searchData);
  showMessage(searchData);
  showGalleryEnd(searchData);

  window.scrollBy({
    top: heightHeader,
    behavior: 'smooth',
  });

  lightbox.refresh();

  let infScroll = new InfiniteScroll(refs.gallery, {
    path: '.gallery a',
    append: 'photo-card',
    history: false,
    status: '.scroll-status',
  });

  infScroll.on('append', function (response, path, items) {
    newSearch.page += 1;
    getSearchData()
      .then(parseSearchData)
      .then(() => {
        showGalleryEnd(response);
        lightbox.refresh();
      });
  });

  newSearch.page += 1;
}

// async function appendToGallery() {
//   const searchData = await getSearchData();
//   parseSearchData(searchData);
//   showGalleryEnd(searchData);

//   newSearch.page += 1;
// }

/* ---------------------------------- */

function getInputValue(event) {
  event.preventDefault();
  newSearch.searchQuery = event.currentTarget.elements.searchQuery.value;
}

function getSearchData() {
  return newSearch.searchOnQuery();
}

function parseSearchData(data) {
  for (const imageData of data.hits) {
    createCardMarkup(refs.gallery, imageData);
  }
}

function showMessage(data) {
  if (newSearch.page === 1) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
}

function showGalleryEnd(data) {
  if (refs.gallery.childElementCount === data.totalHits && data.totalHits > 0) {
    // addClass(refs.loadMoreBtn, 'is-hidden');
    removeClass(refs.endGallery, 'is-hidden');
    return;
  }

  //   if (refs.loadMoreBtn.classList.contains('is-hidden') && data.totalHits > 0) {
  //     removeClass(refs.loadMoreBtn, 'is-hidden');
  //   }
}
