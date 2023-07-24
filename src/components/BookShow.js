import { useState } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/use-books-context";

function BookShow({ book }) {  
  const [showEdit, setShowEdit] = useState(false);

  const { deleteBookById } = useBooksContext();

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleEditSubmit = () => {
    setShowEdit(false);
  };

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleEditSubmit} />;
  }

  const handleDeleteClick = (event) => {
    deleteBookById(book.id);
  };

  return (
    <div className="book-show">
      <img alt="book" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>Edit</button>
        <button className="delete" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default BookShow;