// Random Number Generator
function rng() {
    return Math.floor(Math.random() * hiragana.length);
}

// Character constructor
function Character(english, japanese) {
    this.english = english;
    this.japanese = japanese;
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
        wrongCount++;
    }

    update();
});

// When called, gets a new character and outputs it
function update() {
    currentChar = rng();
    $('#hira-output').html(hiragana[currentChar].japanese);
    $('#correct-display').html("Correct: " + correctCount);
    $('#wrong-display').html("Wrong: " + wrongCount);

    percentageScore = Math.round(correctCount / (correctCount + wrongCount) * 100);
    $('#percent').html(percentageScore);
}

update();






