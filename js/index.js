
let QuizApp =  document.querySelector('.quiz-app');
let questionsCount = document.querySelector('.quiz-app .quiz-info .count span');
let bulltes = document.querySelector('.bullte');
let bullteSpans = document.querySelector('.bullte .spans');
let contentQuizArea =  document.querySelector('.quiz-app  .quiz-area');
let answersArea = document.querySelector('.answers-area');
let btn = document.querySelector('.sabmit-button');
let countDownEle = document.querySelector('.quiz-app .countDown');
let resultFalse = document.querySelector('.resultFalse');

let countDownInterval;
let theRightAnswer = '';
let theChooseAnswers = '';
let currentNum = 0;
let rightAnswers = 0;
let answersFalse = 0;

function getJosnObject(){
    let reques = new XMLHttpRequest();
    reques.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            let questionsQuiz = JSON.parse(this.responseText);
            let numberCount = questionsQuiz.length;
            countQuestionAndCreateSpans(numberCount);
            addQuestionData(questionsQuiz[currentNum], numberCount); 
            countDownFun(10, numberCount);
            btn.onclick = function (){
                if (currentNum < numberCount) {
                    theRightAnswer = questionsQuiz[currentNum]['CorrectAnswer_c'];
                    currentNum++;
                    checkedAnswers(theRightAnswer, numberCount);
                }
                if(currentNum === numberCount){
                    numFalse();
                }
                contentQuizArea.innerHTML = '';
                answersArea.innerHTML = ''; 
                addQuestionData(questionsQuiz[currentNum], numberCount);
            hendaleSpans();
            clearInterval(countDownInterval);
            countDownFun(10, numberCount);
            if(currentNum === numberCount){
                showResult(numberCount);
                btnOnload();
            }

        };
        
        }
    };

    reques.open('GET', 'html_Questions.json', true);
    reques.send();
};
getJosnObject();

function countQuestionAndCreateSpans(num) {
    questionsCount.textContent = num;

    for(let i =0; i < num; i++){

        let spans = document.createElement('span');
        if(i === 0){
            spans.classList.add('on');
        }
        bullteSpans.appendChild(spans);
    }
};
function addQuestionData(obj, count){
    if(currentNum < count){
        let h2 = document.createElement('h2');
    let questionH2 = document.createTextNode(obj['title']); 
    h2.appendChild(questionH2);
    contentQuizArea.appendChild(h2);
    
    let mainDiv = document.createElement('div');
    mainDiv.className = 'answers';
    for(let i =1; i <= 4; i++ ){
        let childDiv = document.createElement('div');
        childDiv.className = 'answer';
        let input = document.createElement('input');
        input.name = 'questions';
        input.type = 'radio';
        input.id = `answer_${i}`;
        input.dataset.answer = obj[`answer_${i}`];
        
        if(i === 1){
            input.checked = true;
        }
        
        let label = document.createElement('label');
        label.htmlFor = `answer_${i}`;
        let textLabel = document.createTextNode(obj[`answer_${i}`]);
        label.appendChild(textLabel);

        childDiv.appendChild(input);
        childDiv.appendChild(label);
        mainDiv.appendChild(childDiv);
        mainDiv.appendChild(childDiv);
        answersArea.appendChild(mainDiv);
    }
    }
};

 function checkedAnswers(theRightAnswer, numberCount){
    let Answers = document.getElementsByName('questions');
    for(let i =0; i < Answers.length; i++){
        if(Answers[i].checked){
             theChooseAnswers =  Answers[i].dataset.answer;
        }    
    }  
    if(theRightAnswer != theChooseAnswers){
        answersFalse++;
    }
    if(theRightAnswer === theChooseAnswers){
        rightAnswers++;
        
    }
};
function hendaleSpans() {
    let Spans = document.querySelectorAll('.bullte .spans span');
    let arraySpans = Array.from(Spans);
    arraySpans.forEach((spans, index) =>{
        if(currentNum === index){
            spans.classList.add('on');
        }
    });
};
function showResult(count) {
    contentQuizArea.remove();
    answersArea.remove();
    btn.remove();
    bulltes.remove();

    let divResult = document.createElement('div');
    divResult.className = 'result';

    let spans = document.createElement('span');
    divResult.appendChild(spans);
    QuizApp.appendChild(divResult);
   
    if(rightAnswers > count / 2 && rightAnswers < count){
        let textSpans = document.createTextNode('Good');
        spans.className = 'good';
        spans.appendChild(textSpans); 
       let textDivResult = document.createTextNode(`You answers is  ${rightAnswers} of ${count}`);
        divResult.appendChild(textDivResult);
   
    } else if(rightAnswers === count){
        let textSpans = document.createTextNode('Perfect');
        spans.className = 'perfect';
        spans.appendChild(textSpans); 
       let textDivResult = document.createTextNode(`You answers is  ${rightAnswers} of ${count}`);
       divResult.appendChild(textDivResult);
        
    } else {
        let textSpans = document.createTextNode('Bad');
        spans.className = 'bad';
        spans.appendChild(textSpans); 
       let textDivResult = document.createTextNode(`You answers is  ${rightAnswers} of ${count}`);
       divResult.appendChild(textDivResult);
    }
};
function countDownFun(ducrition, count) {
    let countDownTime;
    if(currentNum < count){
       // let countDownTime;
        let minutes, seconde;
        countDownInterval = setInterval(function (){
                minutes = parseInt(ducrition / 60);
                seconde = parseInt(ducrition % 60); 
                minutes = minutes < 10 ? `0 ${minutes}` : minutes ;
                seconde = seconde < 10 ? `0 ${seconde}` : seconde ;
            countDownEle.innerHTML = `${minutes} : ${seconde}`;
            if(--ducrition < 0){
                clearInterval(countDownInterval);
                btn.click();
            }
            },1000);    
    }
};
function btnOnload() {
    let div = document.createElement('div');
    let button = document.createElement('button');
    button.setAttribute('class','btn');
    button.innerHTML = 'Play Again';
    button.onclick = () =>{
        location.reload();
    };
    div.appendChild(button);
    QuizApp.appendChild(div);
};

function numFalse() {
    //console.log(answersFalse);
   // let mainDivNumAnswersFalse = document.createElement('div');
        let mainDivAnswers = document.createElement('div');
       
        let numCurrect = document.createElement('span');
        numCurrect.innerHTML = `Currect Answers is ${rightAnswers}`;
       
        let numInCurrect = document.createElement('span');
        numInCurrect.innerHTML = ` And False Answers is ${answersFalse} of ${currentNum}`;
mainDivAnswers.appendChild(numCurrect);
mainDivAnswers.appendChild(numInCurrect);

QuizApp.appendChild(mainDivAnswers);

};
