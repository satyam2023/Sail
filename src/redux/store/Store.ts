import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import themeReducer from "../reducers/ThemeReducer";
import reduxStorage from "core/redux-storage";
import accountReducer from "redux/reducers/AccountReducer";
import { DESTROY_SESSION } from "redux/actionConstants";
import UIReducer from "redux/reducers/UIReducer";
import signupReducer from "redux/reducers/SignUpReducer";
import loaderReducer from "redux/reducers/LoaderReducer";
import updatedBaseURLReducer from "redux/reducers/UpdatedBaseURLReducer";
import cmsReducer from "redux/reducers/CmsReducer";
import homeReducer from "redux/reducers/HomeReducer";
import logoutReducer from "redux/reducers/LogOutReducer";
import visitsReducer from "redux/reducers/VisitReducer";
import messageReducer from "redux/reducers/MessageReducer";
import notificationReducer from "redux/reducers/NotificationReducer";
import settingsReducer from "redux/reducers/SettingsReducer";
import masterDataReducer from "redux/reducers/MasterDataReducer";
import dropDownReducer from "redux/reducers/DropDownReducer";
import createMeetingReducer from "redux/reducers/CreateMeetingReducer";
import customerReducer from "redux/reducers/CreateCustomerReducer";
import viewCustomerProfileReducer from "redux/reducers/ViewCustomerProfileReducer";
const middleware = applyMiddleware(thunk);

const reducers = combineReducers({
  userAccount: accountReducer,
  themeReducer: themeReducer,
  UIReducer: UIReducer,
  signUpReducer: signupReducer,
  LoaderReducer: loaderReducer,
  updatedBaseURL: updatedBaseURLReducer,
  cmsPages: cmsReducer,
  logout:logoutReducer,
  home: homeReducer,
  visitDetail:visitsReducer,
  message:messageReducer,
  notification:notificationReducer,
  setting:settingsReducer,
  masterData:masterDataReducer,
  dropdown:dropDownReducer,
  craeteMeeting:createMeetingReducer,
  createCustomer:customerReducer,
  viewCustomerProfile:viewCustomerProfileReducer,
});

//* white list only those reducers which needs to be stored locally.
const persistConfig = {
  key: "@boiler",
  storage: reduxStorage,
  whitelist: ["userAccount", "updatedURL"],
};

const rootReducer = (state: any, action: any) => {
  if (action.type === DESTROY_SESSION) state = undefined;
  return reducers(state, action);
};
const presistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(presistedReducer, undefined, middleware);
const persistor = persistStore(store);
export type RootState = ReturnType<typeof reducers>;
export { persistor, store };
