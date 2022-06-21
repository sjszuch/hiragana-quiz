// Random Number Generator
function rng() {
    return Math.floor(Math.random() * hiragana.length);
}

// Character constructor
function Character(english, japanese) {
    this.english = english;
    this.japanese = japanese;
    this.difficulty = 0;
}

// A function called to create a new element on the page with the class name of "results-screen"
function createEl(name, type, nameVal) {
    name = document.createElement(type);
    name.className = 'results-screen';
    name.innerText = nameVal;
    document.body.appendChild(name);
   }

// Every hiragana character object
var hiragana = [
    a = new Character('a', 'あ'),
    ka = new Character('ka', 'か'),
    sa = new Character('sa', 'さ'),
    ta = new Character('ta', 'た'),
    na = new Character('na', 'な'),
    i = new Character('i', 'い'),
    ki = new Character('ki', 'き'),
    shi = new Character('shi', 'し'),
    chi = new Character('chi', 'ち')
];

// The character currently displayed, the amount of correct answers, and amount of wrong answers
var currentChar = rng();
var correctCount = 0;
var wrongCount = 0;

// Called when submitting the HTML answer form
$('#answers-here').submit(function(e) {
    e.preventDefault();
    
    if ($('input[name="answer"]').val() === hiragana[currentChar].english) {
        correctCount++;
    } else {
        hiragana[currentChar].difficulty++;
        wrongCount++;
    }

    update();
});

// When called, gets a new character and outputs it, and checks if the test is over
function update() {
    percentageScore = Math.round(correctCount / (correctCount + wrongCount) * 100);
    $('#percent').html(percentageScore);

    // If the test has reached the maximum amount of questions
    if(correctCount+wrongCount === 10) {

        // Hide the play area
        $('#play-area').hide();

        // Create a results header
        createEl("results", "h1", "You got " + percentageScore + "% of characters correct.\nWrong Characters:");

        // Show how many of each hiragana were missed
        for (i=0; i<hiragana.length; i++) {
            createEl("characterScore", "p", (hiragana[i].japanese + ": " + hiragana[i].difficulty));
        }

    }



    currentChar = rng();
    $('#hira-output').html(hiragana[currentChar].japanese);
    $('#correct-display').html("Correct: " + correctCount);
    $('#wrong-display').html("Wrong: " + wrongCount);
}

update();