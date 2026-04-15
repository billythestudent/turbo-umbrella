window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 1000);

  const bgMusic = document.getElementById("bgMusic");

  const startMusic = () => {
    if (!bgMusic) {
      return;
    }

    const playPromise = bgMusic.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Mobil tarayıcı ilk kullanıcı etkileşimini bekleyebilir.
      });
    }
  };

  startMusic();

  ["pointerdown", "touchstart", "click"].forEach((eventName) => {
    document.addEventListener(eventName, startMusic, { once: true, passive: true });
  });

  const letterToggle = document.getElementById("letterToggle");
  const letterModal = document.getElementById("letterModal");
  const letterClose = document.getElementById("letterClose");

  if (!letterToggle || !letterModal || !letterClose) {
    return;
  }

  const openLetter = () => {
    startMusic();
    letterModal.classList.add("is-open");
    letterModal.setAttribute("aria-hidden", "false");
  };

  const closeLetter = () => {
    letterModal.classList.remove("is-open");
    letterModal.setAttribute("aria-hidden", "true");
  };

  letterToggle.addEventListener("click", openLetter);
  letterClose.addEventListener("click", closeLetter);

  letterModal.addEventListener("click", (event) => {
    if (event.target === letterModal) {
      closeLetter();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLetter();
    }
  });
});
