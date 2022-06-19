import SideBar from '../components/SideBar';
import Home from '../pages/Home'

function MainLayout() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="ml-16 my-8 w-[100%] justify-center">
        <Home />
      </div>
    </div>
  );
}

export default MainLayout;