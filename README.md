# Blog Post Fetcher

A simple web application that fetches and displays blog posts from the Blogger API using JavaScript and Tailwind CSS.

## Features

- **Responsive Design**: Clean, modern interface that works on all devices
- **Dynamic Content Loading**: Fetches blog posts from Blogger API on demand
- **Inline Blog Reading**: Full blog posts display on the same page (no external navigation)
- **Image Extraction**: Automatically extracts and displays the first image from each blog post
- **Content Preview**: Shows a truncated preview of each post with "Read More" buttons
- **Navigation**: Easy back-and-forth navigation between post list and full post view
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Visual feedback during API requests

## Files

- `index.html` - Main HTML structure with Tailwind CSS styling
- `script.js` - JavaScript code for API integration and DOM manipulation
- `README.md` - Project documentation

## Configuration

The application is configured to use:
- **Blog ID**: `4076261641329175581`
- **API Key**: `AIzaSyBni-gdqwZMhLF3hgBKeiZ22tP0ITkr_W8`

## How to Use

1. Open `index.html` in a web browser (or serve via HTTP server)
2. Click the "Fetch Blog Posts" button
3. View the dynamically loaded blog posts in a responsive grid
4. Click "Read More →" on any post to view the full article inline
5. Use the "← Back to Posts" button to return to the post list
6. Navigate seamlessly between posts without leaving the page

## API Integration

The application uses the Google Blogger API v3 to fetch blog posts:
```
https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts?key={API_KEY}
```

## Styling

- Uses Tailwind CSS for responsive design and modern styling
- Custom CSS for text truncation (line-clamp)
- Hover effects and smooth transitions
- Clean card-based layout

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript (async/await, fetch API)
- CSS Grid and Flexbox
- Modern DOM APIs

## Error Handling

The application handles various error scenarios:
- Network connectivity issues
- API rate limiting
- Invalid responses
- Empty blog data

## New Features Added

### Inline Blog Post Viewing
- **Same-Page Reading**: Full blog posts now display on the same webpage instead of opening external links
- **Seamless Navigation**: Easy switching between post list and individual post views
- **Back Button**: Convenient "← Back to Posts" button for returning to the main list
- **Enhanced Styling**: Professional typography and formatting for full post content
- **Smooth Transitions**: Animated transitions between views for better user experience

### Technical Improvements
- **Button-Based Navigation**: "Read More" links converted to interactive buttons
- **State Management**: Proper handling of view states (list vs. detail)
- **Enhanced CSS**: Additional styling for prose content, images, and typography
- **Responsive Design**: Full posts maintain responsive design on all devices

## Future Enhancements

Potential improvements could include:
- Pagination for large numbers of posts
- Search and filtering capabilities
- Category-based filtering
- Social sharing buttons
- Comments integration
- Bookmarking favorite posts
- Print-friendly formatting