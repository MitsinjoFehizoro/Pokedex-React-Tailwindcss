import { FunctionComponent, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

type Props = {
    onHauteurChange: (hauteur: number) => void
}
const BarreDeNavigation: FunctionComponent<Props> = ({ onHauteurChange }) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current) {
            onHauteurChange(ref.current.offsetHeight)
        }
    })

    return (
        <nav ref={ref} className='fixed flex-row z-10 bg-slate-900/90 backdrop-blur w-full top-0 left-0 text-center border-b border-gray-700 p-4'>
            <h3 className='md:w-3/4 lg:w-1/2 mx-auto py-1 text-3xl rounded-3xl  bg-sky-600/20  hover:bg-sky-500/20 font-bold transition'><NavLink to='/' className='text-slate-50 hover:text-slate-50'>Pokédex</NavLink></h3>
        </nav>
    )
}
export default BarreDeNavigation