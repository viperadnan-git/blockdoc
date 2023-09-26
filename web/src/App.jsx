import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import { Auth } from "../components/Auth";
import { Def } from "../components/Def";
import Navbar from "../components/Navbar";
import "./index.css";
import Sidebar from "../components/SideBar";
import { MainS } from "../components/SubComponents/mainMenu";
import { Drive } from "../components/SubComponents/Drive";
import { Documents } from "../components/SubComponents/Documents";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Def />} />
          <Route path='/Auth' element={<Auth />} />
          <Route path='/Home' element={<Sidebar />}>
            <Route path='' element={<MainS />} />
            <Route path='Drive' element={<Drive />} />
            <Route path='Documents' element={<Documents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
