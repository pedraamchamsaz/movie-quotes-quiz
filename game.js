const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionsCounter = 0
let availableQuestions = []

let questions = [
    {
        question: '"I feel the need. The need for speed"',
        choice1: 'The Fast and the Furious',
        choice2: 'Mission Impossible',
        choice3: 'Top Gun',
        choice4: 'Need for Speed',
        answer: 3,
    },
    {
        question: '“I\’ve a feeling we\’re not in Kansas anymore”',
        choice1: 'Casablanca',
        choice2: 'The Wizard of Oz',
        choice3: 'The Sound of Music',
        choice4: 'Gone with the Wind',
        answer: 2,
    },
    {
        question: '“Wax on, wax off”',
        choice1: 'The Karate Kid',
        choice2: 'Grease',
        choice3: 'The Outsiders',
        choice4: 'Rocky',
        answer: 1,
    },
    {
        question: '“Here\’s Johnny!”',
        choice1: 'The Conjuring',
        choice2: 'A Quiet Place',
        choice3: 'The Curse of La Llorona',
        choice4: 'The Shining',
        answer: 4,
    },
    {
        question: '“Get busy living, or get busy dying”',
        choice1: 'The Green Mile',
        choice2: 'Pulp Fiction',
        choice3: 'Fight Club',
        choice4: 'Shawshank Redemption',
        answer: 4,
    },
    {
        question: '“Go ahead. Make my day”',
        choice1: 'The Good, the Bad and the Ugly',
        choice2: 'Gran Torino',
        choice3: 'Sudden Impact',
        choice4: 'Million Dollar Baby',
        answer: 3,
    },
    {
        question: '“They may take our lives, but they\’ll never take our freedom!”',
        choice1: 'Braveheart',
        choice2: 'Gladiator',
        choice3: 'The Patriot',
        choice4: 'Robin Hood',
        answer: 1,
    },
    {
        question: '“Say hello to my little friend!”',
        choice1: 'Scarface',
        choice2: 'The Untouchables',
        choice3: 'Ocean\’s Eleven',
        choice4: 'Casino',
        answer: 1,
    },
    {
        question: '“Are you not entertained?”',
        choice1: 'Clash of the Titans',
        choice2: '300',
        choice3: 'Hercules',
        choice4: 'Gladiator',
        answer: 4,
    },
    {
        question: '“If you build it, he will come”',
        choice1: 'Major League',
        choice2: 'Field of Dreams',
        choice3: 'Moneyball',
        choice4: '42',
        answer: 2,
    }
]

// Capitalised as it's fixed
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionsCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    // keeps track of score
    if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) { // if game is over...
        localStorage.setItem('mostRecentScore', score) // ...set score in local storage under 'mostRecentScore'...
        return window.location.assign('quiz-app/end.html') // ...and go to end.html
    }

    questionsCounter++
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    // Below sets width to same % as number of questions completed
    progressBarFull.style.width = `${(questionsCounter/MAX_QUESTIONS) * 100}%`

    // Picks a random question from the availableQuestions array
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    // For each answer box, sets 'number' as whatever is set in 'data-number'
    // then sets innerText as text of 'choice1', 'choice2', etc.
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    // Removes the question from the availableQuestions array
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        // if selectedAnswer data-number equals question answer number, set CSS class as correct, otherwise incorrect
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS) // if you get correct answer, increase score by 100 points
        }

        selectedChoice.parentElement.classList.add(classToApply) // adds correct or incorrect class to parent of selectedChoice

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000) // after 1 second, remove CSS class from selected choice and get a new question
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()