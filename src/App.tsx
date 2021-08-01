import React from 'react';
import BlocksWorkspace from './BlocksWorkspace';
import BlocksMenu from './BlocksMenu';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store/store';

function App() {
  return (
    <div className="App">
      <BlocksMenu width={0} />
      <Provider store={store}>
        <BlocksWorkspace />
      </Provider>
    </div>
  );
}

export default App;
