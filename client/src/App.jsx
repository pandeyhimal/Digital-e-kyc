import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./dashboard/adminDashboard/AdminPanel";
import BankPortalRoot from "./dashboard/bankDashboard/Bank";

function App() {
  return (
   
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/bank" element={<BankPortalRoot />} />
          </Routes>
        <Footer />
      </Router>
  );
}

export default App;
