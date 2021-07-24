//let d = new Date(...document.querySelector("#dueDateOftheTask").value.split('-'))


//import { dummytask, todoFactory } from "./todos.js";
import { todoFactory , removeTask , changeTaskCompletion, removeProject } from "./todosbis.js";
import {renderAproject } from './index.js'

const addProjectForm = document.querySelector("#addProjectForm");

const addTasksform = document.forms.addTask;

const removeProjectBtn = document.querySelector("#removeProject");

export const projectFormInput = document.querySelector("#projectFormInput");

const todosContainer = document.querySelector("#todosContainer");

const addingTaskError = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
Insert all elements !!
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

const addingTaskExists = `<div class="alert alert-danger alert-dismissible fade show" role="alert">A task with this name
already exists !
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

const addingTaskSuccess = `<div class="alert alert-success alert-dismissible fade show" role="alert"> The todo has been saved
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

const addTaskMessage = document.querySelector("#addTaskMessage");

removeProjectBtn.addEventListener("click", removeProjectFromDom )

document.querySelector("#addProject").addEventListener("click", () => {
  addProjectForm.classList.remove("displaynoneclass");
});


document.querySelector("#discardProjectForm").addEventListener("click", () => {
  addProjectForm.classList.add("displaynoneclass");
  document.querySelectorAll(".projectFormErr").forEach(e => 
    e.classList.add("displaynoneclass"))
});


export function validateTodoFormInput() {
  for (let i = 0; i < 3; i++) {
    if (!addTasksform.elements[i].value) {
      displayErrorAddingEvent();  
      return false;
    }
  }
  let name = addTasksform.elements[0].value
  let dueDate =addTasksform.elements[1].value
  let desc =addTasksform.elements[2].value
  let newTodo = todoFactory(name, desc, dueDate);
  return newTodo;
}

export function sanitizeTodoFormInput() {
  for (let i = 0; i < 3; i++) addTasksform.elements[i].value = "";

  displaySuccessAddingEvent();
}

function displayErrorAddingEvent() {
  addTaskMessage.innerHTML = addingTaskError;
}

export function displayAddingEventExists() {
  addTaskMessage.innerHTML = addingTaskExists;
}

function displaySuccessAddingEvent() {
  addTaskMessage.innerHTML = addingTaskSuccess;
}

export function addProjectOption(e) {
  let option = document.createElement("option");
  option.setAttribute("value",e);
  option.innerText = e;  
  option.setAttribute("data-taskname", e) 
  document.querySelector("#projectFormEmpty").classList.add("displaynoneclass");
  document.querySelector("#projectFormExists").classList.add("displaynoneclass");
  document.querySelector("select").appendChild(option);
  projectFormInput.value = "";    
  
}

export function renderTodo(todo) {
/*  
    will later implement some logic to mark the overdue tasks
    if the day is today, write today instead of the yyyy-mm-dd stuff
*/

  let completionStatus = todo.isComplete  == true ? "complete" : "incomplete";
  let markAs = todo.isComplete  == true  ? "incomplete" : "complete" ;
  let validTaskName = todo.title.replaceAll(/[ ']/g, "_");

  let accordionItem = document.createElement("div");
  accordionItem.setAttribute("class", "accordion-item");
  accordionItem.innerHTML = `
<h2 class="accordion-header" data-taskName="${todo.title}"  >
    <button class="accordion-button collapsed" type="button"
    data-bs-toggle="collapse" data-bs-target="#${validTaskName}">
    ${todo.title}. Due : ${todo.dueDate}. <span class="${completionStatus}"> ( ${completionStatus} )</span>
    </button>
</h2>

<div id="${validTaskName}" class="accordion-collapse collapse" 
data-bs-parent="#todosContainer">
<div class="accordion-body">
    ${todo.description}
    <br>
    <button type="button"  data-taskName="${todo.title}" class="btn-lg mx-auto my-3 btn-danger">Remove</button>
    <button type="button" data-taskName="${todo.title}" class="btn-lg mx-auto my-3 btn-success">Mark as ${markAs}</button>
    </div>
    </div>
    `;
    
    todosContainer.appendChild(accordionItem);  
    document.querySelectorAll(`button[data-taskname='${todo.title}']`)[0].addEventListener("click",removeTodoFromDom);
    document.querySelectorAll(`button[data-taskname='${todo.title}']`)[1].addEventListener("click",toggleCompleteStatus);


}

export function emptyTodosContainer() {
  todosContainer.innerHTML = "";
}

export function toggleRemoveProjectDisabled(e) {
removeProjectBtn.disabled = e == "defaultProject" ? true : false ;
}

export function removeProjectFromDom( e ){

  let projname = document.querySelector("select").value;
  let option = document.querySelector(`option[data-taskname="${projname}"]`);
  option.remove();
  removeProject(projname);
  toggleRemoveProjectDisabled(document.querySelector("select").value)
  emptyTodosContainer();
  renderAproject(document.querySelector("select").value);
}

function removeTodoFromDom(task){
  task.target.parentElement.parentElement.parentElement.remove();
  let taskname = task.target.getAttribute("data-taskname");
  let projname = document.querySelector("select").value;
  removeTask(projname,taskname);
}

function toggleCompleteStatus(task){

  let taskname = task.target.getAttribute("data-taskname");
  let span = document.querySelector(`h2[data-taskname="${taskname}"] span`)
  span.classList.toggle("incomplete");
  span.classList.toggle("complete");
  let status = span.getAttribute("class") == "complete" ? "complete" : "incomplete";
  span.innerText = ` ( ${status} )`;
  task.target.innerText = status == "complete" ? "Mark as incomplete " : "Mark as complete";
  let projname = document.querySelector("select").value;
  changeTaskCompletion(projname,taskname); 
}

//dummytask.completeTask()
//  renderTodo(dummytask);
//let d = new Date(...document.querySelector("#dueDateOftheTask").value.split('-'))

