            // Track if we are editing an existing post
let editingPostId = null;

// Fetch and display posts from newest to oldest
async function fetchPosts() {
    try {
        const response = await axios.get('http://localhost:3001/posts');
        let posts = response.data.data;

        if (Array.isArray(posts) && posts.length > 0) {
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayPosts(posts);
        } else {
            document.getElementById('post-list').innerHTML = '<p>No posts available.</p>';
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        document.getElementById('post-list').innerHTML = '<p>Error fetching posts.</p>';
    }
}

// Fetch and display authors in the dropdown
async function fetchAuthors() {
    try {
        const response = await axios.get('http://localhost:3001/authors');
        let authors = response.data.data;

        if (Array.isArray(authors) && authors.length > 0) {
            const authorSelect = document.getElementById('post-author');
            authorSelect.innerHTML = '<option value="">Select an Author</option>'; // Reset options

            authors.forEach(author => {
                const option = document.createElement('option');
                option.value = author._id;
                option.textContent = author.name;
                authorSelect.appendChild(option);
            });
        } else {
            document.getElementById('post-author').innerHTML = '<option value="">No authors available</option>';
        }
    } catch (error) {
        console.error('Error fetching authors:', error);
        document.getElementById('post-author').innerHTML = '<option value="">Error loading authors</option>';
    }
}



// Function to display posts on the page
function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        
        postItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p><strong>Author:</strong> ${post.author}</p>
            <p><strong>Date:</strong> ${new Date(post.date).toLocaleDateString()}</p>
            <button onclick="editPost('${post._id}')">Edit Post</button>
            <hr>
        `;
        postList.appendChild(postItem);
    });
}

// Function to edit a post by ID
async function editPost(postId) {
    try {
        const response = await axios.get(`http://localhost:3001/posts/${postId}`);
        const post = response.data.data;

        // Populate the form with the post data
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-date').value = post.date.split('T')[0];
        document.getElementById('post-image').value = post.image;
        document.getElementById('post-content').value = post.content;
        document.getElementById('post-author').value = post.author;

        // Set the editingPostId to the post being edited
        editingPostId = postId;

        // Change the button text to "Update Post"
        document.getElementById('submit-btn').textContent = 'Update Post';

        // Hide the post list
        document.getElementById('post-list').style.display = 'none';

    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

// Event listener for form submission (create or update post)
document.getElementById('create-post-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const date = document.getElementById('post-date').value;
    const image = document.getElementById('post-image').value;
    const content = document.getElementById('post-content').value;
    const author = document.getElementById('post-author').value;

    const postData = {
        title, date, image, content, author
    };

    try {
        if (editingPostId) {
            // If editingPostId is set, update the existing post
            await axios.put(`http://localhost:3001/posts/${editingPostId}`, postData);
            alert('Post updated successfully!');
        } else {
            // If no editingPostId, create a new post
            await axios.post('http://localhost:3001/posts', postData);
            alert('Post created successfully!');
        }

        // Reset the form
        document.getElementById('create-post-form').reset();
        editingPostId = null;
        document.getElementById('submit-btn').textContent = 'Create Post';

        // Show the post list again
        document.getElementById('post-list').style.display = 'block';
      //  document.getElementById('form-container').style.display = 'block';

        // Refresh the list of posts
        fetchPosts();
    } catch (error) {
        console.error('Error submitting post:', error);
        alert('Failed to submit post.');
    }
});


// Initialize
fetchPosts();
fetchAuthors();