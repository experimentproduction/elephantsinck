// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // "Play" buttons + audio player
  const nowPlaying = document.getElementById("nowPlaying");
  const trackTime = document.getElementById("trackTime");
  const trackButtons = document.querySelectorAll("[data-track]");
  const playLatest = document.getElementById("playLatest");
  const audioPlayer = document.getElementById("audioPlayer");
  const playerNotification = document.getElementById("playerNotification");
  const playerNotificationText = document.getElementById("playerNotificationText");
  const playerStopButton = document.getElementById("playerStopButton");

  // Map judul lagu ke file audio mp3
  // Sesuaikan dengan nama file asli di folder /audio
  const trackFiles = {
    "Sedikit Melirik": "audio/Elephant Sinck - Sedikit Melirik.mp3",
    "Single Terbaru": "audio/Elephant Sinck - Sedikit Melirik.mp3", // tombol di hero
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const showNotification = (message) => {
    if (!playerNotification || !playerNotificationText) return;
    playerNotificationText.textContent = message;
    playerNotification.classList.add("show");
  };

  const hideNotification = () => {
    if (!playerNotification) return;
    playerNotification.classList.remove("show");
  };

  const handlePlay = (trackName) => {
    if (nowPlaying) {
      nowPlaying.textContent = `Memutar: ${trackName}`;
    }

    if (audioPlayer && trackFiles[trackName]) {
      // Ganti sumber audio dan putar
      if (audioPlayer.src.endsWith(trackFiles[trackName])) {
        // Jika lagu sama, toggle play/pause
        if (audioPlayer.paused) {
          audioPlayer.play();
          showNotification(`Sedang diputar: ${trackName}`);
        } else {
          audioPlayer.pause();
          showNotification(`Lagu dijeda: ${trackName}`);
        }
      } else {
        audioPlayer.src = trackFiles[trackName];
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        showNotification(`Sedang diputar: ${trackName}`);
      }

      audioPlayer.onpause = () => {
        showNotification(`Lagu dijeda: ${trackName}`);
      };

      audioPlayer.onended = () => {
        hideNotification();
        if (nowPlaying) {
          nowPlaying.textContent = "Tidak ada lagu yang diputar.";
        }
        if (trackTime) {
          const total = formatTime(audioPlayer.duration || 0);
          trackTime.textContent = `00:00 / ${total}`;
        }
      };
    }
  };

  if (audioPlayer && trackTime) {
    audioPlayer.addEventListener("loadedmetadata", () => {
      const total = formatTime(audioPlayer.duration || 0);
      trackTime.textContent = `00:00 / ${total}`;
    });

    audioPlayer.addEventListener("timeupdate", () => {
      const current = formatTime(audioPlayer.currentTime || 0);
      const total = formatTime(audioPlayer.duration || 0);
      trackTime.textContent = `${current} / ${total}`;
    });
  }

  trackButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const trackName = btn.getAttribute("data-track") || "Lagu";
      handlePlay(trackName);
    });
  });

  if (playLatest) {
    playLatest.addEventListener("click", () => {
      handlePlay("Single Terbaru");
      const musicSection = document.getElementById("music");
      if (musicSection) {
        musicSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Tombol stop manual
  if (playerStopButton && audioPlayer) {
    playerStopButton.addEventListener("click", () => {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      hideNotification();
      if (nowPlaying) {
        nowPlaying.textContent = "Tidak ada lagu yang diputar.";
      }
      if (trackTime) {
        const total = formatTime(audioPlayer.duration || 0);
        trackTime.textContent = `00:00 / ${total}`;
      }
    });
  }

  // Simple contact form handler (hanya simulasi, tidak benar-benar mengirim)
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      if (!name) return;

      formStatus.textContent = `Terima kasih, ${name}! Pesan Anda sudah kami terima.`;
      formStatus.style.color = "#a4ffb5";

      contactForm.reset();
    });
  }
});


