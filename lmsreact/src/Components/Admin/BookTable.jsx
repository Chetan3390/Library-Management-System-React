import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

const BookTable = ({ books, onAccept, onReject, onRevoke, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="books table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Requested</TableCell>
            <TableCell>Accepted</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.requested ? "Yes" : "No"}</TableCell>
              <TableCell>{book.accepted ? "Yes" : "No"}</TableCell>
              <TableCell>{book.userId}</TableCell>
              <TableCell>
                {book.requested && onAccept && (
                  <>
                    <Button variant="contained" size="small" onClick={() => onAccept(book.id, book.userId)}>
                      Accept
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => onReject(book.id, book.userId)}>
                      Reject
                    </Button>
                  </>
                )}
                {book.accepted && onRevoke && (
                  <Button variant="contained" color="secondary" size="small" onClick={() => onRevoke(book.id, book.userId)}>
                    Revoke
                  </Button>
                )}
                {onDelete && (
                  <Button variant="outlined" color="error" size="small" onClick={() => onDelete(book.id)}>
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
