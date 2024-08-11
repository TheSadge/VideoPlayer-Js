// Select the main player container
const playerArea = document.querySelector(".myplayer");

// Select the video element within the player
const media = playerArea.querySelector("video");

// Select the controls container within the player
const controls = playerArea.querySelector(".myplayer__controls");

// Select the play icon element outside of the controls
let playIcon = document.querySelector(".playIcon");

// Select buttons within the controls
const play = controls.querySelector(".play");
const rewind = controls.querySelector(".rewind");
const forward = controls.querySelector(".forward");
const fullScreen = controls.querySelector(".fullscreen");

// Select elements to display current time and total video duration
const currentTime = document.querySelector(".currentTime");
const videoTime = document.querySelector(".videoTime");

// Select the progress bar element
let progressBar = document.querySelector(".controls__progressbar-current");

// Play/Pause video when play button is clicked
play.addEventListener("click", function () {
  renderVideo();
});

// Rewind the video by 5 seconds when the rewind button is clicked
rewind.addEventListener("click", function () {
  media.currentTime = Math.max(media.currentTime - 5, 0);
});

// Fast forward the video by 5 seconds when the forward button is clicked
forward.addEventListener("click", function () {
  media.currentTime = Math.min(media.currentTime + 5, media.duration);
});

// Toggle play/pause icons and hide/show the central play icon
function togglePlayerIcon() {
  let icon = play.querySelector("i");
  icon.classList.toggle("bi-pause-fill");
  icon.classList.toggle("bi-play-fill");
  playIcon.classList.toggle("hider");
}

// Play or pause the video and update the time display
function renderVideo() {
  videoTime.textContent = getTime(media.duration);

  if (media.paused) {
    togglePlayerIcon();
    media.play();
  } else {
    togglePlayerIcon();
    media.pause();
  }
}

// Toggle play/pause when the video itself is clicked
media.addEventListener("click", function () {
  renderVideo();
});

// Update the current time display and progress bar at regular intervals
setInterval(function () {
  currentTime.innerHTML = getTime(media.currentTime);
  let barLength = (media.currentTime / media.duration) * 100;
  console.log(barLength);

  progressBar.style = `background: linear-gradient(90deg, rgba(230, 126, 34, 1) ${barLength}%, #e1e1e1 0%);`;
}, 100);

// Reset play button icon to replay icon when the video ends
media.addEventListener("ended", function () {
  let icon = play.querySelector("i");
  icon.classList.remove("bi-pause-fill");
  icon.classList.add("bi-arrow-clockwise");
});

// Handle replay functionality when the replay icon is clicked
let icon = play.querySelector("i");
icon.addEventListener("click", function () {
  if (icon.classList.contains("bi-arrow-clockwise")) {
    icon.classList.remove("bi-arrow-clockwise");
    icon.classList.add("bi-pause-fill");
    media.currentTime = 0;
    media.play();
  }
});

// Convert time in seconds to a mm:ss format
function getTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  let minutesValue = minutes < 10 ? "0" + minutes : minutes;
  let secondsValue = seconds < 10 ? "0" + seconds : seconds;

  return minutesValue + ":" + secondsValue;
}

// Seek video to a specific time when the progress bar is adjusted
progressBar.addEventListener("input", function () {
  media.currentTime = (this.value / 100) * media.duration;
});

// Show or hide volume control when the volume icon is clicked
let volumeIcon = controls.querySelector(".volume .icon");
let volumeProgressbar = controls.querySelector(".volume .volume__progress");
volumeIcon.addEventListener("click", function () {
  volumeProgressbar.classList.toggle("displayer");
});

// Adjust the volume when the volume progress bar is adjusted
let volumeProgressbarInput = volumeProgressbar.querySelector("input");
volumeProgressbarInput.addEventListener("input", function () {
  media.volume = this.value / 100;
  let alert = document.querySelector(".alert");
  console.log(this.value);

  // Show alert if the volume is set to maximum, otherwise hide it
  if (this.value === "1") {
    alert.style.display = "block";
  } else {
    alert.style.display = "none";
  }

  // Update the volume progress bar's appearance
  this.style = `background: linear-gradient(90deg, rgba(230, 126, 34, 1) ${this.value}%, #e1e1e1 50%)`;
});

// Toggle fullscreen mode when the fullscreen button is clicked
fullScreen.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    playerArea.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});