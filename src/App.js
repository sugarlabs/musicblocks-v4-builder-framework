import logo from './logo.svg';
import React from 'react';
import './App.css';
import { StackClampBlockNoArgsSVG } from './BlockSvg/StackClampBlockNoArgsSVG';
import { FlowBlockNoArgsSVG } from './BlockSvg/FlowBlockNoArgsSVG';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <StackClampBlockNoArgsSVG type="start"/>
      <FlowBlockNoArgsSVG type="TYPE1" color="green"/>
      <FlowBlockNoArgsSVG type="TYPE2" x={300} y={300} color="yellow"/>
    </div>
    </DndProvider>
  );
}

export default App;
