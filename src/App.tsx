
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HomePage from "./pages/homePage";


export default function App() {
  //const [items, setItems] = useState<CanvasItem[]>([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <HomePage />
    </DndProvider>
  );
}
