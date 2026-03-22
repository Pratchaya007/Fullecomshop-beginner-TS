import { currentUser } from "@/api/auth"
import { useEcomStore } from "@/stores/ecom-store"
import { useEffect, useState, type ReactNode } from "react"
import Loading from "./Loading"

const ProtecUser = ({element} : {element: ReactNode}) => {
  const [check , setCheck] = useState(false)
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  // useEffect(()=> { ท่าแบบ .then()  .catch()
  //   if(user && token){
  //     //send to back
  //     currentUser(token)
  //     .then(() => setCheck(true))
  //     .catch(() => setCheck(false))
  //   }
  // },[])

  useEffect(() => {
    const checkUser = async () => {
      try{
        if (user && token) {
          await currentUser(token)
          setCheck(true)
        }
      }catch {
        setCheck(false)
      }
    }
    checkUser()
  },[user , token ])


  return check ?  element : <Loading/>
}
export default ProtecUser