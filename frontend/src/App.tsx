import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import BasketProvider from './context/BasketContext';

function App() {
  return (
    <BasketProvider>
      <Router>
        <AppRoutes />
      </Router>
    </BasketProvider>
  );
}

export default App;
