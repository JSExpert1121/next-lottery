import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('miniblog-state');
    if (serializedState === null) {
      return {};
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return {};
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('lottery-bitcoin', serializedState);
  } catch (error) {
    console.log('Local Storage: Save failed with code ', error);
  }
};

const peristedState = loadState();
export default function configureStore() {
  const storeEnhancers = compose;
  const store = createStore(
    rootReducer,
    peristedState,
    storeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}