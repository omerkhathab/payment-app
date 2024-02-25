import { Link } from 'react-router-dom';

export function Bottomtext ({label, buttonText, to}) {
    return (
        <div className='py-2 flex justify-center text-sm text-gray-800'>
            <div>{label}</div>
            <Link className='pointer underline text-black pl-1' to={to}>{buttonText}</Link>
        </div>
    )
}