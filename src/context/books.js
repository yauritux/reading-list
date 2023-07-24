import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");

    setBooks(response.data);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);    
  };

  const updateBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle
    });

    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return {...book, ...response.data};
      }
      return book;
    });

    setBooks(updatedBooks);
  };  

  return (
    <BooksContext.Provider value={{ 
      books,
      createBook,
      deleteBookById,
      fetchBooks,
      updateBookById,
    }}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;