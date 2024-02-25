import { useNavigate } from "react-router-dom"

export function Failed ({message}) {
    const navigate = useNavigate();
    return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-7xl">Transaction Failed</div>
        <button className="m-8 bg-red-400 p-3 text-4xl rounded-xl" onClick={()=>{
            navigate('/dashboard');
        }}>Go Back</button>
    </div>)
}