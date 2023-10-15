/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './index.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;
const App = () => {
  const [images, setImages] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);

  const searchInput = useRef(null);
  
  const resetSearch = () => {
    setImages();
    setPage(1);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };
  console.log('page', page);
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`,
      );
      console.log('data', data);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page]);
  return (
    <div className="container">
      <h1 className="title">image search</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
      <div className="images">
        {images?.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="image"
          />
        ))}
      </div>
      <div className="buttons">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default App;
