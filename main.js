
//Speech recognition with Web Speech Api

//we got speech recognition which lives as global variable in the browser and lives on top of the window and 
                                                                            //in Chrome it is webkit SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//Cteate new instance of speechRegon...
const recognition = new SpeechRecognition(); // it is controleer interface for the recognition service of Web Speech Api;
recognition.interimResults = true; //interimResults is property of SpeechRecognition Web Speech Api, comes as true/false;
                                    //the results which aren't yet final, and default is false;
//Create a paragraph
let p = document.createElement('p');    // Creates p tag in html file;
const words = document.querySelector('.words'); //let the prigram know that we work with words class in html file;
words.appendChild(p); // add the p under words class in html file ;


//adding the eventlistener for result the same concept as click event;
 recognition.addEventListener('result', e => {
                 //convert everythings into a string by converting frist into an array and then map over each of them; 
    const transcript = Array.from(e.results)        //we do map twice because everything is so nested,
        .map(result => result[0])   //map the first thing we have in property list,
        .map(result => result.transcript)   // map one more time and return transcript property,
        .join('')                            // we join all the strings in the array together into one big string;
  //adding the p tag everytime you say something and bring it to the DOM;
  p.textContent = transcript;           // but as soon as you stop talking the next sentence will overwrite the previous;
  if(e.results[0].isFinal){         //basically, if author made break and then continue talking just override the p - 
      p = document.createElement('p');      //but continue to keep everything on the DOM
      words.appendChild(p);                 //if the event (speech) isfinal-stopped then just another p and override it;
  }      

  if (transcript.includes('poop')){
      words.append('💩');
      console.log('💩');
  } if (transcript.includes('unicorn')) {
      words.append(' 🦄 ')
  }
            //console.log(transcript);     
});

//adding the 2nd listener to continue listening the result event which is recognition, after author stops between the sentences;
recognition.addEventListener('end', recognition.start); //when result event stops it runs recognition.start again


recognition.start(); //to keep not running on page load but ask the permition...