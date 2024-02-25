import { Navigate } from "react-router-dom";

export function Home () {

    if(localStorage.getItem("token")){
        return <Navigate to={'/dashboard'} />
    }
    else {
        return <Navigate to={'/signin'} />
    }
}