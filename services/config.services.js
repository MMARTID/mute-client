import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

// config para que el token se pase en todas las llamadas hechas con este service
service.interceptors.request.use((config) => {

  const authToken = localStorage.getItem("authToken")

  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }

  return config

})

export default service