document.addEventListener("DOMContentLoaded",function(){
    let navItem=document.getElementById("nav-bar");
    let navbar=document.createElement("nav");
    let howItwork=createLink("#","How it works?");
    let feature=createLink("#","Features");
    let aboutUs=createLink("#","About us");
    let loginButton=document.createElement("a");
    loginButton.href="#";
    loginButton.textContent="Login";
    loginButton.classList.add("login-button");
    navbar.appendChild(howItwork);
    navbar.appendChild(feature);
    navbar.appendChild(aboutUs);
    navbar.appendChild(loginButton);
    navItem.appendChild(navbar);
});
function createLink(href,text){
    let link=document.createElement("a");
    link.href=href;
    link.textContent=text;
    return link;
}
let currentCategoryIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let quizData = [
    {
        "category": "General Knowledge",
        "questions": [
            {
                "question": "Who wrote 'To Kill a Mockingbird'?",
                "options": ["Harper Lee", "George Orwell", "Jane Austen", "F. Scott Fitzgerald"],
                "answer": "Harper Lee"
            },
            // more questions...
        ]
    },
    // more category...
];
function startQuiz() {
    window.location.href = "categoryPage.html";
}
function loadCategoryPage() {
    const category = quizData[currentCategoryIndex];
    const question = category.questions[currentQuestionIndex];
    let r=1;
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = 
    `<h2>${category.category}</h2>
        <p>${question.question}</p>
        <ul id="myForm">
            ${question.options.map(option => `<input type="radio" class="one" name="radioGroup" value="${option}">${option}`).join('')}
        </ul>
        <button onclick="submitAnswer()">Submit Answer</button>
    `;
}

function submitAnswer() {
     let selectedValue;
     let radios=document.getElementsByName("radioGroup");
     for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            selectedValue=radios[i].value;
            break;
        }
     }
    const selectedAnswer = selectedValue;
    const correctAnswer = quizData[currentCategoryIndex].questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    if (currentQuestionIndex < quizData[currentCategoryIndex].questions.length - 1) {
        currentQuestionIndex++;
        loadCategoryPage();
    } else if (currentCategoryIndex < quizData.length - 1) {
        currentCategoryIndex++;
        currentQuestionIndex = 0;
        loadCategoryPage();
    } else {
        displayResults();
    }
}
function displayResults() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${calculateTotalQuestions()} questions</p>
        <button onclick="retryQuiz()">Retry Quiz</button>
    `;
    localStorage.setItem("userScore", score);
}

function retryQuiz() {
    currentCategoryIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    loadCategoryPage();
}

function calculateTotalQuestions() {
    let totalQuestions = 0;
    for (const category of quizData) {
        totalQuestions += category.questions.length;
    }
    return totalQuestions;
}
loadCategoryPage();

