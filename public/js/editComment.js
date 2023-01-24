const updateCommentHandler = async (event) => {
   
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
  
  
    const commentUpdate = document.querySelector('#comment-desc-update').value.trim();
    console.log(commentUpdate);
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ user_comment: commentUpdate }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        history.back();
      } else {
        alert('Failed to update project');
      }
    }
  }
  
  const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
   
  };
   

document
  .querySelector('.update-comment')
  .addEventListener('click', updateCommentHandler);

document
  .querySelector('.delete-comment')
  .addEventListener('click', delButtonHandler);
