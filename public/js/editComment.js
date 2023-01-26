//function that will run from the event listener below
const updateCommentHandler = async (event) => {
  //stops the page refreshing and deleting the data submitted before it makes it back to the database
    event.preventDefault();
      // if the click event on the event listener, has the attribute "data-id", it will read the id of the post associated with the data-id attribute
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
  
// reads the "value" or content entered into the form area with id post-desc-update
  const commentUpdate = document.querySelector('#comment-desc-update').value.trim();
    console.log(commentUpdate);
// this is a PUT request to update the content of the form area with id comment-desc-update, with the "value" found in const commentUpdate
const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ user_comment: commentUpdate }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
// if the response from the backend routing is ok, the previous page in broswer history loads
    if (response.ok) {
        history.back();
      } else {
        alert('Failed to update project');
      }
    }
  }
  
  const delButtonHandler = async (event) => {
    event.preventDefault();
      // if the click event on the event listener, has the attribute "data-id", it will read the id of the post associated with the data-id attribute
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
          // this is a DELETE request to delete the associaieted data in the database

      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  // if the response from the backend routing is ok, then the page is replaced with the /dashboard page

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
   
  };
   
// query selectors to identfy the form to add the event listener onto it, which will run the functions  on "click"

document
  .querySelector('.update-comment')
  .addEventListener('click', updateCommentHandler);

document
  .querySelector('.delete-comment')
  .addEventListener('click', delButtonHandler);
