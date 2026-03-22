import axios from "axios";

export const payment = async (token: string) => {
  return await axios.post(`http://localhost:3000/api/user/create-checkout-session`,{} ,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}