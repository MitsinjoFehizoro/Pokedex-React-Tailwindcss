import { FunctionComponent, useState } from "react";
import BarreDeNavigation from "../components/barre-de-navigation";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../api/users-api/use-auth";

const Root: FunctionComponent = () => {
    const [hauteur, setHauteur] = useState<number>(0)
    const handleHauteur = (h: number) => {
        setHauteur(h)
    }
    const { isAuth, logout } = useAuth()
    const redirect = useNavigate()
    const handleClick = () => {
        if (isAuth) {
            logout()
        } else {
            redirect('/login')
        }
    }

    return (
        <>
            <BarreDeNavigation onHauteurChange={handleHauteur} />
            <section className='pb-10 relative' style={{ paddingTop: hauteur * 1.5 + 'px' }}>
                <Outlet />
                <NavLink to={'/pokemons/add'} className='fixed bottom-5 right-8'>
                    <i className='fa fa-add bg-red-600/80 p-3 rounded-full text-slate-100 text-md transition hover:bg-red-500 cursor-pointer'></i>
                </NavLink>
                <p onClick={handleClick} className=" fixed right-6 top-6 z-10 cursor-pointer">{isAuth?"Se deconnecter" : "Se connecter"}</p>
            </section >
        </>
    );
}

export default Root;