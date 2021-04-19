import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./component/home";
import Login from "./component/login";
import Display from "./component/relation/display";
import Add from "./component/relation/add";
import Protected from "./component/Protected";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/relations">
                    <Protected Cmp={Display}/>
                    {/*<Protected Cmp={Add}/>*/}
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>

                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
