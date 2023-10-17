
import NotificationSlice from "./NotificationSlice";
import AuthSlice from "./AuthSlice";
import { UserAuthApi } from "../auth/UserAuthApi";
import { combineReducers } from "redux";
import BusSlice from "./BusSlice";
import TicketSlice from "./TicketSlice";
const rootReducer = combineReducers({
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    AuthSlice,
    BusSlice,
    NotificationSlice,
    TicketSlice
})

export default rootReducer;