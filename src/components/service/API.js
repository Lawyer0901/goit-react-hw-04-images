import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31605839-858af090e8e0e31dbfed95a6b';
export const PER_PAGE = 12;

export const getImages = async (page, search) => {
  const response = await axios.get(
    `?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  // console.log(response);
  if (response.status === 200) {
    return response.data;
  }
};
