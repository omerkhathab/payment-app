import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState, useEffect, Suspense } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function Dashboard () {
    if(!localStorage.getItem("token")){
        return <Navigate to={'/signin'} />
    }
    const [balance, setBalance] = useState("");
    const [name, setName] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers : {
                authorization : localStorage.getItem("token")
            }
        }).then(response =>{
            setBalance(response.data.balance);
            setName(response.data.username.firstName + " " + response.data.username.lastName)
        })
    },[])
    return <div>
        <Suspense fallback={"Loading"} >
            <Appbar username={name}/>
        </Suspense>
        <div className="m-8">
            <Balance amount={balance}/>
            <Users />
        </div>
    </div>
}