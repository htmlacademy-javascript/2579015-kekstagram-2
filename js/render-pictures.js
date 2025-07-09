const createPicture = (post, pictureTemplate) => {
  const newPicture = pictureTemplate.cloneNode(true);

  const image = newPicture.querySelector('.picture__img');
  image.src = post.url;
  image.alt = post.description;
  newPicture.querySelector('.picture__likes').textContent = post.likes;
  newPicture.querySelector('.picture__comments').textContent = post.comments.length;

  return newPicture;
};

const renderPosts = (posts) => {
  const pictures = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  posts.forEach((element) => {
    const pictureItem = createPicture(element, template);
    fragment.appendChild(pictureItem);
  });

  pictures.appendChild(fragment);
};

export {renderPosts};
