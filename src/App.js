import { useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import useBooksContext from "./hooks/use-books-context";

function App() {
  const { fetchBooks } = useBooksContext();

  useEffect(() => {
    const appVersionListener = () => {
      alert('App version: v1.0');      
    };
    fetchBooks();

    document.body.addEventListener('click', appVersionListener);

    return () => {
      document.body.removeEventListener('click', appVersionListener);
    };
  }, [fetchBooks]);

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;