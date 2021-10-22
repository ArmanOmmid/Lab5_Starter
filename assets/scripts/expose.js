// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  var hornSelect = document.getElementById("horn-select");
  var image = document.querySelector("img");
  var header = document.querySelector("h2");
  var audioControl = document.querySelector("audio");
  var volumeControl = document.getElementById("volume-controls");
  var volumeIcon = volumeControl.querySelector("img");
  var playButton = document.querySelector("button");

  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener("change",
    (event) => {
      let condition = event.target.value;
      if(condition == "air-horn"){
        header.textContent = "Expose - Air Horn";
        image.src = "assets/images/air-horn.svg";
        image.alt = "Air Horn"
        audioControl.src = "assets/audio/air-horn.mp3";
      }
      else if(condition == "car-horn"){
        header.textContent = "Expose - Car Horn";
        image.src = "assets/images/car-horn.svg";
        image.alt = "Car Horn"
        audioControl.src = "assets/audio/car-horn.mp3";
      }
      else if(condition == "party-horn"){
        header.textContent = "Expose - Party Horn";
        image.src = "assets/images/party-horn.svg";
        image.alt = "Party Horn";
        audioControl.src = "assets/audio/party-horn.mp3";
      }
    }
  );

  volumeControl.addEventListener("change", 
    (event) => {
      let condition = event.target.value;
      if(condition == 0){
        volumeIcon.src = "assets/icons/volume-level-0.svg";
        volumeIcon.alt = "Volume Level 0";
        audioControl.volume = 0;
      }
      else if(condition >= 1 && condition < 33){
        volumeIcon.src = "assets/icons/volume-level-1.svg";
        volumeIcon.alt = "Volume Level 1";
        audioControl.volume = 0.33;
      }
      else if(condition >= 33 && condition < 67){
        volumeIcon.src = "assets/icons/volume-level-2.svg";
        volumeIcon.alt = "Volume Level 2";
        audioControl.volume = 0.67;
      }
      else if(condition >= 67){
        volumeIcon.src = "assets/icons/volume-level-3.svg";
        volumeIcon.alt = "Volume Level 3";
        audioControl.volume = 1.0;
      }
    }
  );

  playButton.addEventListener("click",
    (event) => {
      if(hornSelect.value == "party-horn"){
        jsConfetti.addConfetti();
      }
      audioControl.play();
    }
  );

}