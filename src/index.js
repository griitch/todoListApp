//import * as todoStuff from "./todos.js";
import * as todoStuff from "./todosbis.js";
import * as domStuff from "./domstuff.js";
//import { format,formatDistanceToNowStrict  } from 'date-fns';

let currentProject = "defaultProject";

document
  .querySelector(".modal-footer button")
  .addEventListener("click", handleTodoFormInput);

document
    .querySelector("#saveProjectForm")
    .addEventListener("click", () => {
    handleProjectFormInput();
});

document
    .querySelector("select")
    .addEventListener("input",(e)=> {
        domStuff.toggleRemoveProjectDisabled(e.target.value);
        currentProject = e.target.value;
        domStuff.emptyTodosContainer(); 
        renderAproject(currentProject);
});

  
(() =>{ for(let i = 0 ; i < localStorage.length ; i++)
    {
        if(localStorage.key(i) == "defaultProject") 
        continue;
        domStuff.addProjectOption  (localStorage.key(i)) 
    }
    })();



export function renderAproject(projectname){
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
        domStuff.renderTodo(newTodo);
        domStuff.sanitizeTodoFormInput();

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
        document.querySelector("#projectFormSuccess").innerHTML = `<div class="alert alert-success alert-dismissible fade show mt-1 mb-0" role="alert"> Project added to the list.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`   
}








// have a global variable that indicates the current selected project
// need to implement the logic and done

//this index js file will be cool as hell, it will just be using the API of the 2 other files

// let d = new Date(2021,7,14) // y - m - d, months start with index 0  
// let c = format(d, 'MM dd yyyy');

// console.log(formatDistanceToNowStrict(d));
// console.log(c);
