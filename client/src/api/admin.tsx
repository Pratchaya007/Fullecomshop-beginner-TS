import axios from "axios";

export const getOrdersAdmin = async ( token: string ) => {
  return await axios.get(`http://localhost:3000/api/admin/orders`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeOrderStatus = async (token:string , orderId:number , orderStatus:string) => {
  return await axios.put(`http://localhost:3000/api/user/order`,{
    orderId , orderStatus
  },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const getlistAllUser = async ( token: string ) => {
  return await axios.get(`http://localhost:3000/api/users`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}
export const changUserStatus = async ( token: string , value:unknown) => {
  return await axios.post(`http://localhost:3000/api/change-status`,value, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}
export const changUserRole = async ( token: string , value:unknown) => {
  return await axios.post(`http://localhost:3000/api/change-role`,value, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}