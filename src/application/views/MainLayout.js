// import SideBar from '../components/SideBar';
import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../application/components/HomePage';
import WorkspacePage from '../components/WorkspacePage';
import BoardPage from '../components/BoardPage';
import ProfilePage from '../components/ProfilePage';
import KanbanPage from '../components/KanbanPage';
import ClosedBoardPage from '../components/ClosedBoardPage';
import ModifyClosedBoardPage from '../components/ModifyClosedBoardPage';

function MainLayout() {
  return (
    <div className="flex flex-row">
      <div className="ml-16 my-8 w-[100%] justify-center">
        <Routes>
          <Route path="home" element={<HomePage />}/>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="workspace/:id" element={<WorkspacePage />}/>
          <Route path='board/:id' element={<BoardPage />}/>
          <Route path='closed/board' element={<ClosedBoardPage />} />
          <Route path='closed/board/:id' element={<ModifyClosedBoardPage />} />
          {/* <Route path='board/:id' element={<KanbanPage />}/> */}
        </Routes>
      </div>
      <SideBar />
    </div>
  );
}

export default MainLayout;