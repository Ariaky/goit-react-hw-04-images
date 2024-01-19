import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { fetchPhotos } from '../service/api';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const appRef = useRef();

  const handleSearchSubmit = (name) => {
    if (query.toLowerCase() === name.toLowerCase()) {
      toast.info(`You are searching for ${name} already!`, {
        position: 'top-center',
        theme: 'colored',
        autoClose: 2000,
        closeOnClick: true,
      });
      return;
    }
    setQuery(name.toLowerCase());
    setImages([]);
    setPage(1);
    setTotalHits(0);
    setModalImage('');
  };
  
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPhotos(query, page);
        if (data.totalHits === 0) {
          toast.info('No images found!', {
            position: 'bottom-center',
            theme: 'colored',
            autoClose: 2000,
            closeOnClick: true,
          });
        }
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
        setIsLoading(false);

        if (data.totalHits > 0 && page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images`, {
            position: 'top-right',
            theme: 'colored',
            autoClose: 2000,
            closeOnClick: true,
          });
        }        
      } catch (error) {
        toast.error('Error fetching images. Please try again later.', {
          position: 'bottom-center',
          theme: 'colored',
          autoClose: 2000,
          closeOnClick: true,
        })
      }
    };

    if (query !== '' || page !== 1) {
      fetchData();
    }
  }, [query, page]);

  useEffect(() => {
    window.scrollTo(0, appRef.current.scrollHeight);
  },[images]);
  
  return (
    <div className={css.app} ref={appRef}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && images.length < totalHits && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && <Modal onClose={handleCloseModal} image={modalImage} />}
      <ToastContainer />
    </div>
  );
};

export default App;
