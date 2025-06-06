let timerEle = document.getElementById("timer");
let quoteDisplayEle = document.getElementById("quoteDisplay");
let quoteInputEle = document.getElementById("quoteInput");
let resultEle = document.getElementById("result");
let submitBtnEle = document.getElementById("submitBtn");
let resetBtnEle = document.getElementById("resetBtn");
let spinnerEle = document.getElementById("spinner");
let popupImageEle=document.getElementById("popupImage");
let nextBtnEle=document.getElementById("nextEle");
let footerBtnEle=document.getElementById("footerBtn");
let footerBtn1Ele=document.getElementById("footerBtn1");



let options = {
    method: "GET"
};
let url = "https://apis.ccbp.in/random-quote";


let secondsCount = 0;
let uniqueId;

function startTimer() {
    secondsCount = 60;
    timerEle.textContent = secondsCount +" seconds left";
    uniqueId = setInterval(() => {
        secondsCount -= 1;
        if(secondsCount===-1){
            clearInterval(uniqueId);
            showPopup();        }
        else{
            timerEle.textContent = secondsCount+" seconds left";
        }
        
    }, 1000);
}

function showPopup(){
    const tryAgain = confirm("Time is up! Would you like to try again?");
    location.reload();
}

function endTimer() {
    clearInterval(uniqueId);
}

function getRandomQuotes() {
    spinnerEle.classList.remove("d-none");
    return fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEle.classList.add("d-none");
            document.getElementById("speedTypingTestlevel1").classList.remove("d-none");
            quoteDisplayEle.textContent = jsonData.content;
            startTimer();
        });
}
getRandomQuotes();
console.log(quoteDisplayEle.textContent);
submitBtnEle.addEventListener("click", function(){
    endTimer();
    if (quoteDisplayEle.textContent === quoteInputEle.value) {
        popupImageEle.src="https://img.freepik.com/free-vector/congratulations-sign-with-girl-graduation-gown_1308-2986.jpg?t=st=1732850990~exp=1732854590~hmac=aa5b29176c0fcf2b1835e4cdd55f02705220dbea9c371a1cd789ce6eab838b1c&w=740";
        resultEle.textContent = "Level 1 completed"; 
        footerBtn1Ele.style.display="block";
        footerBtnEle.style.display="none";
        
    } else {
        popupImageEle.src="https://static.vecteezy.com/system/resources/previews/023/891/661/non_2x/try-again-button-speech-bubble-banner-label-try-again-vector.jpg";
        resultEle.textContent = "You typed incorrect Sentense";
        footerBtnEle.style.display="block";
        footerBtn1Ele.style.display="none";
    }
})

resetBtnEle.onclick = function() {
    resultEle.textContent = "";
    endTimer();
    secondsCount = 60;
    timerEle.textContent = secondsCount;
    getRandomQuotes();
    quoteInputEle.value = "";
};