export const handleSortByDate = (comments) => {
    return comments.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  };