// API for random cat images
const CAT_API = 'https://api.thecatapi.com/v1/images/search?limit=5';
const DAILY_KEY = 'dailyCatMeme';

// Random caption generator for memes
const captions = [
    "Meow-zart in the house!",
    "Paws and reflect!",
    "Whisker me away!",
    "Cat-astrophe avoided!",
    "Feline fabulous!"
];

// Generate random memes for CAT MEMES page
function generateMemes() {
    fetch(CAT_API)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('meme-container');
            container.innerHTML = ''; // Clear previous memes
            data.forEach(cat => {
                const memeDiv = document.createElement('div');
                const img = document.createElement('img');
                img.src = cat.url;
                img.className = 'meme';
                img.alt = 'Random cat meme';
                const caption = document.createElement('p');
                caption.textContent = captions[Math.floor(Math.random() * captions.length)];
                memeDiv.appendChild(img);
                memeDiv.appendChild(caption);
                container.appendChild(memeDiv);
            });
        })
        .catch(error => console.error('Error fetching cat images:', error));
}

// Generate daily meme for CAT OF THE DAY page
function generateDailyMeme() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(DAILY_KEY + '_date');
    let memeUrl = localStorage.getItem(DAILY_KEY);

    // If no meme or new day, fetch a new one
    if (!memeUrl || storedDate !== today) {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                memeUrl = data[0].url;
                localStorage.setItem(DAILY_KEY, memeUrl);
                localStorage.setItem(DAILY_KEY + '_date', today);
                displayDailyMeme(memeUrl);
            })
            .catch(error => console.error('Error fetching daily cat:', error));
    } else {
        displayDailyMeme(memeUrl);
    }
}

function displayDailyMeme(url) {
    const container = document.getElementById('daily-meme');
    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    img.className = 'meme';
    img.alt = 'Cat of the day';
    const caption = document.createElement('p');
    caption.textContent = 'Another day survived!';
    container.appendChild(img);
    container.appendChild(caption);
}

// Run appropriate function based on page
if (document.getElementById('meme-container')) {
    // CAT MEMES page
    generateMemes();
} else if (document.getElementById('daily-meme')) {
    // CAT OF THE DAY page
    generateDailyMeme();
}