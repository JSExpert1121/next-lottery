import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const storeItem = 'lottery-bitcoin';
const modified = 'lottery-modified';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storeItem);
    const modified_at = localStorage.getItem(modified);
    if (!serializedState || !modified_at) {
      return {};
    }

    // expired data? check if it is 30 mins old
    const silence = (new Date().getTime() - parseInt(modified_at));
    const state = JSON.parse(serializedState);
    if (silence > 1800000) {    // 30 mins
      return { auth: state.auth }
    }

    return state;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(modified, new Date().getTime());
    localStorage.setItem(storeItem, JSON.stringify(state));
  } catch (error) {
    console.log('Local Storage: Save failed with code ', error);
  }
};

export default function configureStore() {
  const peristedState = loadState();
  const storeEnhancers = compose;
  saveState(peristedState);
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