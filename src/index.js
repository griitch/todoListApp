import * as todoStuff from "./todosbis.js";
import * as domStuff from "./domstuff.js";
import { isToday , isThisWeek, isPast , format, isTomorrow   } from 'date-fns';

let currentProject = "defaultProject";

document
  .querySelector(".modal-footer button")
  .addEventListener("click", handleTodoFormInput);

document
    .querySelector("#saveProjectForm")
    .addEventListener("click", handleProjectFormInput);

document
    .querySelector("select")
    .addEventListener("input",(e)=> {
        domStuff.toggleRemoveProjectDisabled(e.target.value);
        currentProject = e.target.value;
        domStuff.emptyTodosContainer(); 
        renderAproject(currentProject);
});

document
    .querySelector("#all")
    .addEventListener("click",
    () => {
            domStuff.emptyTodosContainer();
         renderAproject(currentProject) } );

document
    .querySelector("#today")
    .addEventListener("click", renderTodayTodos);

document
    .querySelector("#week")
    .addEventListener("click", renderThisWeekTodos);

document
    .querySelector("#overdue")
    .addEventListener("click", renderOverdueTodos);

  
(() =>{ for(let i = 0 ; i < localStorage.length ; i++)
    {
        if(localStorage.key(i) == "defaultProject") 
        continue;
        domStuff.addProjectOption  (localStorage.key(i)) 
    }
    })();



export function renderAproject(projectname) {
    if(!localStorage.getItem(projectname))
    return;
   for (let e of JSON.parse(localStorage.getItem(projectname)).tasks )
        domStuff.renderTodo(e);
}

renderAproject(currentProject); //load the tasks for the default project 



function handleTodoFormInput() {
    let newTodo = domStuff.validateTodoFormInput()
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

export function whenIsDue( d , isitcomplete){
   
   let arr = d.split('-');
   arr[1] = arr[1] - 1; //decrement op wont work if arr[1] is a string
   let date = new Date(...arr)
    if(isToday(date))    
        return "Due today";
    else if(isPast(date) && !isitcomplete )
        return " ( Overdue ! ) Due : " + format(date,"EE M/dd/yyyy");
    else if(isTomorrow(date) )
        return "Due tomorrow";
    else
    return "Due : " + format(date,"EE M/dd/yyyy");
        
}

function renderTodayTodos(){
    if( ! localStorage.getItem(currentProject))
    {
        return;
    }
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
