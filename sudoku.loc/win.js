const winMessageElement = document.querySelector(".win-message");

const winSoundElement = document.getElementById("win-sound");
let confettiInterval;

winMessageElement.addEventListener("transitionend", () => {
  winSoundElement.play();
  console.log("audio");
  confetti.start();
  clearInterval(confettiInterval);
  confettiInterval = stop();
});

const stop = () => {
  return setTimeout(function () {
    confetti.stop();
  }, 5000);
};
