import { useContext } from "react"
import {jwtDecode} from "jwt-decode"
import axios from "axios"
import dayjs from "dayjs"
import AuthContext from "../context/AuthContext"

const baseURL = "http://localhost:8000/api"

const useAxios = () => {
  const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authTokens?.access}`
    }
  })

  axiosInstance.interceptors.request.use(async req => {
    const user = jwtDecode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (!isExpired) return req
    
    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh
    })
    localStorage.setItem("authTokens", JSON.stringify(response.data))
    localStorage.setItem("access", response.data.access)
    localStorage.setItem("refresh", response.data.refresh )

    setAuthTokens(response.data)
    setUser(jwtDecode(response.data.access))
    
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
  })

  return axiosInstance
}

export default useAxios
