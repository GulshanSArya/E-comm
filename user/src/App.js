import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Nav from "./Nav";
import Productlist from "./Productlist";
import Productdetail from "./Productdetail";
import Placeorder from "./Placeorder";
import Myorder from "./Myorder";

const beforeLoginRoutes = ["/signup", "/login"];
const ProtectedRoutes = ({ component: Component, path }) => {
  const userInfo = localStorage.getItem("userInfo");
  const location = useLocation();

  if (userInfo) {
    // now we are logged-in
    if (beforeLoginRoutes.includes(path)) {
      return <Navigate to={`/home`} replace state={{ location }} />;
    } else {
      return <Component />;
    }
  } else {
    // we are not logged-in
    if (beforeLoginRoutes.includes(path)) {
      return <Component />;
    } else {
      return <Navigate to={`/login`} replace state={{ location }} />;
    }
  }
};

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/productlist"
          element={
            <ProtectedRoutes component={Productlist} path="/productlist " />
          }
        />
        <Route
          path="/signup"
          element={<ProtectedRoutes component={Signup} path="/signup" />}
        />
        <Route
          path="/login"
          element={<ProtectedRoutes component={Login} path="/login" />}
        />
        <Route
          path="/productdetail"
          element={
            <ProtectedRoutes component={Productdetail} path="/productdetail" />
          }
        />
        <Route
          path="/placeorder"
          element={
            <ProtectedRoutes component={Placeorder} path="/placeorder" />
          }
        />
        <Route
          path="/myorder"
          element={<ProtectedRoutes component={Myorder} path="/myorder" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
