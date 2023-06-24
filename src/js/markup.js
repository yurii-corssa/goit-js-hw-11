export function createCardMarkup(element, imageData) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = imageData;

  const markup = `
        <div class="photo-card">
            <div class="img-container">
                <a href="${largeImageURL}">
                    <img
                        src="${webformatURL}"
                        alt="${tags}"
                        class="card-img"
                        loading="lazy"
                    />
                </a>
            </div>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>
`;

  element.insertAdjacentHTML('beforeend', markup);
}

export function resetGalleryMarkup(element) {
  element.innerHTML = '';
}

export function addClass(element, value) {
  if (!element.classList.contains(value)) {
    element.classList.add(value);
  }
}

export function removeClass(element, value) {
  element.classList.remove(value);
}
