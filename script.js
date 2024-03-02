const questions =[
    {
        question: "Sino ang pinaka senior barista sa SM GONG CHA?",
        answer: [
            {text: "jaff", correct: true},
            {text: "Glo", correct: false},
            {text: "Gelo", correct: false},
            {text: "Jul", correct: false},
        ]
    },
    {
        question: "sino ang bakla na hindi umaamin?",
        answer: [
            {text: "Gelo", correct: true},
            {text: "Jaff", correct: false},
            {text: "Shawn", correct: false},
            {text: "glo", correct: false},
        ]
    },
    {
        question: "sino si fiona?",
        answer: [
            {text: "Jaff", correct: false},
            {text: "Glo", correct: false},
            {text: "Jackie", correct: true},
            {text: "Geof", correct: false},
        ]
    },
    {
        question: "sino ang pinaka manyakis sa store?",
        answer: [
            {text: "Jaff", correct: false},
            {text: "Jul", correct: false},
            {text: "Ram", correct: true},
            {text: "Shawn", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
}

    function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

        currentQuestion.answer.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click",selectAnswer)
        });
        
    }


    function resetState(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");

            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }



    nextButton.addEventListener("click", ()=> {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
        });
    
    startQuiz();