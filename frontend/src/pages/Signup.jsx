import { useNavigate } from "react-router-dom";
import { Bottomtext } from "../components/Bottomtext";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { Subheading } from "../components/Subheading";
import { useRef, useState } from "react";
import axios from "axios";

export function Signup () {
    const navigate = useNavigate();
    const divRef = useRef();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    return <>
    <div className="min-h-screen flex justify-center items-center bg-white ">
        <div className="flex flex-col items-center justify-center bg-slate-200 h-3/4 p-10 rounded-lg w-3/12">
            <Heading label={"Sign Up"}/>
            <Subheading label={"Enter your information to create an account"} />
            <InputComp onChange={ e => setUsername(e.target.value) } text={"Username"} />
            <InputComp onChange={ e => setFirstName(e.target.value) } text={"First Name"} />
            <InputComp onChange={ e => setLastName(e.target.value) } text={"Last Name"} />
            <InputComp onChange={ e => setPassword(e.target.value) } text={"Password"} />
            <Button text={"Sign Up"} onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    firstName, lastName, username, password
                });
                if(response.data.message == "User created successfully"){
                    const token = response.data.token;
                    localStorage.setItem("token", `Bearer ${token}`);
                    navigate('/dashboard');
                } else {
                    divRef.current.innerHTML = "Invalid Inputs";
                    navigate('/signup');
                }
            }} />
            <div ref={divRef} className="text-red-400"></div>
            <Bottomtext label={"Already have an account?"} to={'/signin'} buttonText={'Signin'} />
        </div>
    </div></>
}

