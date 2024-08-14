import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatDate } from '../dateUtils'; 

const Comment = ({ id, name, text, date, onEdit, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editedText);
    }
    setIsEditing(!isEditing);
  };

  const handleReply = () => {
    if (replyName && replyText) {
      onReply({ name: replyName, text: replyText, date: new Date(), parentId: id });
      setReplyName('');
      setReplyText('');
      setIsReplying(false);
    } else {
      alert('Please enter both name and reply text.');
    }
  };

  return (
    <div style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', position: 'relative' }}>
      <p><strong>{name}</strong> <span>{formatDate(date)}</span></p> {/* Use the utility function */}
      {isEditing ? (
        <textarea 
          value={editedText} 
          onChange={(e) => setEditedText(e.target.value)} 
        />
      ) : (
        <p>{text}</p>
      )}
      <button className="text-button" onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button className="text-button" onClick={() => setIsReplying(!isReplying)}>Reply</button>
      <button className="button" onClick={() => onDelete(id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none' }}>
        <AiOutlineDelete size={20} />
      </button>
      
      {isReplying && (
        <div style={{ marginTop: '10px', marginLeft: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '5px' }}>
          <input 
            type="text" 
            placeholder="Name" 
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
          />
          <textarea 
            placeholder="Reply" 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
          />
          <button onClick={handleReply} style={{ padding: '5px 10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '3px' }}>Post</button>
        </div>
      )}
    </div>
  );
};

export default Comment;


