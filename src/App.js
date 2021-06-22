import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CollisionContext } from "./Contexts/CollisionContext";
import FlowBlockNoArgsSVG from "./BlockSvg/FlowBlockNoArgsSVG";
import StackClampBlockNoArgsSVG from "./BlockSvg/StackClampBlockNoArgsSVG";
import workspaceFromMonitor from "./DemoWorkspace";
import Crumbs from "./Crumbs";
import uuid from "uuid/v4";

function App() {

  const [workspace, setWorkspace] = useState(workspaceFromMonitor);

  const searchBlock = (id, func, block) => {
    // console.log(`searching for id = ${id}`);
    // console.log(block);
    // console.log(block.id);
    if (block?.id === id){
      console.log(`Block with id ${id} found`);
      func(block);
    }
    else {
      if (Array.isArray(block)) {
        // console.log("is Array");
        // console.log(block.length);
        for (let i = 0; i < block.length; i++) {
          searchBlock(id, func, block[i]);
        }
      } else {
        for (let i = 0; i < block?.blocks?.length; i++) {
          searchBlock(id, func, block.blocks[i]);
        }
      }
    }
  }

  // stackId - id of parent block inside which the block is to be added
  // index - index in blocks array of the parent at which the block is to be added
  // schema - schema of the block to be added
  const addBlock = (stackId, index, schema) => {
    const newState = [...workspace];
    searchBlock(stackId, (block) => {
      block.blocks = [...block.blocks.slice(0, index), schema, ...block.blocks.slice(index)];
    }, newState);
    setWorkspace(newState);
  }

  const addBlockToCrumbs = (schema) => {
    console.log("Add Block to Crumbs executed!!!...");
    const newState = [...workspace];
    newState[0].blocks.push(schema);
    console.log(newState);
    setWorkspace(newState);
  }

  const removeBlock = (stackId, blockId) => {
    const newState = [...workspace];
    searchBlock(stackId, (block) => {
      block.blocks = block.blocks.filter((block) => block.id !== blockId);
    }, newState);
    setWorkspace(newState);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <CollisionContext.Provider
        value={{ addBlock, removeBlock, addBlockToCrumbs }}
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
