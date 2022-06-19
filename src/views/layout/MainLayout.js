import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import WorkspacePage from '../pages/WorkspacePage';
import BoardPage from '../pages/BoardPage';
import ListPage from '../pages/ListPage';

function MainLayout() {
  return (
    <div className="flex flex-row">
      <div className="ml-16 my-8 w-[100%] justify-center">
        <Routes>
          <Route path="home" element={<Home />}/>
          <Route path="workspace" element={<WorkspacePage />}/>
          <Route path="workspace/:id" element={<BoardPage />}/>
          <Route path="board/:id" element={<ListPage />} />
        </Routes>
      </div>
      <SideBar />
    </div>
  );
}

export default MainLayout;