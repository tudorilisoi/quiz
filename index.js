'use strict';
const startButton = document.getElementById("start-btn");
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let currentQuestionIndex;

// startButton.addEventListener('click', startQuiz);

const CONTAINER = $(`#js-quiz-question`)
const STATUS_CONTAINER = $(`#quiz-status`)
const STATUS_WRAPPER = $(`#js-quiz-status-wrapper`)
const START_INFO_WRAPPER = $(`#js-start-info-wrapper`)


function displayStartInfo() {
    console.log('started');
    // $(`.js-quiz-question`).hide();
    // $(`#quiz-status`).hide();
    // startButton.classList.add('hide');
    // questionContainerElement.classList.remove('hide');

    $(STATUS_WRAPPER).hide()
    $(CONTAINER).hide()

    $(START_INFO_WRAPPER).show()


}
function setNextQuestion() {
    showQuestion(currentQuestionIndex);
}
function showQuestion() {
    questionElement.innerText = question.question;
}

const STORE = {
    currentQuestionIndex: 0,
    score: 0,
    incorrect: 0,
    questionsArr: [
        {
            text: 'What is the most popular MMORPG game? ',
            answers: [
                'World Of Warcraft',
                'Lineage 2',
                'Aion',
                'League of Angels',

            ],
            correctAnswerIndex: 0,

        },
        {
            text: 'Which game you know like shooting game ',
            answers: [
                'CS:go',
                'Dota 2',
                'World of Warcraft',
                'Need for speed',
            ],
            correctAnswerIndex: 0
        }
    ]
}

function evaluateAnswer(ev) {

    ev.preventDefault()

    const answerIndex = $('#answer-form input:checked').val()

    if (answerIndex === undefined) {
        alert('please choose an answer!')
        return
    }
    const question = getCurrentQuestion()
    const correct = parseInt(answerIndex) === question.correctAnswerIndex
    if (correct) {
        STORE.score++
    } else {
        STORE.incorrect++
    }
    displayStatus()

    const correctAnswerString = question.answers[question.correctAnswerIndex]
    displayFeedback(correct, correctAnswerString)

}

function restartQuiz() {

    $(STATUS_WRAPPER).show()
    $(CONTAINER).show()
    $(START_INFO_WRAPPER).hide()
    
    STORE.currentQuestionIndex = 0
    STORE.score = 0
    STORE.incorrect = 0
    displayCurrentQuestion()
    displayStatus()
}

function gotoNextQuestion() {
    // move the cursor to the next question
    STORE.currentQuestionIndex++

    if (STORE.currentQuestionIndex === STORE.questionsArr.length) {
        displayFinalScore()
    } else {
        displayCurrentQuestion()
    }
}

function displayStatus() {

    STATUS_CONTAINER.text(`Q ${STORE.currentQuestionIndex + 1} of ${STORE.questionsArr.length}, ${STORE.score} correct, ${STORE.incorrect} incorrect`)
}

function displayFeedback(isCorrect, correctAnswerString) {
    const text = isCorrect ? 'You did well!' : `Sorry, wrong answer, the correct one is "${correctAnswerString}"`
    CONTAINER.html(`
        <h1>${text}</h1>
         <button class="js-next-question-button">Next</button>
    `)
}

function displayFinalScore() {
    STATUS_CONTAINER.text('')
    CONTAINER.html(`
        <h1>Your final score is: ${STORE.score}</h1>
         <button class="js-restart-button">Restart</button>
    `)
}

function getCurrentQuestion() {
    return STORE.questionsArr[STORE.currentQuestionIndex]
}

function displayCurrentQuestion() {
    const question = getCurrentQuestion()

    const answersString = question.answers.map((a, index) => `
    <label>
    ${a}
    <input type="radio" name="answer" value="${index}"></input>
    </label>
    
    `).join(' ')


    const htmlString = `
    <h1>${question.text}</h1>
    <form id="answer-form">
        ${answersString}
    
    <button type="submit" class="js-evaluate-button">Submit answer</button>
    </form>    
        `
    CONTAINER.html(htmlString)
    displayStatus()
}


$(() => {
    //setup next question click handler
    CONTAINER.on('click', '.js-evaluate-button', evaluateAnswer)
    CONTAINER.on('click', '.js-next-question-button', gotoNextQuestion)

    //setup restart handler
    $('body').on('click', '.js-restart-button', restartQuiz)
    $('body').on('click', '#js-start-btn', restartQuiz)

    //start!
    // displayCurrentQuestion()
    displayStartInfo()
})

