import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import { AuthProvider } from './Context/authProvider.jsx';
import { UserProvider } from './Context/UserProvider.jsx';
import SocketConnectionProvider from './Context/socketConnection.jsx';
import { MessageProvider } from './Context/messageProvider.jsx';
import { GetMessageProvider } from './Context/getMessage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>

        <MessageProvider> {/* MessageProvider ko pehle wrap karein */}
          <GetMessageProvider>
          <SocketConnectionProvider> {/* Phir SocketConnectionProvider ko wrap karein */}
            <App />
          </SocketConnectionProvider>
          </GetMessageProvider>
        </MessageProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
