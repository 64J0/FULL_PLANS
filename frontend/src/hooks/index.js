import React from 'react';

import { AuthProvider } from './auth';
import { ProjectsManagementProvider } from './projectsManagement';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProjectsManagementProvider>
        {children}
      </ProjectsManagementProvider>
    </AuthProvider >
  );
}

export default AppProvider;