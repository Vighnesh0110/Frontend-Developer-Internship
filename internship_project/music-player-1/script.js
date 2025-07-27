const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const duration = document.getElementById('duration');

const playlist = [
  {
    title: 'Song One',
    artist: 'Artist One',
    src: 'songs/song1.mp3',
    duration: '3:45'
  },
  {
    title: 'Song Two',
    artist: 'Artist Two',
    src: 'songs/song2.mp3',
    duration: '4:20'
  },
  {
    title: 'Song Three',
    artist: 'Artist Three',
    src: 'songs/song3.mp3',
    duration: '5:10'
  }
];

let currentIndex = 0;

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
  progress.value = 0;
}

function playSong() {
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline';
}

function pauseSong() {
  audio.pause();
  playBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
}

function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  playSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
}

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value / 100;
});

audio.addEventListener('ended', () => {
  nextSong();
});

playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Initialize
loadSong(currentIndex);
audio.volume = 1.0;