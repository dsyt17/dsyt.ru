import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
