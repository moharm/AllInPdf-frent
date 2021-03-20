import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Acceuil from "./Components/Acceuil";
import './App.css';


function App() {
    return (
            <Router>
                <div id="router-container">
                    <Header />
                        <Switch>
                            <Route exact path="/Acceuil">
                                <Acceuil/>
                            </Route>
                            <Route path="/Login">
                                <Login/>
                            </Route>
                        </Switch>
                </div>
            </Router>
    );
}

export default App;
