import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import testReducer from './reducers/testReducer';
import tabBottomNaviReducer from './reducers/tabBottomNaviReducer';

const rootReducer = combineReducers({
    test: testReducer,
    tabNavi: tabBottomNaviReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;