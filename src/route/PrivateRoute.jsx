import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../Authentication/hooks/useAuth"




function PrivateRoute({children}) {
    const {user, loading}=useAuth()
    const location = useLocation()

    if(loading){
        return <h1>Just wait its loading</h1>
    }
    if (user){
        return children
    }

    return <Navigate to={'/login'}  state= {{from:location}} replace/>
  
}

export default PrivateRoute