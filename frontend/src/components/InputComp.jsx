export function InputComp({text, onChange}) {
    return (
        <div className="font-medium text-base w-full">
            <div className="mb-2">{text}</div>
            <input onChange={onChange} placeholder={text} className="p-2 w-full rounded mb-2 "></input>
        </div>
    )
}