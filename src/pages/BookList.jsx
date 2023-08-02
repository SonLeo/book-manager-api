import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const response = await axios.get('http://localhost:3001/booklist');
    setBooks(response.data);
  }

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3001/booklist/${id}`);
    getBooks();
  }

  return (
    <div className='main'>
      <div className='content'>
        <div className='header'>
          <h1 className='heading'>Library</h1>
          <Link to="/add"><button className='btn btn--add'>Thêm Sách</button></Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.quantity}</td>
                <td>
                  <Link to={`/edit/${book.id}`}><button className='btn btn--edit'>Sửa</button></Link>
                  <button className='btn btn--delete' onClick={() => deleteBook(book.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList