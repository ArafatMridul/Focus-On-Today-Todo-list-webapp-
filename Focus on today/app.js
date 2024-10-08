const inputFields = document.querySelectorAll("input[type='text']");
const radioBtns = document.querySelectorAll(".radio-btn");
const errorLabel = document.querySelector(".error-label");
const goalsSection = document.querySelector(".goals-section");
const barValue = document.querySelector(".bar-value");
const goalsCompletedText = document.querySelector(".number-of-goal-completed");
const comment = document.querySelector(".progress-bar p");

let goalQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done.',
    'Just a step away. Keep going!',
    'All goals completed. Time to chill!!'
]

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoals = Object.values(allGoals).filter((goals) => goals.completed).length;
barValue.style.width = `${(completedGoals / inputFields.length) * 100}%`;
goalsCompletedText.innerText = `${completedGoals}/${inputFields.length} completed`;
comment.innerText = goalQuotes[completedGoals];

radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener("click", () => {
        const inputFilled = [...inputFields].every((e) => {
            return e.value;
        })
        if(inputFilled) {
            radioBtn.parentElement.classList.toggle("completed");
            const className = radioBtn.nextElementSibling.className;
            allGoals[className].completed = !allGoals[className].completed;
            completedGoals = Object.values(allGoals).filter((goals) => goals.completed).length;
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
            barValue.style.width = `${(completedGoals/inputFields.length) * 100}%`;
            goalsCompletedText.innerText = `${completedGoals}/${inputFields.length} completed`;
            comment.innerText = goalQuotes[completedGoals];

        } else {
            goalsSection.classList.add("error");
        }
    })
})

inputFields.forEach((e) => {
    if(allGoals[e.className]) {
        e.value = allGoals[e.className].task;
        if(allGoals[e.className].completed === true) {
            e.parentElement.classList.add("completed");
        }
    }


    e.addEventListener("focus", () => {
        goalsSection.classList.remove("error");
    })

    e.addEventListener("input", (input) => {
        if(allGoals[e.classList] && allGoals[e.className].completed === true) {
            input.target.value = allGoals[e.className].task;
            return;
        }
        if(allGoals[e.className]) {
            allGoals[e.className] = {
                task: input.target.value,
                completed: false,
            }
        } else {
            allGoals[e.className] = {
                task: "",
                completed: false,
            };
        }

        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    })
})

