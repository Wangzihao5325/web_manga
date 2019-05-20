import React from "react";
import { Provider } from 'react-redux';

import Router from '../router';
import store from '../store';

function AppRouter() {
  return (
    <Provider store={store}>
      <div>
        <Router />
        {/*process.env.NODE_ENV === 'production'?'':<DevTools/>*/}
      </div>
    </Provider>
  );
}

export default AppRouter;