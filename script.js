console.log("Lets start Javascript");

// ---------- Playlists ----------

const playlists = {
    "Arijit Singh": [
        "./songs/Arijit%20Singh/Agar%20Tum%20Saath%20Ho%20Tamasha%20320%20Kbps.mp3",
        "./songs/Arijit%20Singh/Apna%20Bana%20Le%20Bhediya%20128%20Kbps.mp3",
        "./songs/Arijit%20Singh/Darkhaast%20Shivaay%20320%20Kbps.mp3",
        "./songs/Arijit%20Singh/Gehra%20Hua%20Dhurandhar%20320%20Kbps.mp3",
        "./songs/Arijit%20Singh/Phir%20Bhi%20Tumko%20Chaahunga%20Half%20Girlfriend%20128%20Kbps.mp3",
        "./songs/Arijit%20Singh/Samjhawan%20Humpty%20Sharma%20Ki%20Dulhania%20320%20Kbps.mp3"
    ],

    "KK": [
        "./songs/KK/Aashiqui_2_-_Piya_Aaye_Na_(mp3.pm).mp3",
        "./songs/KK/K.K._-_Ajab_Si_(mp3.pm).mp3",
        "./songs/KK/K.K._-_Dil_Ibaadat_(mp3.pm).mp3",
        "./songs/KK/K.K._-_Kya_Mujhe_Pyar_Hai._(mp3.pm).mp3",
        "./songs/KK/K.K._-_Labon_Ko._(mp3.pm).mp3",
        "./songs/KK/K.K._-_Pal._(mp3.pm).mp3",
        "./songs/KK/K.K._-_Tu_Hi_Meri_Shab_Hai_Part_1_(mp3.pm).mp3",
        "./songs/KK/K.K_Krishnakumar_Kunnath_Shilpa_Rao_-_Khuda_Jaane_(mp3.pm).mp3",
        "./songs/KK/Pritam_KK_-_Haan_Tu_Hain_(mp3.pm).mp3",
        "./songs/KK/Pritam_KK_-_Zara_Sa_(mp3.pm).mp3",
        "./songs/KK/k.k._-_zindagi_ne_zindagi_bhar_ghum_diye_(mp3.pm)%20(2).mp3"
    ],

    "Pritam": [
        "./songs/Pritam/Bandhu%202%20Cocktail%202%20128%20Kbps.mp3",
        "./songs/Pritam/Judai%20Jannat%20320%20Kbps.mp3",
        "./songs/Pritam/Mashooqa%20Cocktail%202%20128%20Kbps.mp3",
        "./songs/Pritam/Once_Upon_A_Time_In_Mumbaai_Dobaara_-_Ye_Tune_Kya_Kiya_Javed_Bashir_(mp3.pm).mp3",
        "./songs/Pritam/Tera%20Mera%20Rishta%20Awarapan%202%20128%20Kbps.mp3",
        "./songs/Pritam/Tujhko%20Cocktail%202%20128%20Kbps.mp3"
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

    if (index !== -1) {
        currentIndex = index;
    }

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
            playlist[currentIndex],
            currentIndex
        );
    }
});


// ---------- Next ----------

nextBtn.addEventListener("click", () => {

    if (currentIndex < playlist.length - 1) {

        currentIndex++;

        loadSong(
            playlist[currentIndex],
            currentIndex
        );
    }
});