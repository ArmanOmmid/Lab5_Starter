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
  
  synth.onvoiceschanged = populateVoiceList();
  synth.onvoiceschanged = populateVoiceList;

  // var tryLoadVoices = setInterval(
  //   (lambda) => {
  //     populateVoiceList();
  //     if(voices.length != 0){
  //       clearInterval(tryLoadVoices);
  //     }
  //     console.log("test");
  //   },
  //   250
  // );

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
      setTimeout((lambda)=> {
        utterThis.onstart = openSmiley;
        utterThis.onend = closeSmiley;
        synth.speak(utterThis)

      }, 50);

      function openSmiley(){
        smiley.src = "assets/images/smiling-open.png";
        smiley.alt = "Smiling open face";
        console.log("start");
      }
      function closeSmiley(){
        smiley.src = "assets/images/smiling.png";
        smiley.alt = "Smiling face";
        console.log("end");
      }
      
    }
  );

}