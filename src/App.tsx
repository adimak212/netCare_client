
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HomePage from "./pages/homePage";
import MyProjectsPage  from "./pages/myProjectsPage";


export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MyProjectsPage />
    </DndProvider>
  );
}
