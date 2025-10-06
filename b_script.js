const BLOG_ID = '4076261641329175581'; 
const API_KEY = 'AIzaSyBni-gdqwZMhLF3hgBKeiZ22tP0ITkr_W8'; 
const postsContainer = document.getElementById('posts-container');
const blogLink = document.getElementById('blog-link');
const loading = document.getElementById('loading');
const postDetail = document.getElementById('post-detail');
const postDetailContent = document.getElementById('post-detail-content');
const backToPostsBtn = document.getElementById('back-to-posts');

let allPosts = []; // Store all fetched posts

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
            allPosts = data.items; // Store posts for later use
            
            data.items.forEach((post, index) => {
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
                        <button class="read-more-btn inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium cursor-pointer" data-post-index="${index}">
                            Read More →
                        </button>
                    </div>
                `;
                
                postsContainer.appendChild(postCard);
            });

            // Add event listeners to "Read More" buttons
            document.querySelectorAll('.read-more-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const postIndex = parseInt(e.target.getAttribute('data-post-index'));
                    showPostDetail(allPosts[postIndex]);
                });
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

function showPostDetail(post) {
    // Format the published date
    const publishedDate = new Date(post.published).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Extract first image from post content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const firstImage = tempDiv.querySelector('img');
    
    let imageHtml = '';
    if (firstImage) {
        imageHtml = `<img src="${firstImage.src}" alt="${post.title}" class="w-full max-w-2xl mx-auto rounded-lg shadow-md mb-6">`;
    }

    postDetailContent.innerHTML = `
        <article class="prose prose-lg max-w-none">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">${post.title}</h1>
            <div class="flex items-center text-gray-500 text-sm mb-6">
                <span>Published on ${publishedDate}</span>
                <span class="mx-2">•</span>
                <a href="${post.url}" target="_blank" class="text-blue-600 hover:text-blue-800">View Original</a>
            </div>
            ${imageHtml}
            <div class="text-gray-700 leading-relaxed">
                ${post.content}
            </div>
        </article>
    `;

    // Hide posts container and show post detail
    postsContainer.style.display = 'none';
    postDetail.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPostsList() {
    // Hide post detail and show posts container
    postDetail.classList.add('hidden');
    postsContainer.style.display = 'grid';
}

blogLink.addEventListener('click', (event) => {
    event.preventDefault();
    fetchBlogPosts();
});

backToPostsBtn.addEventListener('click', () => {
    showPostsList();
});

// Add some CSS for line clamping and prose styling
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
    .prose img {
        max-width: 100%;
        height: auto;
        margin: 1rem auto;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .prose p {
        margin-bottom: 1rem;
        line-height: 1.7;
    }
    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    .prose ul, .prose ol {
        margin: 1rem 0;
        padding-left: 2rem;
    }
    .prose li {
        margin-bottom: 0.5rem;
    }
    .prose blockquote {
        border-left: 4px solid #e5e7eb;
        padding-left: 1rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: #6b7280;
    }
    .prose a {
        color: #2563eb;
        text-decoration: underline;
    }
    .prose a:hover {
        color: #1d4ed8;
    }
`;
document.head.appendChild(style);