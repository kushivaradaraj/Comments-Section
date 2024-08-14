// src/components/CommentList.js
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onEdit, onDelete, onReply, onReact }) => {
  const renderComments = (comments, parentId = null) => {
    return comments
      .filter(comment => comment.parentId === parentId)
      .map(comment => (
        <div key={comment.id} className={parentId ? 'reply-box' : 'comment-box'}>
          <Comment 
            id={comment.id}
            name={comment.name}
            text={comment.text}
            date={comment.date}
            reactions={comment.reactions} // Pass reactions prop
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
            onReact={onReact} // Pass onReact prop
          />
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  return <div>{renderComments(comments)}</div>;
};

export default CommentList;



