import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import * as Quadtree from "quadtree-lib";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CollisionContext } from "./Contexts/CollisionContext";
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";
import StackClampBlockNoArgsSVG from "./BlockSvg/StackClampBlockNoArgsSVG";

function App() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  // will have to look into height as the canvas is scrollable
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  return (
    <DndProvider backend={HTML5Backend}>
      <CollisionContext.Provider value={{quadtree: new Quadtree({width: vw, height: vh})}}>
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
