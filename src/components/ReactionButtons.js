// components/ReactionButtons.js
import React from 'react';

const ReactionButtons = ({ commentId, onReact }) => (
  <div className="reaction-buttons">
    {['👍', '❤️', '😂', '😮', '😢', '👎'].map(emoji => (
      <button key={emoji} onClick={() => onReact(commentId, emoji)}>
        {emoji}
      </button>
    ))}
  </div>
);

export default ReactionButtons;

