import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './AuthContext';
import './index.css';
import MainLayout from './views/layout/MainLayout';
import Register from './views/pages/Register';

function App() {
  return (
    // <MainLayout />
    <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<MainLayout />}/>
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
