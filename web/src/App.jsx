import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import UploadDocument from './components/UploadDocument';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* nested routes */}
        <Route path="/dash" element={<Dashboard/>}/>
          <Route path="/dash/upload" element={<UploadDocument/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;