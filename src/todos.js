export const todoFactory = (title, description, dueDate) => {
    let complete = false;

    const completeTask = () => { complete = !complete}

    const isComplete = () => { return complete };  

    return { title, description, dueDate, completeTask, isComplete }
};

export const projectFactory = (name) => {
  const tasks = [];
  
  const projectName = name;
  const addTodo = (task) => {
    
   for(let e of tasks){
       if(e.title == task.title)
        return false;
   }

    tasks.push(task);
    updateStorage();
    return true;
  };

  const remove = (task) => {
    tasks = tasks.filter((e) => e.title != task.title);
    updateStorage();
};

  return { tasks, projectName, addTodo, remove  }
};

export const projectsContainer = ( () => {

    const projects = ["defaultProject"];

    const addProject = ( proj )=>{
        projects.push(proj);
        updateStorage();
    }

    const removeProject = ( proj ) => {
        projects = projects.filter(
            e => e.name != proj.name
        );
        updateStorage();
    }

    return { projects, addProject, removeProject }
})();

function updateStorage(){
    localStorage.setItem("projectsContainer",JSON.stringify(projectsContainer) ); 
}


export let dummytask = todoFactory(
    "dummy todo",
`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Repellendus, eius iure officia laboriosam nesciunt deleniti earum 
fugit hic voluptas modi.`,
"07/15/2023"    
)

