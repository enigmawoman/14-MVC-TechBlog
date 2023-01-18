const newFormHandler = async (event) => {
  event.preventDefault();

  const postName = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  console.log(postName, description);

  if (postName && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ post_title: postName, post_body: description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

