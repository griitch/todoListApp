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
    tasks.push(task);
    updateStorage();
  };

  const remove = (task) => {
    tasks = tasks.filter((e) => e.title != task.title);
    updateStorage();
};

  return { tasks, projectName, addTodo, remove  }
};

export const projectsContainer = ( () => {

    const projects = [];

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
