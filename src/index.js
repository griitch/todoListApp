import * as domStuff from "./domstuff.js";
import { isToday , isThisWeek, isPast } from "date-fns";
import * as todoStuff from "./todoStuff";
import "./style.css";

let currentProject = "defaultProject";

domStuff.renderAproject(currentProject); //load the tasks for the default project 

document.querySelector(".modal-footer button").addEventListener("click", handleTodoFormInput);

document.querySelector("#saveProjectForm").addEventListener("click", handleProjectFormInput);

document.querySelector("select").addEventListener("input",(e)=> {
        domStuff.toggleRemoveProjectDisabled(e.target.value);
        currentProject = e.target.value;
        domStuff.emptyTodosContainer(); 
        domStuff.renderAproject(currentProject);
});

document.querySelector("#all")
    .addEventListener("click",
    () => {
            domStuff.emptyTodosContainer();
         domStuff.renderAproject(currentProject); } );

document.querySelector("#today").addEventListener("click", renderTodayTodos);

document.querySelector("#week").addEventListener("click", renderThisWeekTodos);

document.querySelector("#overdue").addEventListener("click", renderOverdueTodos);

  
(() =>{ for(let i = 0 ; i < localStorage.length ; i++)
    {
        if(localStorage.key(i) == "defaultProject") 
        continue;
        domStuff.addProjectOption  (localStorage.key(i)); 
    }
    })();

function handleTodoFormInput() {
    let newTodo = domStuff.validateTodoFormInput();
    if( newTodo ){

        if(!todoStuff.addTodo(currentProject,newTodo))
        {
            domStuff.displayAddingEventExists();
            return;
        }
        if(document.querySelector(".toolbaritemActive").id == "all"){
            domStuff.renderTodo(newTodo);
        }
        domStuff.sanitizeTodoFormInput();
        domStuff.displaySuccessAddingEvent();

    }
}

function handleProjectFormInput(){

    if(!domStuff.projectFormInput.value)
    {
       document.querySelector("#projectFormEmpty").classList.remove("displaynoneclass");
       document.querySelector("#projectFormSuccess").innerHTML = "";

        return;
    }

    if( localStorage.getItem(domStuff.projectFormInput.value)){
        document.querySelector("#projectFormExists").classList.remove("displaynoneclass");
        document.querySelector("#projectFormSuccess").innerHTML = "";
        return;    
    }
        todoStuff.projectFactory(domStuff.projectFormInput.value);

        domStuff.addProjectOption(domStuff.projectFormInput.value);
        domStuff.displaySuccessAddingProject();
        
}

function renderTodayTodos(){
    if( ! localStorage.getItem(currentProject))
        return;
    
    domStuff.emptyTodosContainer(); 
    let arr, date;
    for (let e of JSON.parse(localStorage.getItem(currentProject)).tasks )
    {
        arr = e.dueDate.split("-");
        arr[1] = arr[1] - 1;
        date = new Date(...arr);
        if(isToday(date))   
            domStuff.renderTodo(e);
    }
}

function renderThisWeekTodos(){
    if( ! localStorage.getItem(currentProject))
        return;
    
    domStuff.emptyTodosContainer(); 
    let arr, date;
    for (let e of JSON.parse(localStorage.getItem(currentProject)).tasks )
    {
        arr = e.dueDate.split("-");
        arr[1] = arr[1] - 1;
        date = new Date(...arr);
        if(isThisWeek(date))   
            domStuff.renderTodo(e);
    
    }
}

function renderOverdueTodos(){
    if( ! localStorage.getItem(currentProject))
        return;

    domStuff.emptyTodosContainer(); 
    let arr, date;
    for (let e of JSON.parse(localStorage.getItem(currentProject)).tasks )
    {
        arr = e.dueDate.split("-");
        arr[1] = arr[1] - 1;
        date = new Date(...arr);
        if(isPast(date) && !isToday(date) && !e.isComplete)  
            domStuff.renderTodo(e);
 
         
    }
}





// have a global variable that indicates the current selected project
// need to implement the logic and done

//this index js file will be cool as hell, it will just be using the API of the 2 other files

// let d = new Date(2021,7,14) // y - m - d, months start with index 0  
// let c = format(d, 'MM dd yyyy');

// console.log(formatDistanceToNowStrict(d));
// console.log(c);
