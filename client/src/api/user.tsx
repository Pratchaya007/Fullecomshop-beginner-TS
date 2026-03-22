import axios from "axios";

//User api

export const createUserCart = async (token : string , cart:unknown) => {
  return await axios.post(`http://localhost:3000/api/user/cart`, cart , {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getUserCart = async (token:string) => {
  return await axios.get(`http://localhost:3000/api/user/cart`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const saveAddress = async ( token:string , address:string) => {
  return  await axios.post(`http://localhost:3000/api/user/address`,
    {address},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  )
}
export const saveOrder = async ( token:string , payload:unknown) => {
  return  await axios.post(`http://localhost:3000/api/user/order`,
    payload,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const getOrder = async (token:string) => {
  return await axios.get(`http://localhost:3000/api/user/order`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}