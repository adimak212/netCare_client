import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HomePage from "./pages/homePage";
import MyProjectsPage from "./pages/myProjectsPage";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/signUpPage";
import { UserProvider } from "./context/UserContext";
const queryClient = new QueryClient();

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
        <Router>
          <div className="pt-16">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element ={<SignUpPage />} />
              <Route path="/newProject" element={<HomePage />} />
              <Route path="/projects" element={<MyProjectsPage />} />
              <Route path="/project/:id" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
        </UserProvider>
      </QueryClientProvider>
    </DndProvider>
  );
}
