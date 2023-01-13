
const newFormHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector("#comment-desc").value.trim();

  console.log(commentBody);

  if (commentBody) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ user_comment: commentBody, post_id: }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      document.location.replace(`/post/${res.id}`);
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
