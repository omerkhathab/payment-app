export function Button ({text, onClick}) {
    return <button onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-7 w-full">
        {text}
    </button>
}