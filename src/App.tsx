import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HomePage from "./pages/homePage";
import MyProjectsPage from "./pages/myProjectsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow-md">
      <h1 className="text-xl font-bold">NetCare</h1>

      <div className="flex gap-4">
        <Link
          to="/"
          className={`px-3 py-2 rounded transition ${
            location.pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          New Project
        </Link>

        <Link
          to="/projects"
          className={`px-3 py-2 rounded transition ${
            location.pathname === "/projects"
              ? "bg-gray-700"
              : "hover:bg-gray-700"
          }`}
        >
          My Projects
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <NavBar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<MyProjectsPage />} />
            <Route path="/:id" element ={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}
