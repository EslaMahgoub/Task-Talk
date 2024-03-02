import {createContext, useState, useEffect} from "react"
import { jwtDecode } from "jwt-decode";
import {useHistory} from 'react-router-dom'
const swal = require("sweetalert2")

const AuthContext = createContext();
export default AuthContext

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
  )

  const [user, setUser] = useState(() =>
      localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  
  const history = useHistory()

  const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = await response.json()

    if (response.status === 200){
      setAuthTokens(data)
      let token_decoded = jwtDecode(data.access)

      setUser(token_decoded)
      
      localStorage.setItem("authTokens", JSON.stringify(data))
      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)


      history.push("/")
      swal.fire({
        title: `Login successful, Welcome ${token_decoded.username} to TaskTalk`,
        icon: "success",
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } else {
      swal.fire({
        title: "Login Failed, please check your login username and password then try again",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })

    }
  }
  const registerUser = async (email, username, password, password2) => {
    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify({
          email, username, password, password2
      })
  })
    if (response.status === 201){
      history.push("/login")
      swal.fire({
        title: `Registeration successful, Welcome ${username} to TaskTalk`,
        icon: "success",
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } else {
      console.log(response)
      swal.fire({
        title: "Registration Failed, please check your credentials and try again",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
    history.push('/login')
    swal.fire({
      title: `You have been logged out..`,
      icon: "success",
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }

  const contextData = {
    authTokens,
    setAuthTokens,
    user,
    setUser,
    registerUser,
    loginUser,
    logoutUser

  }

  useEffect(() => {
    if (authTokens){
      setUser(jwtDecode(authTokens.access))
    }
    setLoading(false)
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}