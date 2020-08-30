const ProjectsArray = require("./ProjectsArray");

exports.listProjects = () => {
  return ProjectsArray;
};

exports.createProject = (data) => {
  const newID = String(ProjectsArray.length + 1);
  Object.assign(data, { _id: newID });
  ProjectsArray.push(data);
  return [ProjectsArray, data];
};

exports.updateProject = (id, data) => {
  const updatedData = { ...data };
  const updatedProject = ProjectsArray.find(thisProject => thisProject._id === id);

  if (!updatedProject) {
    throw new Error();
  }

  Object.assign(updatedProject, updatedData);
  return updatedProject;
};

exports.deleteProject = (id) => {
  const filteredProjectsArray = ProjectsArray.filter((thisProject) => thisProject._id !== id);

  return filteredProjectsArray;
};

exports.findProjectById = (id) => {
  const foundProject = ProjectsArray.find(thisProject => thisProject._id === id);

  return foundProject;
}