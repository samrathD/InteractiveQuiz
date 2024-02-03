let previous = document.querySelector("#previous");
let next = document.querySelector("#next");

let submit = document.querySelector("#submit");

let questions = document.querySelectorAll(".questions");

let selections1 = document.getElementsByName("question1");
let selections2 = document.getElementsByName("question2");
let selections3 = document.getElementsByName("question3");
let selections4 = document.getElementsByName("question4");
let selections5 = document.getElementsByName("question5");


//storing all the answers in an array
let answers = ["HTML","Cache","Program","Executing","7"];
let score = 0;

//A function to compare user selected answers with actual answers
let checkAnswer = (selectionSet,num)=>{
    
    for( let selection of selectionSet){
        //Changing the selection type useful to display righ and wrong answer
         selection.type = "checkbox";
         if(selection.checked){
            //If the user's answer is correct update the score and change color to green
            if(selection.value == answers[num]){
                score+=5;
                selection.style.accentColor = "green";
                selection.style.transform = "scale(2)";
                selection.style.marginRight = "10px";
            }
            //Otherwise mark the user answer in a different color 
            else{
                selection.style.accentColor = "#FE5D26";
                selection.style.transform = "scale(2)";
                selection.style.marginRight = "10px";
            }
        }
        //Disable all the unselected options
        if(selection.checked == false){
            selection.disabled = true;
        }
        //Mark the right answers with green
        if(selection.value == answers[num]){
            selection.disabled = false;
            selection.style.accentColor = "green";
            selection.style.transform = "scale(2)";
            selection.style.marginRight = "10px";
            selection.checked = true;
        }  
    }
}


//A variable to keep track of what question to display
let clicked = 0;

//A function to update the question
let updateQuestion = ()=>{
    for(let question of questions){
        // question.computedStyleMap.display = "none";
        question.style.display = "none";
        question.style.transition = "all 2s";
    }
    questions[clicked].style.display = "block";
    questions[clicked].style.transition = "all 2s"
}
//Display the first question
updateQuestion();

//Go to previous question
previous.addEventListener("click",()=>{
    if(clicked<=0){
        return;
    }
    else{
        clicked--;
        updateQuestion();
    }
    
})

//Helper function that tells if an option is selected or not
function checkSelect(selectionSet){
    for(selection of selectionSet){
        if(selection.checked){
            //Deleting the message
            document.querySelector(`#noAns${clicked+1}`).style.display = "none";
            return true;
        }
    }
    return false;
}

//Go to next question
next.addEventListener("click",()=>{
    if(clicked>=4){
        return;
    }
    
    else{
        //Checking if user selected an option
        let selectionSet = document.getElementsByName(`question${clicked+1}`);

        if(checkSelect(selectionSet) == false){
            //Displaying the message to choose an option
            document.querySelector(`#noAns${clicked+1}`).style.display = "flex";
            return;
        }
        // next.disabled = false;
        clicked++;
        updateQuestion();
    }
}
)

let displayScore = document.querySelector("#score");
submit.addEventListener("click",(evt)=>{
    //prevent form reloading the page
    evt.preventDefault();
    //Check answers for each question
    checkAnswer(selections1,0);
    checkAnswer(selections2,1);
    checkAnswer(selections3,2);
    checkAnswer(selections4,3);
    checkAnswer(selections5,4);

    //Disable next,previous and submit buttons
    next.style.display = "none";
    previous.style.display = "none";
    submit.style.display = "none";
    //Display all the questions
    for(let question of questions){
        question.style.display = "block";
        question.style.transition = "all 2s";
    }
    
    //Display the score
    displayScore.style.display = "block";
    displayScore.innerText = `Score: ${score}/25`;
})

