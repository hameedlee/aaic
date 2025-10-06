const BLOG_ID = '4076261641329175581'; 
const API_KEY = 'AIzaSyBni-gdqwZMhLF3hgBKeiZ22tP0ITkr_W8'; 
const postsContainer = document.getElementById('posts-container');
const blogLink = document.getElementById('blog-link');

async function fetchBlogPosts() {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        postsContainer.innerHTML = '';
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'hover:shadow-xl', 'transition-shadow');

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = post.content;
                const firstImage = tempDiv.querySelector('img');
                
                let imageUrl = 'https://via.placeholder.com/400x200.png?text=No+Image';
                if (firstImage) {
                    imageUrl = firstImage.src;
                }

                postCard.innerHTML = `
                    <img src="${imageUrl}" alt="${post.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
                        <p class="text-gray-500 text-sm">${new Date(post.published).toLocaleDateString()}</p>
                    </div>
                `;
                
                postsContainer.appendChild(postCard);
            });
        } else {
            postsContainer.innerHTML = '<p class="text-center text-gray-500">No blog posts found.</p>';
        }

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        postsContainer.innerHTML = '<p class="text-center text-red-500">Failed to load blog posts. Please try again later.</p>';
    }
}

blogLink.addEventListener('click', (event) => {
    event.preventDefault();
    fetchBlogPosts();
});
