const BLOG_ID = '4076261641329175581'; 
const API_KEY = 'AIzaSyBni-gdqwZMhLF3hgBKeiZ22tP0ITkr_W8'; 
const postsContainer = document.getElementById('posts-container');
const blogLink = document.getElementById('blog-link');
const loading = document.getElementById('loading');

async function fetchBlogPosts() {
    // Show loading state
    loading.classList.remove('hidden');
    postsContainer.innerHTML = '';
    
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Hide loading state
        loading.classList.add('hidden');
        postsContainer.innerHTML = '';
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'hover:shadow-xl', 'transition-shadow', 'duration-300');

                // Extract first image from post content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = post.content;
                const firstImage = tempDiv.querySelector('img');
                
                let imageUrl = 'https://via.placeholder.com/400x200.png?text=No+Image';
                if (firstImage) {
                    imageUrl = firstImage.src;
                }

                // Format the published date
                const publishedDate = new Date(post.published).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                postCard.innerHTML = `
                    <img src="${imageUrl}" alt="${post.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">${post.title}</h3>
                        <p class="text-gray-500 text-sm mb-4">Published on ${publishedDate}</p>
                        <div class="prose prose-sm max-w-none text-gray-600 line-clamp-3">
                            ${post.content.substring(0, 200)}...
                        </div>
                        <a href="${post.url}" target="_blank" class="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium">
                            Read More →
                        </a>
                    </div>
                `;
                
                postsContainer.appendChild(postCard);
            });
        } else {
            postsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No blog posts found.</p>';
        }

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        loading.classList.add('hidden');
        postsContainer.innerHTML = '<p class="text-center text-red-500 col-span-full">Failed to load blog posts. Please try again later.</p>';
    }
}

blogLink.addEventListener('click', (event) => {
    event.preventDefault();
    fetchBlogPosts();
});

// Add some CSS for line clamping (since Tailwind's line-clamp might not be available)
const style = document.createElement('style');
style.textContent = `
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);