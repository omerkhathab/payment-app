import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

export function SendMoney () {
    if(!localStorage.getItem("token")){
        return <Navigate to={'/signin'} />
    }
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);

    const id = searchParams.get("id");
    const name = searchParams.get("fname") + " " + searchParams.get("lname");

    if(!id || !name){
        return <Navigate to={'/dashboard'} />
    }

    return <>
    <div className="min-h-screen flex justify-center items-center bg-white ">
        <div className="flex flex-col items-center justify-center bg-slate-200 h-3/4 p-10 rounded-lg w-3/12">
            
            <div className="text-4xl font-semibold mt-4 mb-8">Send Money</div>

            <div className="flex items-center w-full text-2xl">
                <div className="flex flex-col justify-center h-full aspect-square rounded-full text-center bg-yellow-100 px-3 mr-2">
                        {name[0].toUpperCase()}
                </div>
                <div>{name}</div>
            </div>
            <input type="number" onChange={e => setAmount(e.target.value)} placeholder={"Amount"} className="font-medium text-base w-full p-2 rounded my-8" />

            <button onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/account/transfer", 
                    {
                        to : id,
                        amount
                    }, {
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    }).then(response => {
                        console.log(response.data.message);
                        if(response.data.message == "Transfer successful"){
                            navigate('/dashboard')
                        } else {
                            navigate('/failed');
                        }
                    })
                    }
                }
                className="bg-green-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 w-full">
                    Send
            </button>
        </div>
    </div>
    </>
}