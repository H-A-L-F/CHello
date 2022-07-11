import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import InviteLinkPage from "./application/components/InviteLinkPage";
import MainLayout from "./application/views/MainLayout";
import { UserAuthContextProvider, useUserAuth } from "./AuthContext";
import "./index.css";
// import MainLayout from "./views/layout/MainLayout";
import AcceptInvitePage from "./views/pages/AcceptInvitePage";
import CopyLinkPage from "./views/pages/CopyLinkPage";
import Login from "./views/pages/Login";
import Register from "./views/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/main/*" element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }/>
          <Route path="/invite/*" element={
            <RequireAuth>
              <Routes>
                <Route path='page/workspace/:path' element={<CopyLinkPage type={"workspace"}/>} />
                <Route path='page/board/:path' element={<CopyLinkPage type={"board"}/>} />
                <Route path='join/:path' element={<AcceptInvitePage />} />
                <Route path='workspace/copylink/:id' element={<InviteLinkPage type={"workspace"}/>} />
                <Route path='board/copylink/:id' element={<InviteLinkPage type={"board"}/>} />
              </Routes>
            </RequireAuth>
          }/>
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

function RequireAuth({ children }) {
  let { user } = useUserAuth();
  let location = useLocation();

  // console.log("gege")
  // console.log(user)
  // console.log(JSON.parse(window.localStorage.getItem('user')))
  // console.log("gege")

  if (!user && !JSON.parse(window.localStorage.getItem('user'))) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
