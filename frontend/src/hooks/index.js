import React from "react";

import { AuthProvider } from "./auth";
import { ProjectsProvider } from "./projects";
// import { ProjectsManagementProvider } from './projectsManagement';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProjectsProvider>
        {children}
      </ProjectsProvider>
    </AuthProvider >
  );
};

export default AppProvider;