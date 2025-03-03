import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

const BookCard = ({ book, onRequest, onReturn }) => {
  // Ensure accepted is a boolean (could be returned as string "true")
  const accepted = book.accepted === true || book.accepted === "true";

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {book.image && (
        <CardMedia
          component="img"
          height="140"
          image={book.image}
          alt={book.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Requested: {book.requested ? "Yes" : "No"} | Accepted: {accepted ? "Yes" : "No"}
        </Typography>
      </CardContent>
      <CardActions>
        {(!book.requested && !accepted) && (
          <Button size="small" onClick={() => onRequest(book.id)}>Request</Button>
        )}
        {(accepted && Number(book.userId) === Number(localStorage.getItem('userId'))) && (
          <Button size="small" onClick={() => onReturn(book.id)}>Return</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
