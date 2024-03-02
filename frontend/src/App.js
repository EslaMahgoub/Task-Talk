import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"
import HomePage from "./views/Homepage"
import LoginPage from "./views/LoginPage"
import RegisterPage from "./views/RegisterPage"
import Dashboard from "./views/Dashboard"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import Todo from "./components/Todo/Todo"


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={Todo} path="/todos" />
          <Route component={HomePage} path="/" exact />
          <Route component={LoginPage} path="/login" exact />
          <Route component={RegisterPage} path="/register" exact />
        </Switch>
        <Footer />
      </AuthProvider>
    </Router>
  )
}

export default App