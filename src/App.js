import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import EmployeeStore from "./component/stores/EmployeeStore";
import loadIcon from "./shared/icons/loader";

loadIcon()
function App() {
  return (
      <div>
          <BrowserRouter>
              <EmployeeStore/>
          </BrowserRouter>
      </div>
  );
}

export default App;
