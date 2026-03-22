import axios from "axios";

type CategoryInput = {
  name: string
}

//categoryAdd
export const createCategory = async ( token:string , data: CategoryInput ) => {
  return await axios.post("http://localhost:3000/api/category",data,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//categoryList
export const listCategory = async ( ) => {
  return await axios.get("http://localhost:3000/api/category")
}

//delete Category ( token and id )
export const deleteCategory = async (token , id) => {
  return await axios.delete(`http://localhost:3000/api/category/${id}`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}
