// src/components/CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      onAdd({ name, text, date: new Date().toISOString() });
      setName('');
      setText('');
    } else {
      alert('Please enter both name and comment text.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <textarea 
        placeholder="Comment" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>Add Comment</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default CommentForm;

