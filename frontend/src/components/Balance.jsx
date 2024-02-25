export function Balance ({amount}) {
    return <div className="m-6 flex text-2xl">
        <div className="font-bold ">
            Your Balance : 
        </div>
        <div className="pl-3">
            ${amount}
        </div>
    </div>
}