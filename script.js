// API for random cat images
const CAT_API = 'https://api.thecatapi.com/v1/images/search?limit=10';
const DAILY_KEY = 'dailyCatMeme';

// Random caption generator for memes
const captions = [
    "Meow-zart in the house!",
    "Paws and reflect!",
    "Whisker me away!",
    "Cat-astrophe avoided!",
    "Feline fabulous!",
    "Purr-fect moment!",
    "Clawsome vibes!",
    "Meowtastic day!",
    "Kitty power!",
    "Nap time champ!"
];

// Generate 50 random memes for CAT MEMES page
async function generateMemes() {
    const container = document.getElementById('meme-container');
    container.innerHTML = '';
    try {
        for (let i = 0; i < 5; i++) {
            const response = await fetch(CAT_API);
            const data = await response.json();
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
        }
    } catch (error) {
        console.error('Error fetching cat images:', error);
        container.innerHTML = '<p>Sorry, too many kitties! Try again later. 😿</p>';
    }
}

// Generate daily meme for CAT OF THE DAY page
function generateDailyMeme() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(DAILY_KEY + '_date');
    let memeUrl = localStorage.getItem(DAILY_KEY);

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
    const caption = document.createElement('p');
    caption.textContent = 'Congrats! Another day survived!';
    const img = document.createElement('img');
    img.src = url;
    img.className = 'meme';
    img.alt = 'Cat of the day';
    container.appendChild(caption);
    container.appendChild(img);
}

// Run appropriate function based on page
if (document.getElementById('meme-container')) {
    generateMemes();
} else if (document.getElementById('daily-meme')) {
    generateDailyMeme();
}
