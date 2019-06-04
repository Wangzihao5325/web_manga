import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import testReducer from './reducers/testReducer';
import tabBottomNaviReducer from './reducers/tabBottomNaviReducer';
import popReducer from './reducers/popReducer';
import userReducer from './reducers/userReducer';
import appInfoReducer from './reducers/appInfoReducer';

const rootReducer = combineReducers({
    test: testReducer,
    tabNavi: tabBottomNaviReducer,
    pop: popReducer,
    user: userReducer,
    appInfo: appInfoReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;