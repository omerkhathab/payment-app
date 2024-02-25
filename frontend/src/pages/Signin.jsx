import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { Subheading } from "../components/Subheading";
import { Bottomtext } from "../components/Bottomtext";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

export function Signin () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const divRef = useRef();
    const navigate = useNavigate();

    return <>
    <div className="min-h-screen flex justify-center items-center bg-white ">
        <div className="flex flex-col items-center justify-center bg-slate-200 h-3/4 p-10 rounded-lg w-3/12">
            <Heading label={"Sign In"}/>
            <Subheading label={"Enter your information to signin"} />
            <InputComp onChange={ e => setUsername(e.target.value) } text={"Username"} />
            <InputComp onChange={ e => setPassword(e.target.value) } text={"Password"} />
            <Button text={"Sign In"} onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,password
                })
                if(response.data.authorization){
                    const token = response.data.authorization;
                    localStorage.setItem("token", `${token}`);
                    navigate('/dashboard');
                } else {
                    divRef.current.innerHTML = "Invalid Inputs";
                    navigate('/signin');
                }
            }} />
            <div ref={divRef} className="text-red-400"></div>
            <Bottomtext label={"Don't have an account?"} to={'/signup'} buttonText={'Signup'} />
        </div>
    </div></>
}

