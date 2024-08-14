import React, { useState, useEffect } from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import './App.css';

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    if (Array.isArray(storedComments)) {
      setComments(storedComments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    const newComment = { ...comment, id: Date.now(), date: new Date().toISOString(), parentId: comment.parentId || null };
    setComments([newComment, ...comments]);
  };
  const handleReaction = (commentId, emoji) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const reactions = { ...comment.reactions };
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        return { ...comment, reactions };
      }
      return comment;
    }));
  };

  const handleSortByDate = (comments) => {
    return comments.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const editComment = (id, newText) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, text: newText } : comment
    ));
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

   const sortByDate = () => {
    console.log('Sort button clicked'); // Debugging log
    try {
      const sortedComments = handleSortByDate(comments);
      setComments(sortedComments);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Comments Section</h1>
      <CommentForm onAdd={addComment} />
      <div className="sort-button-container">
        <button className="sort-button" onClick={sortByDate}>
          Sort by: date and time
        </button>
      </div>
      <CommentList
        comments={comments}
        onEdit={editComment}
        onDelete={deleteComment}
        onReply={addComment}
        onReact={handleReaction}
      />
    </div>
  );
};

export default App;

