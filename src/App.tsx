import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails";
import Administrator from "./pages/Administrator";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/admin" element={<Administrator />} />
      </Routes>
    </Router>
  );
}

export default App;
