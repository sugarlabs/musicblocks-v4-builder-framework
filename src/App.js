import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import * as Quadtree from "quadtree-lib";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CollisionContext } from "./Contexts/CollisionContext";
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";
import StackClampBlockNoArgsSVG from "./BlockSvg/StackClampBlockNoArgsSVG";
import workspaceFromMonitor from "./DemoWorkspace";
import Crumbs from "./Crumbs";
import uuid from "uuid/v4";

function App() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  // will have to look into height as the canvas is scrollable
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const [workspace, setWorkspace] = useState(workspaceFromMonitor);

  return (
    <DndProvider backend={HTML5Backend}>
      <CollisionContext.Provider
        value={{ quadtree: new Quadtree({ width: vw, height: vh }) }}
      >
        <div className="App">
          {workspace.map((stack) => {
            switch (stack.type) {
              case "crumbs":
                console.log("CRUMBS");
                return <Crumbs schema={stack} />;
              case "start":
                return <StackClampBlockNoArgsSVG schema={stack} />;
              case "action":
                return (
                  <StackClampBlockNoArgsSVG schema={stack} type="action" />
                );
              default:
                console.log(`Invalid category ${stack.category}`);
            }
          })}
        </div>
      </CollisionContext.Provider>
    </DndProvider>
  );
}

export default App;
