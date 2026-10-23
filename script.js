const songData = [
  { title: "To All Of You - Syd Matters", art: "https://i1.sndcdn.com/artworks-GQPvfcFrBBiC-0-t500x500.jpg", src: "https://files.catbox.moe/nbtcpx.mp3" },
  { title: "Something Good - Alt J", art: "https://cdn-images.dzcdn.net/images/cover/4f3a75e0df034f5ecfe83d853cd01616/500x500.jpg", src: "https://files.catbox.moe/huho2o.mp3" },
  { title: "Crosses - Jose Gonzales", art: "https://f4.bcbits.com/img/a2023464003_10.jpg", src: "https://files.catbox.moe/cuzejq.mp3" },
  { title: "In My Mind - Amanda Palmer", art: "https://f4.bcbits.com/img/a2910273606_16.jpg", src: "https://files.catbox.moe/vt3oqn.mp3" },
  { title: "Spanish Sahara - Foals", art: "https://static.wikia.nocookie.net/life-is-strange/images/e/e1/Foals_Total_Life_Forever_Cover.jpg/revision/latest?cb=20160210050729", src: "https://files.catbox.moe/boei64.mp3" }
];
let index = 0;
const audio = document.querySelector("audio");
let lastClick = 0;

function updateSong() {
  audio.src = songData[index].src;
  document.getElementById("song-title").textContent = songData[index].title;
  document.getElementById("song-art").src = songData[index].art;
  audio.play();
}

audio.addEventListener("ended", () => {
  index = (index + 1) % songData.length;
  updateSong();
});

document.getElementById("rewnd-btn").addEventListener("click", () => {
  const now = Date.now();
  if (now - lastClick < 400) {
    index = (index - 1 + songData.length) % songData.length;
    updateSong();
  } else {
    audio.currentTime = 0;
  }
  lastClick = now;
});

document.getElementById("play-btn").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

document.getElementById("skip-btn").addEventListener("click", () => {
  index = (index + 1) % songData.length;
  updateSong();
});

audio.addEventListener("timeupdate", () => {
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  const durMinutes = Math.floor(audio.duration / 60) || 0;
  const durSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0') || '00';
  document.getElementById("time-display").textContent = `${currentMinutes}:${currentSeconds} / ${durMinutes}:${durSeconds}`;
});

const progressBar = document.getElementById("progress-bar");

audio.addEventListener("timeupdate", () => {
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  const durMinutes = Math.floor(audio.duration / 60) || 0;
  const durSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0') || '00';
  
  document.getElementById("current-time").textContent = `${currentMinutes}:${currentSeconds}`;
  document.getElementById("total-duration").textContent = `${durMinutes}:${durSeconds}`;
  
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

updateSong();
