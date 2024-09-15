import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

/* 
  A taskok külön state-be is mentodhetnenek, 
  akar meg kulon komponens, pl tasks componens state-jeben,
  csak kapjanak egy projectId-t, amivel osszakapcsolhato a 2 adattomb,
  a projects es a tasks 
*/

const INIT_PROJECTS = [
  {
    name: "Learning React",
    tasks: [
      {
        name: "How to start a project",
      },
      {
        name: "Learn about class and funtion components",
      },
    ],
  },
  {
    name: "Mastering React",
    tasks: [
      {
        name: "Learn about hooks",
      },
    ],
  },
];

function App() {
  /* const [projects, setProjects] = useState(INIT_PROJECTS); */
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectData) => {
    const projectId = Math.random();

    const newProject = {
      ...projectData,
      id: projectId,
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleSelectProject = (projectId) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  };

  const handleDeleteProject = () => {
    /* const newProjects = projectsState.projects.filter((project) => project.id !== projectsState.selectedProjectId); */
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: /* newProjects */ prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  const handleAddTask = (text) => {
    const taskId = Math.random();
    const projectId = projectsState.selectedProjectId;

    const newTask = {
      id: taskId,
      projectId: projectId,
      text: text,
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  };

  const handleDeleteTask = (taskId) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== taskId
        ),
      };
    });
  };

  let content;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );
    const selectedProjectTasks = projectsState.tasks.filter((task) => task.projectId === selectedProject.id);
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={selectedProjectTasks}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
