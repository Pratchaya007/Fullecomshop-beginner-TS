import axios from "axios";

export const currentUser = async (token: string ) => {
  return await axios.post("http://localhost:3000/auth/current-user",{},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const currenAdmin = async (token: string ) => {
  return await axios.post("http://localhost:3000/auth/current-admin",{},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}