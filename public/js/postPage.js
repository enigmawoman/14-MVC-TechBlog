// adding new comment function
const newFormHandler = async (event) => {
  event.preventDefault();
// getting value of the comment body
  const commentBody = document.querySelector("#comment-desc").value.trim();

  console.log(commentBody);
// finding the id of the post
  const post_id = window.location.href.split('/')[4];

  console.log(post_id);
// Send a POST request to the API endpoint
if (commentBody) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ user_comment: commentBody, post_id: post_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
// if the response from the backend routing is ok, then the page is replaced with the post with the associated id page

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to create post');
    }
    console.log(post_id);
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
