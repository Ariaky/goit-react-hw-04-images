import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => (
  <li className={css.item} onClick={() => onClick(image.largeImageURL)}>
    <img className={css.img} src={image.webformatURL} alt="" />
  </li>
);

export default ImageGalleryItem;