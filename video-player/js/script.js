const mainScreen = document.querySelector("#main-screen"),
  playerScreen = document.querySelector("#player-screen"),
  toggleViewBtn = mainScreen.querySelector("#toggle-view"),
  videosContainer = mainScreen.querySelector(".video-container"),
  videoEllis = videosContainer.querySelectorAll(".video-container li"),
  currentVideoTittle = playerScreen.querySelector("#current-video-tittle"),
  currentVideoEl = playerScreen.querySelector("video"),
  currentTimeEl = playerScreen.querySelector(".current-time"),
  totalDurationEl = playerScreen.querySelector(".total-duration"),
  playPauseBtn = playerScreen.querySelector("#play-pause-btn"),
  progressBarContainer = playerScreen.querySelector(".progress"),
  progressBar = playerScreen.querySelector(".progress-filled"),
  nextVideoBtn = playerScreen.querySelector("#next-btn"),
  prevVideoBtn = playerScreen.querySelector("#prev-btn"),
  allVideos = mainScreen.querySelectorAll("video"),
  backBtn = playerScreen.querySelector("#back-btn"),
  volumeBar = playerScreen.querySelector("#volume-range"),
  volumeBtn = playerScreen.querySelector("#volume-change-btn"),
  fullScreenToggleBtn = playerScreen.querySelector("#fullscreen-toggle-btn"),
  pictureInPictureBtn = playerScreen.querySelector("#picture-in-picture-btn"),
  darkModebtn = mainScreen.querySelector("#dark-mode-toggle");

let video = {
  title: "",
  src: "",
  index: null,
};

let currentVideo;

allVideos.forEach((video, index) => {
  video.dataset.index = index;
});

//Utility Functions
function formateSrc(src) {
  let parts = src.split("/");
  let filenameWithExtension = parts[parts.length - 1];
  let filenameWithoutExtension = filenameWithExtension.split(".mp4")[0];
  let decodedFilename = decodeURIComponent(filenameWithoutExtension);
  return decodedFilename;
}

function formateTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  if (remainingSeconds < 10) {
    return `${minutes}:0${remainingSeconds}`;
  } else {
    return `${minutes}:${remainingSeconds}`;
  }
}

// Main Functions
function updateTimeUI(currentTime, totalDuration) {
  currentTimeEl.innerText = formateTime(currentTime);
  totalDurationEl.innerText = formateTime(totalDuration);
}

function togglePlay() {
  currentVideoEl.paused ? currentVideoEl.play() : currentVideoEl.pause();
}

function loadNewVideo(video) {
  const wasPlaying = !currentVideoEl.paused;

  currentVideoEl.src = video.src;
  currentVideoEl.dataset.index = video.dataset.index;
  currentVideo = video;
  currentVideoTittle.innerText = formateSrc(video.src);
  updateTimeUI(currentVideo.currentTime, currentVideo.duration);

  if (wasPlaying) {
    currentVideoEl.play();
  } else {
    currentVideoEl.pause();
  }
}

// Toggle Play/Pause function
function togglePlay() {
  currentVideoEl.paused ? currentVideoEl.play() : currentVideoEl.pause();
}

// Toggle Fullscreen function
function toggleFullscreen() {
  if (currentVideoEl.requestFullscreen) {
    currentVideoEl.requestFullscreen();
  } else if (currentVideoEl.webkitRequestFullscreen) {
    currentVideoEl.webkitRequestFullscreen();
  } else if (currentVideoEl.mozRequestFullScreen) {
    currentVideoEl.mozRequestFullScreen();
  } else if (currentVideoEl.msRequestFullscreen) {
    currentVideoEl.msRequestFullscreen();
  }
}

function toggleMute() {
  playerScreen.classList.toggle("muted");
  currentVideoEl.muted = !currentVideoEl.muted;
  if (playerScreen.classList.contains("muted")) {
    volumeBar.value = 0;
    currentVideoEl.volume = 0;
  } else {
    volumeBar.value = 70;
    currentVideoEl.volume = 0.7;
  }
}

// Toggle Picture-in-Picture function
async function togglePictureInPicture() {
  if (!document.pictureInPictureEnabled) {
    console.error("Picture-in-Picture is not supported.");
    alert("Picture-in-Picture is not supported directly in firefox.");
    return;
  }
  if (
    !currentVideoEl ||
    !currentVideoEl.src ||
    !currentVideoEl.readyState >= 2
  ) {
    console.error("Video not ready or invalid.");
    return;
  }
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await currentVideoEl.requestPictureInPicture();
    }
  } catch (error) {
    console.error("Error while entering/exiting Picture-in-Picture:", error);
  }
}

function handleShortcuts(key) {
  switch (key.toLowerCase()) {
    case " ":
    case "space":
      togglePlay();
      break;
    case "k":
      togglePlay();
      break;
    case "m":
      toggleMute();
      break;
    case "f":
      toggleFullscreen();
      break;
    case "arrowright":
      // Action for seeking forward, e.g., skip 10 seconds
      currentVideoEl.currentTime += 10;
      break;
    case "arrowleft":
      // Action for seeking backward, e.g., go back 10 seconds
      currentVideoEl.currentTime -= 10;
      break;
    case "l":
      // Action for seeking forward, e.g., skip 5 seconds
      currentVideoEl.currentTime += 5;
      break;
    case "j":
      // Action for seeking backward, e.g., go back 5 seconds
      currentVideoEl.currentTime -= 5;
      break;
    case "arrowup":
      // Action for increasing volume
      if (currentVideoEl.volume < 1) {
        currentVideoEl.volume = Math.min(1, currentVideoEl.volume + 0.1); // Increase volume by 10% or limit to 1
        volumeBar.value = currentVideoEl.volume * 100; // Update volume bar value
      }
      break;
    case "arrowdown":
      // Action for decreasing volume
      if (currentVideoEl.volume > 0) {
        currentVideoEl.volume = Math.max(0, currentVideoEl.volume - 0.1); // Decrease volume by 10% or limit to 0
        volumeBar.value = currentVideoEl.volume * 100; // Update volume bar value
      }
      break;
    case "p":
      togglePictureInPicture();
      break;
    case "escape":
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        backBtn.click();
      }
      break;
    default:
      break;
  }
}

//-------------------------- Event Listerns ---------------------

//Change the view mode of main screen
toggleViewBtn.addEventListener("click", () => {
  mainScreen.classList.toggle("grid-view");
});

//Toggle dark mode
darkModebtn.addEventListener("click", () => {
  mainScreen.classList.toggle("dark");
});

//Update the data of Main screen
addEventListener("load", () => {
  videoEllis.forEach((li) => {
    const video = li.querySelector("video");
    const videoName = li.querySelector(".video-name");
    const videoResolutionEl = li.querySelector(".video-resolution");
    const totalDurationEl = li.querySelector(".video-length");
    totalDurationEl.innerText = formateTime(video.duration);
    videoName.innerText = formateSrc(video.src);

    videoResolutionEl.innerText = `${video.videoWidth} x ${video.videoHeight}`;
  });
});

//load video the in Player
videoEllis.forEach((li) => {
  li.addEventListener("click", () => {
    currentVideo = li.querySelector("video");
    video.title = formateSrc(currentVideo.src);
    video.src = currentVideo.src;
    video.index = currentVideo.dataset.index;
    mainScreen.classList.add("playing");
    currentVideoTittle.innerText = video.title;
    currentVideoEl.src = video.src;
    currentVideoEl.dataset.index = video.index;
    updateTimeUI(currentVideo.currentTime, currentVideo.duration);
  });
});

//play pause video

playPauseBtn.addEventListener("click", () => togglePlay());

currentVideoEl.addEventListener("play", () => {
  playerScreen.classList.add("playing");
});

currentVideoEl.addEventListener("pause", () => {
  playerScreen.classList.remove("playing");
});

//Update ProgressBar
currentVideoEl.addEventListener("timeupdate", () => {
  let percent = (currentVideoEl.currentTime / currentVideoEl.duration) * 100;
  progressBar.style.width = percent + "%";
  currentTimeEl.innerText = formateTime(currentVideoEl.currentTime);
});

//next video
nextVideoBtn.addEventListener("click", () => {
  let nextIndex = parseInt(currentVideoEl.dataset.index) + 1;
  if (nextIndex < allVideos.length) {
    let nextVideo = allVideos[nextIndex];
    loadNewVideo(nextVideo);
  } else {
    loadNewVideo(allVideos[0]);
  }
});
//previous video
prevVideoBtn.addEventListener("click", () => {
  let prevIndex = parseInt(currentVideoEl.dataset.index) - 1;
  if (prevIndex >= 0) {
    let prevVideo = allVideos[prevIndex];
    loadNewVideo(prevVideo);
  } else {
    loadNewVideo(allVideos[allVideos.length - 1]);
  }
});

//go back to main screen
backBtn.addEventListener("click", () => {
  currentVideoEl.pause();
  currentVideoEl.currentTime = 0;
  progressBar.style.width = "0%";
  currentVideoEl.src = "";
  currentVideoTittle.innerText = "";
  playerScreen.classList.remove("playing");
  mainScreen.classList.remove("playing");
});

//Volume Control
volumeBtn.addEventListener("click", toggleMute);

volumeBar.addEventListener("change", () => {
  currentVideoEl.muted = false;
  if (volumeBar.value == 0) {
    playerScreen.classList.add("muted");
    currentVideoEl.muted = true;
  } else {
    playerScreen.classList.remove("muted");
    currentVideoEl.muted = false;
  }
  currentVideoEl.volume = volumeBar.value / 100;
});

// Progressbar
let isDragging = false;

progressBarContainer.addEventListener("click", (e) => {
  let rect = progressBarContainer.getBoundingClientRect();
  let xOffsit = e.x - rect.left;
  let percent = (xOffsit / progressBarContainer.clientWidth) * 100;
  currentVideoEl.currentTime = (percent / 100) * currentVideoEl.duration;
});

progressBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let rect = progressBarContainer.getBoundingClientRect();
    let xOffsit = e.x - rect.left;
    let percent = (xOffsit / progressBarContainer.clientWidth) * 100;

    currentVideoEl.currentTime = (percent / 100) * currentVideoEl.duration;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// fullscreen Toggle
fullScreenToggleBtn.addEventListener("click", toggleFullscreen);

// Picture-In-Picture Mode
pictureInPictureBtn.addEventListener("click", togglePictureInPicture);

//shortcut keys
playerScreen.addEventListener("keydown", (e) => {
  handleShortcuts(e.key);
});
