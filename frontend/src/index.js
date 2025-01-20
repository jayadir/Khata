import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/login/ProtectedRoute";
import HomePage from "./components/homepage/HomePage";
import Amount from "./components/amount/Amount";
import CustomerDetails from "./components/Business/customerdetails/CustomerDetails";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/business/:mobile",
  //   element: (
  //     <ProtectedRoute>
  //       <HomePage />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/amount/:type/:b",
    element:(
      <ProtectedRoute>
        <Amount/>
      </ProtectedRoute>
    )
  },
  {
    path:"/customer/:mobile",
    element:(
      <ProtectedRoute>
        <CustomerDetails/>
      </ProtectedRoute>
    )
  }
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <router>
        <RouterProvider router={router} />
      </router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
