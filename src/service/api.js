import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40316933-e4107de9a39566c46b6979f3b';

export const fetchPhotos = async (newQuery, currentPage) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: newQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: currentPage,
          per_page: 12,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };