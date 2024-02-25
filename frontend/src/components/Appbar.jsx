import { useNavigate } from "react-router-dom";

export function Appbar ({username}) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between p-6 text-2xl h-1/4 bg-slate-100 items-center">
            <div className="flex flex-col justify-center h-full  font-bold ml-4">Payments App</div>

            <div className="flex items-center h-full">
                <button onClick={()=>{
                        localStorage.removeItem("token");
                        navigate('/signin')
                    }}className="bg-red-300 p-2 mx-5 rounded-lg text-base">
                    Logout
                </button>
                <div className="flex flex-col justify-center h-full">
                    Hello,
                </div>
                <div className="flex flex-col justify-center h-full pl-2">
                    {username}
                </div>
                <div className="flex flex-col justify-center h-full aspect-square rounded-full text-center bg-yellow-100 px-3 mx-5">
                    {(username && username[0].toUpperCase()) || " "}
                </div>
            </div>
        </div>
    )
}