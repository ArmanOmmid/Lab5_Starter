// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  var smiley = document.querySelector("img");
  var textbox = document.querySelector("textarea");
  var voiceSelect = document.getElementById("voice-select");
  var playButton = document.querySelector("button");

  var voiceSelection = null;

  var synth = window.speechSynthesis;
  var voices = [];
  var names = [];

  synth.addEventListener("voiceschanged", populateVoiceList);

  function populateVoiceList(){
    voices = synth.getVoices();
    for(let i = 0; i < voices.length; i++){
      var option = document.createElement("option");
      voiceSelect.appendChild(option);
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";
      names.push(option.textContent);
    }
  }

  voiceSelect.addEventListener("change", 
    (event)=>{
      let selection = event.target.value;
      for(let i = 0; i < voices.length; i++){
        if(names[i] == selection){
          voiceSelection = names[i];
          break;
        }
      }
    }
  );

  textbox.addEventListener("change",
    (event)=> {
      textbox.textContent = event.target.value;
    }
  );

  playButton.addEventListener("click",
    (event) => {
      synth.cancel();
      let utterThis = new SpeechSynthesisUtterance(textbox.textContent);
      if(voiceSelection == null){
        //console.log("No Voice Selected Error");
        return;
      }
      for(let i = 0; i < voices.length; i++){
        if(names[i] == voiceSelection){
          utterThis.voice = voices[i];
          break;
        }
      }
      smiley.src = "assets/images/smiling-open.png";
      smiley.alt = "Smiling open face";

      synth.speak(utterThis);
      
      var speakCheck = setInterval(
        (lambda) => {
          if(!synth.speaking){
            smiley.src = "assets/images/smiling.png";
            smiley.alt = "Smiling face";
            clearInterval(speakCheck);
          }
        },
        250
      );
    }
  );

}