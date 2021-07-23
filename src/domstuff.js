//let d = new Date(...document.querySelector("#dueDateOftheTask").value.split('-'))


import { dummytask, todoFactory } from "./todos.js";
const addProjectForm = document.querySelector("#addProjectForm");

const addTasksform = document.forms.addTask;

const removeProjectBtn = document.querySelector("#removeProject");

const projectFormEmpty = document.querySelector("#projectFormEmpty");

const projectFormInput = document.querySelector("#projectFormInput");

const todosContainer = document.querySelector("#todosContainer");

const addingTaskError = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Insert all elements !!
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

const addingTaskSuccess = `<div class="alert alert-success alert-dismissible fade show" role="alert"> The todo has been saved
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

const addTaskMessage = document.querySelector("#addTaskMessage");

document.querySelector("#addProject").addEventListener("click", () => {
  addProjectForm.classList.remove("displaynoneclass");
});

document.querySelector("#saveProjectForm").addEventListener("click", () => {
    validateProjectFormInput();
  });


document.querySelector("#discardProjectForm").addEventListener("click", () => {
  addProjectForm.classList.add("displaynoneclass");
});

document
  .querySelector(".modal-footer button")
  .addEventListener("click", validateTodoFormInput);

function validateTodoFormInput() {
  for (let i = 0; i < 3; i++) {
    if (!addTasksform.elements[i].value) {
      displayErrorAddingEvent();  
      return false;
    }
  }
  // let name = addTasksform.elements[0].value
  // let dueDate =addTasksform.elements[1].value
  // let desc =addTasksform.elements[2].value
  // let newTodo = todoFactory(name, desc, dueDate);
  // renderTodo(newTodo);
  sanitizeTodoFormInput();
  return true;
}

function sanitizeTodoFormInput() {
  for (let i = 0; i < 3; i++) addTasksform.elements[i].value = "";

  displaySuccessAddingEvent();
}

function displayErrorAddingEvent() {
  addTaskMessage.innerHTML = addingTaskError;
}

function displaySuccessAddingEvent() {
  addTaskMessage.innerHTML = addingTaskSuccess;
}

//let d = new Date(...document.querySelector("#dueDateOftheTask").value.split('-'))
function validateProjectFormInput(){
    if(!projectFormInput.value)
    {
        projectFormEmpty.classList.remove("displaynoneclass");
        return;
    }
    //if(projects array contains projectFormInput.value)
    //document.querySelector("#projectFormExists").classList.remove("displaynoneclass");

    //function call to add the project to the projects array
    let option = document.createElement("option");
    option.setAttribute("value",projectFormInput.value);
    option.innerText = projectFormInput.value;
    projectFormEmpty.classList.add("displaynoneclass");
    // same for the other error
    document.querySelector("select").appendChild(option);
    projectFormInput.value = "";    
}

export function renderTodo(todo) {
/*  
    will later implement some logic to mark the overdue tasks
    if the day is today, write today instead of the yyyy-mm-dd stuff
*/

  let completionStatus = todo.isComplete() ? "complete" : "incomplete";
  let markAs = completionStatus == "complete" ? "incomplete" : completionStatus;
  let validTaskName = todo.title.replaceAll(/[ ']/g, "_");

  let accordionItem = document.createElement("div");
  accordionItem.setAttribute("class", "accordion-item");
  accordionItem.innerHTML = `
<h2 class="accordion-header" id="dont need for now">
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
}

export function emptyTodosContainer() {
  todosContainer.innerHTML = "";
}

export function toggleRemoveProjectDisabled() {
removeProjectBtn.disabled = !removeProjectBtn.disabled;
}


dummytask.completeTask()
renderTodo(dummytask);
