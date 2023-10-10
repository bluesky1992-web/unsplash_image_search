import { useRef } from 'react';
import './index.css';
import { Form } from 'react-bootstrap';

const App = () => {
  const searchInput = useRef(null);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
  };
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
  };
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
    </div>
  );
};

export default App;
