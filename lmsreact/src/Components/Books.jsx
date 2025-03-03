// src/Components/Books.jsx
import React, { useEffect, useState } from 'react';
import bookService from '../Services/bookService';
import BookCard from './BookCard';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [tab, setTab] = useState('all'); // 'all', 'accepted', 'pending', 'search'
  const [searchQuery, setSearchQuery] = useState('');
  
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'ADMIN';

  // Load books on mount (only for non-admin)
  useEffect(() => {
    if (!isAdmin) {
      loadBooks();
    }
  }, [tab, searchQuery, isAdmin]);

  const loadBooks = async () => {
    try {
      let response;
      if (tab === 'all') {
        response = await bookService.getAllBooks();
      } else if (tab === 'accepted') {
        response = await bookService.getAcceptedBooks(userId);
      } else if (tab === 'pending') {
        response = await bookService.getRequestedBooks(userId);
      } else if (tab === 'search') {
        response = await bookService.getAllBooks(); // Load all, filter client-side.
      }
      let data = response.data;
      if (tab === 'search' && searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        data = data.filter(book =>
          book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
        );
      }
      setBooks(data);
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error fetching books: " + errorMsg);
    }
  };

  if (isAdmin) {
    return (
      <div className="container text-center my-3">
        <h5>Users Only</h5>
        <p>Admins should view books via the Admin Panel.</p>
      </div>
    );
  }

  const handleRequest = async (bookId) => {
    try {
      await bookService.requestBook(bookId, userId);
      alert("Book requested successfully.");
      loadBooks();
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error requesting book: " + errorMsg);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const response = await bookService.returnBook(bookId, userId);
      alert(response.data);
      loadBooks();
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error returning book: " + errorMsg);
    }
  };

  // Books filtering using searchQuery
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h4 className="mb-3">My Books</h4>
      
      {/* Buttons for controlling tab & search */}
      <div className="mb-3 d-flex flex-wrap align-items-center">
        <button className="btn btn-primary me-2 mb-2" onClick={() => { setTab('all'); setSearchQuery(''); }}>
          All Books
        </button>
        <button className="btn btn-primary me-2 mb-2" onClick={() => { setTab('accepted'); setSearchQuery(''); }}>
          My Accepted Books
        </button>
        <button className="btn btn-primary me-2 mb-2" onClick={() => { setTab('pending'); setSearchQuery(''); }}>
          My Pending Requests
        </button>
        <button className="btn btn-primary me-2 mb-2" onClick={() => setTab('search')}>
          Search Books
        </button>
        {tab === 'search' && (
          <input
            type="text"
            className="form-control d-inline-block ms-2 mb-2"
            style={{ maxWidth: '250px' }}
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>

      {/* Flex-based board for books */}
      <div className="d-flex flex-wrap">
        {filteredBooks.map(book => (
          <div key={book.id} className="p-2" style={{ flex: '1 0 250px' }}>
            <BookCard book={book} onRequest={handleRequest} onReturn={handleReturn} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
