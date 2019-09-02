import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
let enhancer = compose(applyMiddleware(...middleware));

// add redux only if redux devtools extension is installed
if (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
    enhancer = compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

export default store;