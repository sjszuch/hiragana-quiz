// Random Number Generator
function rng() {
    return Math.floor(Math.random() * hiragana.length);
}

// Character constructor
function Character(english, japanese, category) {
    this.english = english;
    this.japanese = japanese;
    this.category = category;
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
    a = new Character('a', 'あ', 'basic'),
    i = new Character('i', 'い', 'basic'),
    u = new Character('u', 'う', 'basic'),
    e = new Character('e', 'え', 'basic'),
    o = new Character('o', 'お', 'basic'),
    n = new Character('n', 'ん', 'basic'),

    ka = new Character('ka', 'か', 'k'),
    ki = new Character('ki', 'き', 'k'),
    ku = new Character('ku', 'く', 'k'),
    ke = new Character('ke', 'け', 'k'),
    ko = new Character('ko', 'こ', 'k'),

    sa = new Character('sa', 'さ', 's'),
    shi = new Character('shi', 'し', 's'),
    su = new Character('su', 'す', 's'),
    se = new Character('se', 'せ', 's'),
    so = new Character('so', 'そ', 's')
];

// The character currently displayed, the amount of correct answers, and amount of wrong answers
var currentChar = rng();
var correctCount = 0;
var wrongCount = 0;

// Called when submitting the HTML answer form
$('#answers-here').submit(function(e) {
    e.preventDefault();
    
    if ($('input[name="answer"]').val().toLowerCase() === hiragana[currentChar].english) {
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
        createEl("results", "h1", "You got " + percentageScore + "% of characters correct.");

        // Show how many of each hiragana were missed
        if(wrongCount > 0) {
            createEl("results", "h1", "Wrong Characters: ");

            for (i=0; i<hiragana.length; i++) {
                if(hiragana[i].difficulty > 0) {
                    createEl("characterScore", "p", (hiragana[i].japanese + ": " + hiragana[i].difficulty));
                }
            }
        }


    }

    // Sets the current character to one thats category is equal to the course type
    do {
        currentChar = rng();
    } while (hiragana[currentChar].category !== sessionStorage.getItem("typeOfCourse"));
        



    $('#hira-output').html(hiragana[currentChar].japanese);
    $('#correct-display').html("Correct: " + correctCount);
    $('#wrong-display').html("Wrong: " + wrongCount);
}

// Sets the type of course that will be used on the gameplay page
function setCourseType(type) {
    setTimeout(function() {document.location.href = "gameplay.html";}, 250);
    sessionStorage.setItem("typeOfCourse", type);
}