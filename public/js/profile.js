//adding a post fucntion
const newFormHandler = async (event) => {
  event.preventDefault();
// getting the values entered in the form for post name and post body
  const postName = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  console.log(postName, description);
// Send a POST request to the API endpoint
  if (postName && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ post_title: postName, post_body: description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
// if the response from the backend routing is ok, then the page is replaced with /dashboard page

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};



document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

