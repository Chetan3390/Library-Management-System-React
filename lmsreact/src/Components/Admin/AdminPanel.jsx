import React, { useEffect, useState } from 'react';
import { Button, Typography, Paper, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import bookService from '../../Services/bookService';
import BookTable from './BookTable';
import AdminUsers from './AdminUsers';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [showBookRequests, setShowBookRequests] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookService.adminGetAllBooks();
      setBooks(response.data);
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error fetching books: " + errorMsg);
    }
  };

  // Form submission for adding a new book (without images)
  const onSubmitAddBook = async (data) => {
    try {
      await bookService.addNewBook(data);
      alert("Book added successfully!");
      reset();
      loadBooks();
    } catch (error) {
      alert("Error adding book: " + (error.response?.data || error.message));
    }
  };

  // Book action handlers
  const handleAccept = async (bookId, requestUserId) => {
    try {
      await bookService.acceptBookRequest(bookId, requestUserId);
      alert("Book accepted.");
      loadBooks();
    } catch (error) {
      alert("Error accepting book: " + (error.response?.data || error.message));
    }
  };

  const handleReject = async (bookId, requestUserId) => {
    try {
      await bookService.rejectBookRequest(bookId, requestUserId);
      alert("Book rejected.");
      loadBooks();
    } catch (error) {
      alert("Error rejecting book: " + (error.response?.data || error.message));
    }
  };

  const handleRevoke = async (bookId, requestUserId) => {
    try {
      await bookService.revokeBook(bookId, requestUserId);
      alert("Book revoked.");
      loadBooks();
    } catch (error) {
      alert("Error revoking book: " + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      alert("Book deleted.");
      loadBooks();
    } catch (error) {
      alert("Error deleting book: " + (error.response?.data || error.message));
    }
  };

  // Filtered books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  // Derive accepted and pending books
  const acceptedBooks = filteredBooks.filter(book =>
    book.accepted === true || book.accepted === "true"
  );
  const pendingBooks = filteredBooks.filter(book =>
    book.requested === true && !(book.accepted === true || book.accepted === "true")
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>
      
      {/* Section: Add New Book */}
      <Paper elevation={3} sx={{ padding: 3, mb: 3, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>Add New Book</Typography>
        <form onSubmit={handleSubmit(onSubmitAddBook)}>
          <TextField 
            label="Title" 
            fullWidth 
            margin="normal"
            {...register('title', { required: 'Title is required' })}
          />
          <TextField 
            label="Author" 
            fullWidth 
            margin="normal"
            {...register('author', { required: 'Author is required' })}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Add Book
          </Button>
        </form>
      </Paper>

      {/* Section: Search Books */}
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <TextField
          label="Search Books"
          variant="outlined"
          size="small"
          value={bookSearchQuery}
          onChange={(e) => setBookSearchQuery(e.target.value)}
          sx={{ width: '100%' }}
        />
      </Paper>

      {/* Section: All Books */}
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>All Books</Typography>
        <BookTable 
          books={filteredBooks}
          onAccept={handleAccept}
          onReject={handleReject}
          onRevoke={handleRevoke}
          onDelete={handleDelete}
        />
      </Paper>

      {/* Toggle Book Requests */}
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Button variant="contained" onClick={() => setShowBookRequests(prev => !prev)}>
          {showBookRequests ? "Hide Book Requests" : "Show Book Requests"}
        </Button>
      </Paper>

      {showBookRequests && (
        <>
          <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Accepted Book Requests</Typography>
            <BookTable 
              books={acceptedBooks}
              onRevoke={handleRevoke}
              onDelete={handleDelete}
            />
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Pending Book Requests</Typography>
            <BookTable 
              books={pendingBooks}
              onAccept={handleAccept}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          </Paper>
        </>
      )}

      {/* Toggle User Details Section */}
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Button variant="contained" onClick={() => setShowUsers(prev => !prev)}>
          {showUsers ? "Hide User Details" : "Show User Details"}
        </Button>
      </Paper>

      {showUsers && <AdminUsers />}
    </div>
  );
};

export default AdminPanel;
