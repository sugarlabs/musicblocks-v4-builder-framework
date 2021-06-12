import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CollisionContext } from "./Contexts/CollisionContext";
import { FlowBlockNoArgsSVG } from "./BlockSvg/FlowBlockNoArgsSVG";
import StackClampBlockNoArgsSVG from "./BlockSvg/StackClampBlockNoArgsSVG";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CollisionContext.Provider value={{}}>
        <div className="App">
          <StackClampBlockNoArgsSVG type="start" />
          <FlowBlockNoArgsSVG type="TYPE1" color="green" />
          <FlowBlockNoArgsSVG type="TYPE2" x={300} y={300} color="yellow" />
        </div>
      </CollisionContext.Provider>
    </DndProvider>
  );
}

export default App;
