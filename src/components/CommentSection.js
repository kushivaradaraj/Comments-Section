import React, { useState } from 'react';
import CommentList from './CommentList';

const CommentSection = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const handleEdit = (id, newText) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, text: newText } : comment
      )
    );
  };

  const handleDelete = (id) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== id)
    );
  };

  const handleReply = (newReply) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === newReply.parentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  const handleSortByDate = () => {
    const sortedComments = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    setComments(sortedComments);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={handleSortByDate}>Sort by: date and time</button>
      </div>
      <CommentList
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReply={handleReply}
      />
    </div>
  );
};

export default CommentSection;
