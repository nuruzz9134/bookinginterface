import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './features/RootReducer'
import { UserAuthApi } from './auth/UserAuthApi'


export const store = configureStore({
    reducer: {rootReducer},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
  },window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())