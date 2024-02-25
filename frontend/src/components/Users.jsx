import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Users () {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/bulk?filter='+ filter,{
            headers: {
                authorization : token
            }
        }).then(async (response) =>{
            setUsers(response.data.users);
        })
    },[filter])
    
    return <div className="flex flex-col m-6">
        <div className=" flex text-2xl font-bold my-2">Users</div>
        <input onChange={e=>setFilter(e.target.value)} placeholder="Search Users" className="p-3 border border-zinc-300 w-full rounded my-2"/>

        {users.map((user)=>{
            return <div key={user._id}  className="flex justify-between my-5 items-center text-lg">
            <div className="flex w-1/4 items-center">
                <div className="flex flex-col justify-center h-full aspect-square rounded-full text-center bg-yellow-100 px-3 mx-2">{user.firstName[0].toUpperCase()}
                </div>
                <div className='flex items-baseline'>
                    <div className='text-2xl'>{`${user.firstName} ${user.lastName}`}</div>
                    <div className='text-gray-500 text-sm pl-1'>{`(${user.username})`}</div>
                </div>
            </div>
            <button onClick={()=>navigate('/send?id='+user._id + "&fname=" + user.firstName + "&lname=" + user.lastName )}className="bg-green-300 p-3 rounded-lg text-base">Send Money</button>
        </div>
        })}
    </div>
}