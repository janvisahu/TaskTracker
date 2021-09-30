var count = 0;
var url = "newpopup.html";

const addBtn = document.querySelector(".inputfield button");
const dateBtn = document.getElementById("dateText");
const todoList = document.querySelector(".todoList");

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li><button class="btn" onclick="checkTask(${index}); this.disabled=true";><i class="glyphicon glyphicon-ok"></i></button>${element}<button class="btn" onclick="deleteTask(${index})"><i class="glyphicon glyphicon-trash"></i></button></li>`
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag

    document.getElementById("taskText").value = "";
    document.getElementById("dateText").value = "";
    document.getElementById("timeText").value = "";
}

addBtn.onclick = () => {
    var text = document.getElementById("taskText").value + " " + document.getElementById("dateText").value + " " + document.getElementById("timeText").value;
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    listArray.push(text); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string

    showTasks(); //calling showTask function
}
//once task added leave the input field blank
// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}
function checkTask(i) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    var text = listArray[i];
    listArray[i] = strikeThrough(text)
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();

}
function strikeThrough(text) {
    return text
        .split('')
        .map(char => char + '\u0336')
        .join('')
}
// $("#btnSeePopup").bind("click", function () {
//     window.location.href = url;
// });

dateBtn.onclick = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dateText").setAttribute("min", today);
};