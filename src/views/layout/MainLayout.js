import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import WorkspacePage from '../pages/WorkspacePage';
import BoardPage from '../pages/BoardPage';
import ListPage from '../pages/ListPage';
import KanbanPage from '../components/KanbanPage';
import CopyLinkPage from '../pages/CopyLinkPage';

function MainLayout() {
  return (
    <div className="flex flex-row">
      <div className="ml-16 my-8 w-[100%] justify-center">
        <Routes>
          <Route path="home" element={<Home />}/>
          <Route path="workspace" element={<WorkspacePage />}/>
          <Route path="workspace/:path" element={<BoardPage />}/>
          <Route path="board/:path" element={<KanbanPage />} />
        </Routes>
      </div>
      <SideBar />
    </div>
  );
}

export default MainLayout;