console.log("Lets start Javascript");

let playlist = [];

async function getSongs(playlistFolder) {
    let a = await fetch(`http://127.0.0.1:5500/songs/${playlistFolder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    return songs;
}

// Loads a song by URL, updates playBtn icon
function loadSong(songUrl) {
    audio.src = songUrl;
    audio.play();
    playBtn.src = "playbar/pause.svg";

    const fileName = decodeURIComponent(songUrl.split('/').pop().replace('.mp3', ''));
    document.getElementById('songName').textContent = fileName;
}


// ---------- Player ----------
const audio = document.getElementById('audio');
const fill = document.getElementById('fill');
const dot = document.getElementById('dot');
const bar = document.getElementById('bar');
const current = document.getElementById('current');
const duration = document.getElementById('duration');

function fmt(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    fill.style.width = pct + '%';
    dot.style.left = pct + '%';
    current.textContent = fmt(audio.currentTime);
});

function seekFromClientX(clientX) {
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = pct * audio.duration;
}

// mouse
bar.addEventListener('click', (e) => {
    seekFromClientX(e.clientX);
});

// touch (mobile)
bar.addEventListener('touchstart', (e) => {
    seekFromClientX(e.touches[0].clientX);
});


// ---------- Responsive hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const leftPanel = document.getElementById('left');
const overlay = document.getElementById('overlay');



function closeMenu() {
    leftPanel.classList.remove('show');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
}

function toggleMenu() {
    leftPanel.classList.toggle('show');
    overlay.classList.toggle('show');;
    hamburger.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// close menu automatically if window is resized back to desktop width
window.addEventListener('resize', () => {
    if (window.innerWidth > 1400) {
        closeMenu();
    }
});

audio.play(); // remove/trigger via button in real use


const searchBtn = document.querySelector(".searchCls");
const searchBar = document.querySelector(".search");


function toggleSearch() {
    searchBar.classList.toggle('show');
    closeMenu();
}
searchBtn.addEventListener('click', toggleSearch);

// playlists 

// ---------- Playlist -> Songs view ----------
const cardContainer = document.getElementById('cardContainer');
const songsView = document.getElementById('songsView');
const songsViewTitle = document.getElementById('songsViewTitle');
const songList = document.getElementById('songList');
const backBtn = document.getElementById('backBtn');


async function openPlaylist(playlistFolder) {
    const songs = await getSongs(playlistFolder);
    playlist = songs;// <-- ADD THIS LINE — keeps global playlist in sync
    songsViewTitle.textContent = playlistFolder;

    songList.innerHTML = ""; // clear old songs
    songs.forEach(songUrl => {
        const li = document.createElement('li');
        const fileName = decodeURIComponent(songUrl.split('/').pop().replace('.mp3', ''))
        li.textContent = fileName;

        li.addEventListener('click', () => {
            loadSong(songUrl); // reuse loadSong instead of repeating code
        });

        songList.appendChild(li);
    });

    cardContainer.classList.add('hidden');
    songsView.classList.remove('hidden');
}

function closePlaylist() {
    songsView.classList.add('hidden');
    cardContainer.classList.remove('hidden');
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.dataset.playlist;
        openPlaylist(key);
    });
});

backBtn.addEventListener('click', closePlaylist);



const volBtn = document.getElementById('volBtn');
const volSlider = document.getElementById('volSlider');

volSlider.addEventListener('input', () => {
    audio.volume = volSlider.value;
    audio.muted = false;
    updateVolIcon();
});

volBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateVolIcon();
});

function updateVolIcon() {
    if (audio.muted || audio.volume == 0) volBtn.textContent = '🔇';
    else if (audio.volume < 0.5) volBtn.textContent = '🔉';
    else volBtn.textContent = '🔊';
}



// Attach an event listener to play, next and previous
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play()
        playBtn.src = "playbar/pause.svg"
    }
    else {
        audio.pause()
        playBtn.src = "playbar/play.svg"
    }
})



// Add an event listener to previous
prevBtn.addEventListener("click", () => {
    audio.pause()
    let index = playlist.indexOf(audio.src)
    if ((index - 1) >= 0) {
        loadSong(playlist[index - 1])
    }
})



// Add an event listener to next
nextBtn.addEventListener("click", () => {
    audio.pause()
    let index = playlist.indexOf(audio.src)
    if ((index + 1) < playlist.length) {
        loadSong(playlist[index + 1])
    }
}) 