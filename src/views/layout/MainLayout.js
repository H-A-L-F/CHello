import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import WorkspacePage from '../pages/WorkspacePage';
import BoardPage from '../pages/BoardPage';
import KanbanPage from '../components/KanbanPage';
import Boards from '../pages/Boards';

function MainLayout() {
  return (
    <div className="flex flex-row">
      <div className="ml-16 my-8 w-[100%] justify-center">
        <Routes>
          <Route path="home" element={<Home />}/>
          <Route path="workspace" element={<WorkspacePage />}/>
          <Route path="workspace/:path" element={<BoardPage />}/>
          <Route path="board/:path" element={<KanbanPage />} />
          <Route path='board' element={<Boards />} />
        </Routes>
      </div>
      <SideBar />
    </div>
  );
}

export default MainLayout;