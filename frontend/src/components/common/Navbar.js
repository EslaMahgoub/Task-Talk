import { useContext } from 'react'

import { Link } from 'react-router-dom'
import AuthContext from "../../context/AuthContext"

function Navbar() {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img style={{width: "100px", height: "50px", objectFit: "contain"}} src="logo.png" alt=""/>

        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="float-end">
          <div className="collapse navbar-collapse float-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              { token === null &&
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Signup</Link>
                </li>
              </>
              }
              {token !== null &&
              <>
                <li className="nav-item">
                  <Link to="#" className="nav-link">{user.username}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/todos" className="nav-link">Todo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" onClick={logoutUser} style={{cursor: "pointer"}} className="nav-link">Logout</Link>
                </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Navbar