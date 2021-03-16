import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import UserList from "./components/user-list.component";
import EditUser from "./components/edit-user.component";
import CreateUsers from "./components/create-users.component";
import AddUser from "./components/add-user.component";
import './App.css'
function App() {
  return (
    <Router>
      <div className="container-fluid">
      <Navbar />
      <br/>
      <div className="container">
      <Route path="/" exact component={UserList} />
      <Route path="/edit/:id" component={EditUser} />
      <Route path="/create" component={CreateUsers} />
      <Route path="/user" component={AddUser} />
      </div>
      </div>
    </Router>
  );
}

export default App;
