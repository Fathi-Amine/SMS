import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";


const PrivateRoute = ({role, children}) => {
    const {userInfo} = useSelector((state)=>state.auth)
    return userInfo && userInfo.data.role === role ? children : <Navigate to='/login' replace/>
};

export default PrivateRoute;