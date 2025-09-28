const questions = [

	{
		question: "Who is known as the Missile Man of India?",
		answers: [
		" Vikram Sarabhai" ,          "A. P. J. Abdul Kalam",
 "HomiBhabha " , "C. V. Raman",
		],
		correct: 2,
	},
    {
		question: "Which country in the world hires the largest number of freshers in companies every year?",
		answers: ["India", "USA", "China", "Germany"],
		correct: 1,
	},

	{
		question: "Which ocean has the largest number of islands?",
		answers: [
			" Atlantic Ocean",
			"Pacific Ocean ",
			"Neither answer is correct",
			"Indian Ocean",
		],
		correct: 2,
	},
	{
		question: "Which Indian IT company developed an AI-powered platform called 'Ignio' that helps automate IT operations?",
		answers: ["Infosys", "Wipro", "Tata Consultancy Services (TCS)", "HCL Technologies"],
        correct: 3,

 
    },     
		
	{
		question: "In what year did World War II start?",
		answers: ["1935", "1945", "1939", "Neither answer is correct"],
		correct: 3,
	},
    	{
		question: "Which city was the capital of India before New Delhi?",
		answers: ["chennai", "karanataka", "delhi", "calcutta"],
		correct: 4,
	},
     	{
		question: "Which country is known for having the lowest personal income tax rate in the world?",
		answers: ["United Arab Emirates", "Monaco", " Bahamas", "Singapore"],
		correct: 1,
	},
    	
];


const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score = 0; 
let questionIndex = 0; 

clearPage();
showQuestions()
submitBtn.onclick = checkAnswer;

function clearPage (){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestions(){
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace("%title%" , questions[questionIndex]['question'])
	headerContainer.innerHTML = title

	
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']){

		const questionTemplate = `
				<li>
					<label>
						<input value =%numberValue% type="radio" class="answer" name="answer" />
							<span>%answer%</span>
					</label>
				</li>`

		const answerHTML = questionTemplate
										.replace('%answer%', answerText )	
										.replace('%numberValue%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}

	
}

function checkAnswer (){

	
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if (!checkedRadio) {
		submitBtn.blur();
	}else {
	
		const userAnswer = +checkedRadio.value;

		
		if(userAnswer === questions[questionIndex]['correct']){
			score++;
		}

		if(questionIndex !== questions.length - 1){
			questionIndex++;
			clearPage();
			showQuestions();
		}else{
			clearPage();
			showResults();
		}

	}



}

function showResults (){

	const resultsTemplate = `
						<h2 class="title">%title%</h2>
						<h3 class="summary">%message%</h3>
						<p class="result">%result%</p>
							`;

	let title, message;

	if(score === questions.length){
		title = 'Great'
		message = 'You answered all the questions correctly'
	} else if((score * 100) / questions.length >= 50) {
		title = 'Good '
		message =' There is an opportunity to learn more'
	} else {
		title = 'Bad result'
		message = 'You performed poorly'
	}

	let result = `${score} correct answers from  ${questions.length}`;


	const finalMessage = resultsTemplate
										.replace ('%title%', title)
										.replace ('%message%', message)
										.replace ('%result%', result)

	headerContainer.innerHTML = finalMessage;
	submitBtn.blur()
	submitBtn.innerText = 'Start over';
	submitBtn.onclick = () => history.go()
}
