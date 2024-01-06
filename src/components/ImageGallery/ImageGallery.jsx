import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.gallery}>
    {images.map((image) => (
      <ImageGalleryItem 
      key={image.id} 
      image={image} 
      onClick={onImageClick} />
    ))}
  </ul>
);
export default ImageGallery;