import { isToday , isPast , format, isTomorrow   } from "date-fns";

export const todoFactory = (title, description, dueDate) => {
    
    let isComplete = false;
    return { title, description, dueDate, isComplete : isComplete };
};

export function toggleCompleteTask(task) {
    task.isComplete = !task.isComplete;
}

export function whenIsDue( d , isitcomplete){
   
    let arr = d.split("-");
    arr[1] = arr[1] - 1; //decrement op wont work if arr[1] is a string
    let date = new Date(...arr);
     if(isToday(date))    
         return "Due today";
     else if(isPast(date) && !isitcomplete )
         return " ( Overdue ! ) Due : " + format(date,"EE M/dd/yyyy");
     else if(isTomorrow(date) )
         return "Due tomorrow";
     else
     return "Due : " + format(date,"EE M/dd/yyyy");
         
 }

//------------------------------------------------------------------------------------------------


export const projectFactory = (name) => {
    const tasks = [];
    
    const projectName = name;
   
    localStorage.setItem(name, JSON.stringify({ tasks: tasks, projectName : projectName }) );

    return { tasks, projectName };
};


function getProject(name) {
    return localStorage.getItem( name ) ? JSON.parse(localStorage.getItem( name )) :
     projectFactory(name); 
}
  
export const addTodo = (projectname,  task) => {

    let project = getProject(projectname);

    for(let e of project.tasks   ){
        if(e.title == task.title)
            return false;
    }

    project.tasks.push(task);
    localStorage.setItem(projectname, JSON.stringify( project ));

    return true;
};

export function removeTask(projectname, taskname) {
    let project = getProject(projectname);
    project.tasks = project.tasks.filter((e) => e.title != taskname);
    localStorage.setItem(projectname, JSON.stringify( project ));
}

export function changeTaskCompletion(projectname, taskname ) {
    let project = getProject(projectname);
    for(let task of project.tasks ){
        if(task.title == taskname)
            task.isComplete = !task.isComplete;
    }

    localStorage.setItem(projectname, JSON.stringify( project ));

}


export function removeProject(projectname) {
    localStorage.removeItem(projectname);
}