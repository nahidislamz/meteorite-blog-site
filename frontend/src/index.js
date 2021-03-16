import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import AuthReducer from "./store/reducers/auth";
import AdminReducer from "./store/reducers/admin";
import PostReducer from "./store/reducers/post";
import UserReducer from "./store/reducers/user";
import CommentReducer from "./store/reducers/comment";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootStore = combineReducers({
    auth: AuthReducer,
    admin: AdminReducer,
    post: PostReducer,
    user: UserReducer,
    comment: CommentReducer
});

const store = createStore(rootStore, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

