import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class SearchImages {
  static API = {
    URL: 'https://pixabay.com/api/',
    KEY: '37599795-c944c27653bb06b521e6c5184',
  };

  constructor({
    searchQuery,
    imageType,
    orientation,
    safesearch,
    page,
    perPage,
  }) {
    this.searchQuery = searchQuery;
    this.imageType = imageType;
    this.orientation = orientation;
    this.safesearch = safesearch;
    this.page = page;
    this.perPage = perPage;
  }

  searchOnQuery() {
    const { URL, KEY } = SearchImages.API;
    const searchQuery = `q=${this.searchQuery}`;
    const imageType = `image_type=${this.imageType}`;
    const orientation = `orientation=${this.orientation}`;
    const safesearch = `safesearch=${this.safesearch}`;
    const page = `page=${this.page}`;
    const perPage = `per_page=${this.perPage}`;

    return fetch(
      `${URL}?key=${KEY}&${searchQuery}&${imageType}&${orientation}&${safesearch}&${page}&${perPage}`
    )
      .then(responce => responce.json())
      .then(data => {
        if (data.hits.length === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        return data;
      })
      .catch(error => console.log(error));
  }
}
