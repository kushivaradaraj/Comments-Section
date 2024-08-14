import React, { useState, useEffect } from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import { handleSortByDate } from './utils'; 
import './App.css'; 

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    if (Array.isArray(storedComments)) {
      setComments(storedComments);
    } else {
      setComments([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    const newComment = { ...comment, id: Date.now(), date: new Date().toISOString(), parentId: comment.parentId || null };
    setComments([newComment, ...comments]);
  };

  const editComment = (id, text) => {
    const updatedComments = comments.map(comment => 
      comment.id === id ? { ...comment, text } : comment
    );
    setComments(updatedComments);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
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
      />
    </div>
  );
};

export default App;