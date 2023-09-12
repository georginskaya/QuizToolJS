
// grabbing the elements 
const btn = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quizcontainer = document.getElementById("quiz-container");
const resultElement = document.getElementById("result");
const ImgGameOver = document.getElementById("imgGameOver")
let answeredIncorrectly = false;




let rightAnswer =""
let countryData= null;
let score =0;
let scoreRight =0;
let scoreWrong =0;


// fetching data from api
async function fetchCountryData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Failed to fetch country data');
    }
    countryData = await response.json();
    return  countryData ;
  } catch (error) {
    console.error('Error fetching country data:', error);
  }

}
// generating a question

function getRandomQuestion (){
    let country = null;
   
    if (countryData) {
    let randomIndex = Math.floor(Math.random() *  countryData.length);
    country =  countryData[randomIndex];
    console.log(country); }
    else{ console.log("Something is wrong..:(")}

    // assign a question type
        questionType = Math.random() > 0.5 ? 'capital' : 'flag';
        console.log(questionType);
    return {
        questionType,
        country,
    };
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; 
}


async function nextQuestionHandler(){
  score++
  btn.style.display ="none"
  ImgGameOver.style.display="none"
  answeredIncorrectly = false;
  btn.innerText = "Next"

 const countryData = await fetchCountryData();
  const { questionType, country } = getRandomQuestion(countryData);

    if (questionType === 'capital') {
        const optionsCorrect = [country.capital[0]];
        rightAnswer = [country.capital[0]];
        let optionsArr =[optionsCorrect];
       
       while (optionsArr.length < 4 ) {
        let randomIndex = Math.floor(Math.random() *  countryData.length);
        let randomCountryCapital= countryData[randomIndex].capital[0]; 

         if (!optionsArr.includes(randomCountryCapital) && randomCountryCapital !== optionsCorrect) {
                optionsArr.push(randomCountryCapital);
            }

    
        }

       optionsArr = shuffleArray(optionsArr);

        questionElement.innerHTML = `<img class ="quiz-img" src="/Users/love/Desktop/myleaf/QuizToolJS/imgs/undraw_adventure_4hum 1.svg"/> What is the capital of ${country.name.common}?`
        optionsElement.innerHTML = optionsArr.map(option => `<button>${option}</button>`).join('');
    }
    else  if (questionType === 'flag') {

        const optionsCorrect = [country.name.common];
        rightAnswer = [country.name.common]
        const optionsArr =[optionsCorrect];
       
       while (optionsArr.length < 4 ) {
        let randomIndex = Math.floor(Math.random() *  countryData.length);
        let randomCountry= countryData[randomIndex].name.common; 

         if (!optionsArr.includes(randomCountry) && randomCountry !== optionsCorrect) {
                optionsArr.push(randomCountry);
            }



           questionElement.innerHTML = `<img class ="quiz-img" src="/Users/love/Desktop/myleaf/QuizToolJS/imgs/undraw_adventure_4hum 1.svg"/> <span><img id="flag" src="${country.flags.png}" /></span><br> <div class ="question-text"> What country does this flag belong to? </div>`
           optionsElement.innerHTML = optionsArr.map(option => `<button>${option}</button>`).join('');
    }

} 

}



function checkAnswer (event) {
   if (answeredIncorrectly) {
    return; 
  }


  let right = rightAnswer.toString();
  
console.log(score)

    if (event.target.textContent !== right) {
       event.target.style.backgroundColor = `rgb(230, 100, 100)`;
       scoreWrong ++
       btn.style.display ="block"
       answeredIncorrectly = true;
        
    } else if ( event.target.textContent == right) {
    event.target.style.backgroundColor = `#6fcf97`;
    btn.style.display ="block"
    scoreRight ++
   
  
  }

  
    if (score >= 5) {

         
        questionElement.innerHTML = ``;
          optionsElement.innerHTML = `Game over! <br> <span class="resultsWord">Results:</span> <br> You have <span class="rightWord">${scoreRight}</span> right and <span class="wrongWord">${scoreWrong}</span> wrong answers`
          btn.innerText = "Try Again"
          btn.style.marginLeft="34%"
          btn.style.marginTop="30px"
          optionsElement.style.display ="block"
          optionsElement.style.textAlign="center"
          btn.style.display ="block"
          ImgGameOver.style.display="block"
          score =0;
          scoreRight =0;
          scoreWrong =0;
         

    }

}

btn.addEventListener('click', nextQuestionHandler);
optionsElement.addEventListener('click', checkAnswer);
window.addEventListener('load', nextQuestionHandler)

fetchCountryData();


