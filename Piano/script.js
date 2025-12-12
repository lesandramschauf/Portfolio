// JavaScript source code
const allPianoOptions = document.querySelectorAll(".piano-keys .key");
const pianoKeys = document.querySelectorAll(".piano-keys .key.shown");
const submit = document.querySelector("#submit");
const keyOf = document.querySelector("h2");
const mode = document.querySelector(".mode select");
const key = document.querySelector(".key select");
const oct = document.querySelector(".oct select");
const keyStart = document.querySelector(".startKey select");


let allBoardKeys = [];
let audio = new Audio("tunes/a.wav");
let allPianoKeysBase = ["C", "CD", "D", "DE", "E", "F", "FG", "G", "GA", "A", "AB", "B"];
let keyNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]
let allModes = [[2, 2, 1, 2, 2, 2, 1, 2, 2], [2, 1, 2, 2, 1, 2, 2, 2, 1], [2, 1, 2, 2, 2, 1, 2, 2, 1], [1, 2, 2, 2, 1, 2, 2, 1, 2], [2, 2, 2, 1, 2, 2, 1, 2, 2], [2, 2, 1, 2, 2, 1, 2, 2, 2], [1, 2, 2, 1, 2, 2, 2, 1, 2]];
let allKeys = ["a", "w", "s", "e", "d", "r", "f", "t", "g", "y", "h", "u", "j", "i", "k", "o", "l", "p", ";"];
let allMajors = [['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'], ['D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D'], ['A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A'], ['G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G'], ['G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb'], ['F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E'], ['C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C']];
let allMinors = [['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'], ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'], ['G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb'], ['F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E'], ['E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb'], ['D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db'], ['A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A']];
let toFixNotes = [[0, 0, 0, 0, 0, 0, 0], [11, 10, 10, 10, 11, 10, 10], [9, 8, 9, 8, 9, 9, 8], [7, 7, 7, 7, 7, 7, 6], [5, 5, 5, 5, 6, 5, 5], [4, 3, 3, 3, 4, 4, 3], [2, 2, 2, 1, 2, 2, 1], [0, 0, 0, 0, 0, 0, 0], [11, 10, 10, 10, 11, 10, 10], [9, 8, 9, 8, 9, 9, 8]];
let toFixMode = [[0, 1, 2, 3, 4, 5, 6], [6, 5, 0, 2, 3, 4, 1], [1, 4, 6, 0, 2, 3, 5], [5, 3, 1, 6, 0, 2, 4], [4, 2, 5, 1, 6, 0, 3], [3, 0, 4, 5, 1, 6, 2], [2, 6, 3, 4, 5, 1, 0], [0, 1, 2, 3, 4, 5, 6], [6, 5, 0, 2, 3, 4, 1], [1, 4, 6, 0, 2, 3, 5]];
let myKeys = [];
let allPianoKeys = [];
let keyNum = 0;
let modeNum = 0;
let keyStartNum = 0;
let startKeyNum = 0;
let pressed1 = false;
let curKey = "";


const playTune = (key) => {
    let note = allPianoKeys[allKeys.indexOf(key)];
    if (note != '') {
        audio.src = 'tunes/' + note + '.wav';
        audio.play();
        audio.loop = true;
        pressed1 = true;
        const clickedKey = document.querySelector('[data-key="' + key + '"]');
        clickedKey.classList.add("active");
        document.addEventListener("keyup", stopTune);
        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 1500);
    }
    
}

const stopTune = (k) => {
    if (curKey == k.key) {
        audio.pause();
        pressed1 = false;
    }
}

pianoKeys.forEach(key => {
    allBoardKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
    let currentKey = "";
    if (keyNum < allPianoKeysBase.length) {
        currentKey = allPianoKeysBase[keyNum] + 1;
    } else {
        currentKey = allPianoKeysBase[keyNum - allPianoKeysBase.length]+ 2;
    }
    allPianoKeys.push(currentKey);
    keyNum = keyNum + 1;
});



const pressedKey = (e) => {
    const clickedKey = document.querySelector('[data-key="' + e.key + '"]');
    clickedKey.classList.remove("active");
    if (curKey != e.key) {
        pressed1 = false;
        curKey = e.key;
    } 
    if (!pressed1) {
        if (allBoardKeys.includes(e.key)) { playTune(e.key) };
    } 
};

const changeMode = () => {
    let keyWhite = true;
    let hide = false;
    keyStartNum = parseFloat(keyStart.value);
    modeNum = parseInt(mode.value);
    keyNum = parseInt(key.value);
    if (keyStartNum == 0 || keyStartNum == 7) {
        startKeyNum = 0;
    } else if (keyStartNum > 7) {
        startKeyNum = 7 - (keyStartNum - 7)
    }else {
        startKeyNum = 7 - keyStartNum;
    }
    
    keyNum = keyNum + toFixNotes[keyStartNum][modeNum];
    modeNum = toFixMode[keyStartNum][modeNum];
    let currentMode = allModes[modeNum];
    keyStartNum = 0 - keyStartNum;
    
    let x = 0;
    let y = 0;
    let z = 0;
    let octNum = parseInt(oct.value); 
    allPianoKeys = [];
    myKeys = [];
    const keyinner = document.querySelectorAll('p');
    keyOf.innerHTML = "Key of: " + allMajors[parseInt(mode.value)][parseInt(key.value)] + " Major || " + allMinors[parseInt(mode.value)][parseInt(key.value)] + " Minor";

    allPianoOptions.forEach(key => {
        let currentKey = "";
        let curModeNum = currentMode[y];

        if (keyWhite) {
    
            currentKey = allPianoKeysBase[keyNum % allPianoKeysBase.length] + "" + octNum;

            if ((keyNum + 1) % allPianoKeysBase.length == 0) {
                octNum = octNum + 1;
            }
            keyinner[z].innerHTML = keyNames[keyNum % allPianoKeysBase.length] + " | " + keyStartNum;
            

            allPianoOptions[z].classList.remove("third");
            allPianoOptions[z].classList.remove("fourth");
            allPianoOptions[z].classList.remove("last");
            allPianoOptions[z].classList.remove("home");

            if (startKeyNum == 0) {
                allPianoOptions[z].classList.add("home");
            } else if (startKeyNum == 2) {
                allPianoOptions[z].classList.add("third");
            } else if (startKeyNum == 3) {
                allPianoOptions[z].classList.add("fourth");
            } else if (startKeyNum == 6) {
                allPianoOptions[z].classList.add("last");
            }

            keyNum = keyNum + 1;
            keyStartNum = keyStartNum + 1;
            if (startKeyNum < 6) {
                startKeyNum = startKeyNum + 1;
            } else {
                startKeyNum = 0;
            }
            
            
            if (curModeNum == 2) {
                hide = false;
            } else {
                hide = true;
            }
            keyWhite = false;
        } else {

            if (hide) {
                allPianoOptions[z].classList.add("hide");
                allPianoOptions[z].classList.remove("shown");
            } else {
                currentKey = allPianoKeysBase[keyNum % allPianoKeysBase.length] + "" + octNum;
                if ((keyNum + 1) % allPianoKeysBase.length == 0) {
                    octNum = octNum + 1;
                }
                keyinner[z].innerHTML = keyNames[keyNum % allPianoKeysBase.length];
                keyNum = keyNum + 1;
               
                allPianoOptions[z].classList.add("shown");
                allPianoOptions[z].classList.remove("hide");
            }
            keyWhite = true;
            y = y + 1;
        }
        z = z + 1;
        allPianoKeys.push(currentKey);
    });
};

document.addEventListener("keydown", pressedKey);
submit.addEventListener("click", changeMode);
