import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Contact from "./components/Contact";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Route exact path="/" component={Home}></Route>
        <Route path="/chat" component={Chat}></Route>
        <Route path="/contact" component={Contact}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
