const musicPlayer = document.querySelector(".wrapper"),
  trackName = document.querySelector(".track-name"),
  trackAuthor = document.querySelector(".track-author"),
  progressBarContainer = document.querySelector(".progress"),
  progressBar = document.querySelector(".progress-bar"),
  currentTime = document.querySelector(".current-time"),
  totalDuration = document.querySelector(".total-duration"),
  shuffleBtn = document.querySelector("#shuffle-btn i"),
  prevSongBtn = document.querySelector("#prev-btn i"),
  nextSongBtn = document.querySelector("#next-btn i"),
  playPauseSongBtn = document.querySelector("#play-pause-btn i"),
  openSongListBtn = document.querySelector("#open-song-list"),
  closeSongListBtn = document.querySelector("#close-song-list"),
  songList = document.querySelector("#songs-list"),
  audioEls = document.querySelectorAll("audio"),
  songListLi = songList.querySelectorAll("#songs-list li"),
  allSongsTitle = document.querySelectorAll(".song-title"),
  allSongsAuthor = document.querySelectorAll(".song-author");

let index = 0;
let playing = false;
let shuffled = false;
let repeating = false;

function formateTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  if (remainingSeconds < 10) {
    return `${minutes}:0${remainingSeconds}`;
  } else {
    return `${minutes}:${remainingSeconds}`;
  }
}

function updateUI(songIndex) {
  // Update the UI of the selected song in the list
  let currentSong = audioEls[songIndex];
  trackName.innerText = allSongsTitle[songIndex].innerText;

  //Check if the title is causing overflow
  trackName.clientWidth > musicPlayer.clientWidth
    ? trackName.classList.add("marquee-text")
    : trackName.classList.remove("marquee-text");

  trackAuthor.innerText = "by: " + allSongsAuthor[songIndex].innerText;

  currentTime.innerText = formateTime(currentSong.currentTime);
  totalDuration.innerText = formateTime(currentSong.duration);

  currentSong.addEventListener("timeupdate", () => {
    progressBar.style.width =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
    currentTime.innerText = formateTime(currentSong.currentTime);
    totalDuration.innerText = formateTime(currentSong.duration);

    if (
      formateTime(currentSong.currentTime) === formateTime(currentSong.duration)
    ) {
      if (shuffled === false && repeating === false) {
        playNextSong();
      } else if (repeating === true) {
        repeatPlayingSong();
      } else {
        playRandomSong();
      }
    }
  });
}

function playSong() {
  playPauseSongBtn.innerText = "pause";
  playPauseSongBtn.classList.remove("paused");
  audioEls[index].play();
  playing = true;
}
function pauseSong() {
  playPauseSongBtn.innerText = "play_arrow";
  playPauseSongBtn.classList.add("paused");
  audioEls[index].pause();
  playing = false;
}

function resetSong() {
  pauseSong();
  audioEls[index].currentTime = 0;
}

function playNextSong() {
  if (index >= audioEls.length - 1) {
    if (playing === false) {
      index = 0;
      updateUI(index);
    } else {
      resetSong();
      index = 0;
      updateUI(index);
      playSong();
    }
  } else {
    if (playing === false) {
      index++;
      updateUI(index);
    } else {
      resetSong();
      index++;
      updateUI(index);
      playSong();
    }
  }
}

function playPrevSong() {
  if (index <= 0) {
    if (playing === false) {
      index = audioEls.length - 1;
      updateUI(index);
    } else {
      resetSong();
      index = audioEls.length - 1;
      updateUI(index);
      playSong();
    }
  } else {
    if (playing === false) {
      index--;
      updateUI(index);
    } else {
      resetSong();
      index--;
      updateUI(index);
      playSong();
    }
  }
}

function updateShuffleButton() {
  switch (shuffleBtn.innerText) {
    case "repeat":
      shuffleBtn.innerText = "repeat_one";
      shuffleBtn.setAttribute("title", "Repeating One Song");
      shuffled = false;
      repeating = true;
      break;
    case "repeat_one":
      shuffleBtn.innerText = "shuffle";
      shuffleBtn.setAttribute("title", "Shuffled Playlist");
      shuffled = true;
      repeating = false;
      break;
    case "shuffle":
      shuffleBtn.innerText = "repeat";
      shuffleBtn.setAttribute("title", "Repeating All");
      shuffled = false;
      repeating = false;
      break;
  }
}

function repeatPlayingSong() {
  audioEls[index].currentTime = 0;
}

function playRandomSong() {
  if (playing === false) {
    index = Math.floor(Math.random() * audioEls.length);
    updateUI(index);
  } else {
    resetSong();
    index = Math.floor(Math.random() * audioEls.length);
    updateUI(index);
    playSong();
  }
}

progressBarContainer.addEventListener("click", (e) => {
  let clickedPoint;
  const rect = progressBarContainer.getBoundingClientRect();
  const xOffset = e.clientX - rect.left;
  const percentage = xOffset / rect.width;
  clickedPoint = percentage * audioEls[index].duration;
  audioEls[index].currentTime = clickedPoint;
});

shuffleBtn.addEventListener("click", updateShuffleButton);

playPauseSongBtn.addEventListener("click", () => {
  !playing ? playSong() : pauseSong();
});

nextSongBtn.addEventListener("click", () => {
  shuffled ? playRandomSong() : playNextSong();
});

prevSongBtn.addEventListener("click", () => {
  shuffled ? playRandomSong() : playPrevSong();
});

openSongListBtn.addEventListener("click", () => {
  songList.classList.add("open");
});

closeSongListBtn.addEventListener("click", () => {
  songList.classList.remove("open");
});

songListLi.forEach((li) => {
  li.addEventListener("click", () => {
    songListLi.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
    resetSong();
    index = Number(li.dataset.index);
    playSong();
    updateUI(index);
  });
});

window.addEventListener("load", () => {
  updateUI(index);
});
