import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserAuthContextProvider, useUserAuth } from "./AuthContext";
import "./index.css";
import MainLayout from "./views/layout/MainLayout";
import Register from "./views/pages/Register";

function requireUser(nextState, replace, next) {
  if (() => {
    const {user} = useUserAuth()
    return user
  }) {
    replace({
      pathname: "/register",
      state: { nextPathname: nextState.location.pathname },
    });
  }
  next();
}

function App() {

  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/main/*" element={<MainLayout />} onEnter={requireUser}/>
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
