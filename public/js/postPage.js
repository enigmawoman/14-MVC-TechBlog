const newFormHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector("#comment-desc").value.trim();

  console.log(commentBody);

  if (commentBody) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ user_comment: commentBody }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post/:id');
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
