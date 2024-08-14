// src/redux/commentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: JSON.parse(localStorage.getItem('comments')) || [],
  sortBy: 'date',
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const index = state.comments.findIndex(comment => comment.id === id);
      if (index !== -1) {
        state.comments[index].text = text;
      }
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload && comment.parentId !== action.payload
      );
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addComment, editComment, deleteComment, setSortBy } = commentSlice.actions;

export default commentSlice.reducer;



