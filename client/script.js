axios.get('http://localhost:3001/posts')
  .then(response => {
    console.log(response.data); // Handle the data received from the backend
    displayPosts(response.data); // Call a function to display the posts on the front end
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
  });


function displayPosts(posts) {
    const postsContainer = document.getElementById('post-list');
    postsContainer.innerHTML = ''; // Clear the container before adding new content
  
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  }