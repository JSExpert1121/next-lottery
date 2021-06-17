import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const storeItem = 'lottery-bitcoin';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storeItem);
    if (!serializedState || !serializedState.modified_at) {
      return {};
    }

    // expired data? check if it is 30 mins old
    const silence = (new Date().getTime() - serializedState.modified_at) / 1000;
    if (silence > 1800) {    // 30 mins
      return {}
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return {};
  }
};

const saveState = (state) => {
  try {
    state.modified_at = new Date().getTime();
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storeItem, serializedState);
  } catch (error) {
    console.log('Local Storage: Save failed with code ', error);
  }
};

const peristedState = loadState();
export default function configureStore() {
  const storeEnhancers = compose;
  saveState({});
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