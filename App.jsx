import React from 'react';
import { Provider } from 'react-redux';
import Store from './store';
import DrawerNavigator from './routes';

const App = () => {
  return (
      <Provider store={Store}>
          <DrawerNavigator />
      </Provider>
  );
};

export default App;
