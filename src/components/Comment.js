import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatDate } from '../dateUtils'; 

const ReactionPopup = ({ commentId, onReact, onClose }) => (
  <div className="reaction-popup">
    {['👍', '❤️', '😂', '😮', '😢', '👎'].map(emoji => (
      <button key={emoji} onClick={() => { onReact(commentId, emoji); onClose(); }}>
        {emoji}
      </button>
    ))}
  </div>
);

const Comment = ({ id, name, text, date, reactions = {}, onEdit, onDelete, onReply, onReact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [showReactions, setShowReactions] = useState(false);

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
        <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
      ) : (
        <p>{text}</p>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={() => setIsReplying(!isReplying)}>{isReplying ? 'Cancel' : 'Reply'}</button>
      {isReplying && (
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
          />
          <textarea
            placeholder="Your reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Submit Reply</button>
        </div>
      )}
      <button onClick={() => setShowReactions(!showReactions)}>React</button>
      {showReactions && <ReactionPopup commentId={id} onReact={onReact} onClose={() => setShowReactions(false)} />}
      <div className="reactions">
        {Object.entries(reactions).map(([emoji, count]) => (
          <span key={emoji}>{emoji} {count}</span>
        ))}
      </div>
      <button className="delete-button" onClick={() => onDelete(id)}>
        <AiOutlineDelete size={20} />
      </button>
    </div>
  );
};

export default Comment;
