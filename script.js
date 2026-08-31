console.log("Lets start Javascript");

// ---------- Playlists ----------

const playlists = {
    "Arijit Singh": [
        "./songs/Arijit Singh/Agar Tum Saath Ho Tamasha.mp3",
        "./songs/Arijit Singh/Apna Bana Le Bhediya.mp3",
        "./songs/Arijit Singh/Darkhaast Shivaay.mp3",
        "./songs/Arijit Singh/Gehra Hua Dhurandhar.mp3",
        "./songs/Arijit Singh/Phir Bhi Tumko Chaahunga Half Girlfriend.mp3",
        "./songs/Arijit Singh/Samjhawan Humpty Sharma Ki Dulhania.mp3"
    ],

    "KK": [
        "./songs/KK/Ajab Si.mp3",
        "./songs/KK/Dil Ibaadat.mp3",
        "./songs/KK/Haan Tu Hain.mp3",
        "./songs/KK/Khuda Jaane.mp3",
        "./songs/KK/Kya Mujhe Pyar Hai.mp3",
        "./songs/KK/Labon Ko.mp3",
        "./songs/KK/Pal.mp3",
        "./songs/KK/Piya Aaye Na.mp3",
        "./songs/KK/Tu Hi Meri Shab Hai.mp3",
        "./songs/KK/Zara Sa.mp3",
        "./songs/KK/zindagi ne zindagi bhar ghum diye.mp3"
    ],

    "Pritam": [
        "./songs/Pritam/Bandhu 2.mp3",
        "./songs/Pritam/Judai Jannat.mp3",
        "./songs/Pritam/Mashooqa.mp3",
        "./songs/Pritam/Tera Mera Rishta.mp3",
        "./songs/Pritam/Tujhko.mp3",
        "./songs/Pritam/Ye Tune Kya Kiya.mp3"
    ],


    "The Weeknd": [
        "./songs/The Weeknd/Blinding Lights.mp3",
        "./songs/The Weeknd/One Of The Girls.mp3",
        "./songs/The Weeknd/Starboy.mp3",
        "./songs/The Weeknd/Die For You.mp3",
        "./songs/The Weeknd/The-Abyss.mp3",
        "./songs/The Weeknd/Timeless.mp3"
    ],

    "Lana Del Rey": [
        "./songs/Lana Del Rey/Art Deco.mp3",
        "./songs/Lana Del Rey/Blue Jeans.mp3",
        "./songs/Lana Del Rey/Body Electric.mp3",
        "./songs/Lana Del Rey/Born To Die.mp3",
        "./songs/Lana Del Rey/Burning Desire.mp3",
        "./songs/Lana Del Rey/Carmen.mp3",
        "./songs/Lana Del Rey/Cherry.mp3",
        "./songs/Lana Del Rey/Cinnamon Girl.mp3",
        "./songs/Lana Del Rey/Diet Mountain Dew.mp3",
        "./songs/Lana Del Rey/Fucked My Way Up To The Top.mp3",
        "./songs/Lana Del Rey/Lust For Life.mp3",
        "./songs/Lana Del Rey/Million Dollar Man.mp3",
        "./songs/Lana Del Rey/Salvatore.mp3",
        "./songs/Lana Del Rey/Say Yes To Heaven.mp3",
        "./songs/Lana Del Rey/Shades Of Cool.mp3",
        "./songs/Lana Del Rey/Summertime Sadness.mp3",
        "./songs/Lana Del Rey/West Coast.mp3",
        "./songs/Lana Del Rey/White Mustang.mp3"
    ],

    "Billie Eilish": [
    "./songs/Billie Eilish/Bad Guy.mp3",
    "./songs/Billie Eilish/Birds Of A Feather.mp3",
    "./songs/Billie Eilish/Blue.mp3",
    "./songs/Billie Eilish/Getting Older.mp3",
    "./songs/Billie Eilish/I Didn't Change My Number.mp3",
    "./songs/Billie Eilish/I Don't Wanna Be You Anymore.mp3",
    "./songs/Billie Eilish/Lovely.mp3",
    "./songs/Billie Eilish/Ocean Eyes.mp3",
    "./songs/Billie Eilish/The 30th.mp3",
    "./songs/Billie Eilish/What Was I Made For.mp3",
    "./songs/Billie Eilish/Wildflower.mp3"
]
};

let playlist = [];
let currentIndex = -1;


// ---------- Player elements ----------

const audio = document.getElementById('audio');
const fill = document.getElementById('fill');
const dot = document.getElementById('dot');
const bar = document.getElementById('bar');
const current = document.getElementById('current');
const duration = document.getElementById('duration');

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


// ---------- Format time ----------

function fmt(t) {
    if (!isFinite(t)) return "0:00";

    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
        .toString()
        .padStart(2, '0');

    return `${m}:${s}`;
}


// ---------- Load song ----------

function loadSong(songUrl, index = -1) {

    audio.src = songUrl;
    audio.play();

    playBtn.src = "./playbar/pause.svg";

    const fileName = decodeURIComponent(
        songUrl.split('/').pop().replace('.mp3', '')
    );

    document.getElementById('songName').textContent = fileName;
}


// ---------- Audio events ----------

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {

    if (!audio.duration) return;

    const pct = (audio.currentTime / audio.duration) * 100;

    fill.style.width = pct + '%';
    dot.style.left = pct + '%';

    current.textContent = fmt(audio.currentTime);
});


// ---------- Seek bar ----------

function seekFromClientX(clientX) {

    const rect = bar.getBoundingClientRect();

    const pct = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1
    );

    audio.currentTime = pct * audio.duration;
}


// Mouse
bar.addEventListener('click', (e) => {
    seekFromClientX(e.clientX);
});


// Touch
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
    overlay.classList.toggle('show');
    hamburger.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);


// Close menu when resized to desktop
window.addEventListener('resize', () => {

    if (window.innerWidth > 1400) {
        closeMenu();
    }
});


// ---------- Search ----------

const searchBtn = document.querySelector(".searchCls");
const searchBar = document.querySelector(".search");

function toggleSearch() {

    searchBar.classList.toggle('show');
    closeMenu();
}

searchBtn.addEventListener('click', toggleSearch);


// ---------- Playlists ----------

const cardContainer = document.getElementById('cardContainer');
const songsView = document.getElementById('songsView');
const songsViewTitle = document.getElementById('songsViewTitle');
const songList = document.getElementById('songList');
const backBtn = document.getElementById('backBtn');


function openPlaylist(playlistFolder) {

    playlist = playlists[playlistFolder] || [];
    currentIndex = -1;

    songsViewTitle.textContent = playlistFolder;

    songList.innerHTML = "";

    playlist.forEach((songUrl, index) => {

        const li = document.createElement('li');

        const fileName = decodeURIComponent(
            songUrl.split('/').pop().replace('.mp3', '')
        );

        li.textContent = fileName;

        li.addEventListener('click', () => {

            currentIndex = index;

            loadSong(songUrl, index);
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


// Playlist card click
document.querySelectorAll('.card').forEach(card => {

    card.addEventListener('click', () => {

        const key = card.dataset.playlist;

        openPlaylist(key);
    });
});


backBtn.addEventListener('click', closePlaylist);


// ---------- Volume ----------

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

    if (audio.muted || audio.volume == 0) {

        volBtn.textContent = '🔇';

    } else if (audio.volume < 0.5) {

        volBtn.textContent = '🔉';

    } else {

        volBtn.textContent = '🔊';
    }
}


// ---------- Play / Pause ----------

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        playBtn.src = "./playbar/pause.svg";

    } else {

        audio.pause();

        playBtn.src = "./playbar/play.svg";
    }
});


// ---------- Previous ----------

prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {

        currentIndex--;

        loadSong(
            playlist[currentIndex]
        );
    }
});


// ---------- Next ----------

nextBtn.addEventListener("click", () => {

    if (currentIndex < playlist.length - 1) {

        currentIndex++;

        loadSong(
            playlist[currentIndex]

        );
    }
});