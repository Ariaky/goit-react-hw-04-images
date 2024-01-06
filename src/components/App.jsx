import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { fetchPhotos } from '../service/api';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    showModal: false,
    page: 1,
    photos: [],
    searchMatches: 0,
    totalHits: 0,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchPhotos(query, page)
        .then((data) => {
          if (data.hits.length === 0) {
            toast.info('No images found!', {
              position: 'bottom-center',
              theme: 'colored',
              autoClose: 2000,
              closeOnClick: true,
            });
          }

          const updatedPhotos = [...this.state.photos, ...data.hits];
          const allPhotosLoaded = updatedPhotos.length >= data.totalHits;

          this.setState(
            (prevState) => ({
              photos: updatedPhotos,
              showLoadMore: !allPhotosLoaded,
              searchMatches: prevState.searchMatches + data.hits.length,
              totalHits: data.totalHits,
            }),
            () => {
              if (data.totalHits > 0 && page === 1) {
                toast.success(`Hooray! We found ${data.totalHits} images`, {
                  position: 'top-right',
                  theme: 'colored',
                  autoClose: 2000,
                  closeOnClick: true,
                });
              }
            }
          );
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          toast.error('Error fetching images. Please try again later.', {
            position: 'bottom-center',
            theme: 'colored',
            autoClose: 2000,
            closeOnClick: true,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSearchSubmit = (name) => {
    if (this.state.query.toLowerCase() === name.toLowerCase()) {
      toast.info(`You are searching for ${name} already!`, {
        position: 'top-center',
        theme: 'colored',
        autoClose: 2000,
        closeOnClick: true,
      });
      /*return alert(`You are searching for "${name}" already!`);*/
    }
    this.setState({ query: name.toLowerCase(), photos: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, modalImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { photos, isLoading, showModal, modalImage, showLoadMore } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={photos} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {photos.length > 0 && !isLoading && showLoadMore && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && <Modal onClose={this.handleCloseModal} image={modalImage} />}
        <ToastContainer />
      </div>
    );
  }
}


