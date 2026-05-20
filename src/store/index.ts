import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { blogReducer } from './blog.slice';
import { layoutReducer } from './layout.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['layout', 'blog'],
};

const reducer = combineReducers({
  layout: layoutReducer,
  blog: blogReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export * from './blog.slice';
export * from './layout.slice';
export * from './types';
