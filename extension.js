const accessKey = 'YS2eSrDaO1JGT1mHHgGC2BIsFg4klrZYbVVtgA3uya0eXr4yk2EJk2NS'; // Replace with your Pexels API key
const queries = ['nature', 'city', 'abstract', 'space', 'animals']; // Add more keywords

async function getRandomWallpaper() {
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const response = await fetch(`https://api.pexels.com/v1/search?query=${randomQuery}&per_page=1`, {
        headers: {
            Authorization: accessKey
        }
    });

    if (!response.ok) {
        console.error('Error fetching wallpaper:', response.statusText);
        return; // Return nothing if there's an error
    }

    const data = await response.json();
    const wallpaperUrl = data.photos[0]?.src.original; // Use optional chaining
    console.log("Fetched wallpaper URL:", wallpaperUrl);
    return wallpaperUrl;
}

document.addEventListener('DOMContentLoaded', async () => {
    const wallpaperElement = document.getElementById('wallpaper');
    const loadingSpinner = document.getElementById('loading');
    const searchContainer = document.getElementById('search-container');

    // Show the loading spinner
    loadingSpinner.style.display = 'block';

    const wallpaperUrl = await getRandomWallpaper();
    if (wallpaperUrl) {
        wallpaperElement.src = `${wallpaperUrl}?t=${new Date().getTime()}`; // Prevent caching

        // Show the wallpaper and hide the loading spinner
        wallpaperElement.onload = () => {
            loadingSpinner.style.display = 'none';
            wallpaperElement.style.display = 'block'; // Show wallpaper
            searchContainer.style.display = 'block'; // Show search bar
        };
    } else {
        loadingSpinner.textContent = "Failed to load wallpaper"; // Optional error message
    }
});
