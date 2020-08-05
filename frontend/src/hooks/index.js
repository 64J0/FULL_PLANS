import React from 'react';

import { AuthProvider } from './auth';
import { ProjectsProvider } from './projects';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProjectsProvider>
        {children}
      </ProjectsProvider>
    </AuthProvider >
  );
}

export default AppProvider;