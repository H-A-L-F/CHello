import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import WorkspacePage from '../pages/WorkspacePage';
import BoardPage from '../pages/BoardPage';

function MainLayout() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="ml-16 my-8 w-[100%] justify-center">
        <Routes>
          <Route path="home" element={<Home />}/>
          <Route path="workspace" element={<WorkspacePage />}/>
          <Route path="workspace/:id" element={<BoardPage />}/>
        </Routes>
      </div>
    </div>
  );
}

export default MainLayout;