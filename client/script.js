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

// Function to display posts on the page
function displayPosts(posts) {
const postList = document.getElementById('post-list');
postList.innerHTML = '';

posts.forEach(post => {
//    console.log(post);
//     console.log(post._id);
    
    const postItem = document.createElement('div');
    postItem.classList.add('post-item');
    
    postItem.innerHTML = `
        <h3>${post._id}</h3>
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <p><strong>Date:</strong> ${new Date(post.date).toLocaleDateString()}</p>
        <button onclick="deletePost('${post._id}')">Delete Post</button> 
        <hr>
    `;
    postList.appendChild(postItem);
});
}

// Function to delete a post by ID
async function deletePost(postId) {
console.log(postId)
if (confirm('Are you sure you want to delete this post?')) {
    
    try {
        const response = await axios.delete(`http://localhost:3001/posts/${postId}`);
        alert('Post deleted successfully!');
        fetchPosts();  
    } catch (error) {
        console.error('Error deleting post: ', error);
        alert('Failed to delete the post.');
    }
}         
}
fetchPosts();ß