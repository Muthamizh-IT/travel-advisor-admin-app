import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home/home";
import Options from "./components/options/options";
import Places from "./components/places/places";
import AddStates from "./components/states/stateAdd";
import Manage_Places from "./components/Manage-Top-Places/manage-places";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/AddState" element={<AddStates />} />
          <Route path="/Options" element={<Options />} />
          <Route path="/places" element={<Places />} />
          <Route path="/manageTopPlaces" element={<Manage_Places />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
