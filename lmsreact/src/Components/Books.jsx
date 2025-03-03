import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';
import bookService from '../Services/bookService';
import BookCard from './BookCard';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [tab, setTab] = useState('all'); // 'all', 'accepted', 'pending', 'search'
  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'ADMIN';

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
        response = await bookService.getAllBooks(); // We'll filter client-side.
      }
      let data = response.data;
      if (tab === 'search' && searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        data = data.filter(book =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
        );
      }
      setBooks(data);
    } catch (error) {
      const errorMsg =
        error.response && typeof error.response.data === 'object'
          ? JSON.stringify(error.response.data)
          : error.response?.data || error.message;
      alert("Error fetching books: " + errorMsg);
    }
  };

  if (isAdmin) {
    return (
      <div>
        <Typography variant="h5">Users Only</Typography>
        <Typography variant="body1">Admins should view books via the Admin Panel.</Typography>
      </div>
    );
  }

  const handleRequest = async (bookId) => {
    try {
      await bookService.requestBook(bookId, userId);
      alert("Book requested successfully.");
      loadBooks();
    } catch (error) {
      const errorMsg =
        error.response && typeof error.response.data === 'object'
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
      const errorMsg =
        error.response && typeof error.response.data === 'object'
          ? JSON.stringify(error.response.data)
          : error.response?.data || error.message;
      alert("Error returning book: " + errorMsg);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>My Books</Typography>
      <div style={{ marginBottom: '15px' }}>
        <Button variant="contained" onClick={() => { setTab('all'); setSearchQuery(''); }}>
          All Books
        </Button>
        <Button variant="contained" onClick={() => { setTab('accepted'); setSearchQuery(''); }} sx={{ ml: 1 }}>
          My Accepted Books
        </Button>
        <Button variant="contained" onClick={() => { setTab('pending'); setSearchQuery(''); }} sx={{ ml: 1 }}>
          My Pending Requests
        </Button>
        <Button variant="contained" onClick={() => setTab('search')} sx={{ ml: 1 }}>
          Search Books
        </Button>
        {tab === 'search' && (
          <TextField
            label="Search by title or author"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1 }}
          />
        )}
      </div>
      <Grid container spacing={2}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} onRequest={handleRequest} onReturn={handleReturn} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Books;
