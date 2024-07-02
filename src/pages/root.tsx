import { FunctionComponent, useState } from "react";
import BarreDeNavigation from "../components/barre-de-navigation";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../api/users-api/use-auth";

const Root: FunctionComponent = () => {
    const [hauteur, setHauteur] = useState<number>(0)
    const handleHauteur = (h: number) => {
        setHauteur(h)
    }
    const { isAuth, logout } = useAuth()

    return (
        <>
            <BarreDeNavigation onHauteurChange={handleHauteur} />
            <section className='pb-10 relative' style={{ paddingTop: hauteur + 'px' }}>
                <Outlet />
                <div className="fixed bottom-5 right-8">
                    <NavLink to={'/'} className="block mb-1">
                        <i className='fa fa-home text-sm pt-2 bg-slate-600/80 p-3 rounded-full text-slate-100 text-md transition hover:bg-slate-500 cursor-pointer'></i>
                    </NavLink>
                    <NavLink to={'/pokemons/add'} className="block" >
                        <i className='fa fa-add bg-red-600/80 p-3 rounded-full text-slate-100 text-md transition hover:bg-red-500 cursor-pointer'></i>
                    </NavLink>
                </div>


                <p className="fixed right-6 z-10 cursor-pointer text-sm" style={{ top: hauteur + 15 + "px" }}>
                    {isAuth ? (
                        <p onClick={logout} className="underline text-slate-200 hover:text-slate-50">Logout</p>
                    ) : (
                        <>
                            <NavLink to={'/login'} className="underline text-slate-200 hover:text-slate-50">Login</NavLink>
                            <span> / </span>
                            <NavLink to={'/signup'} className="underline text-slate-200 hover:text-slate-50">Signup</NavLink>
                        </>
                    )}
                </p>
            </section >
        </>
    );
}

export default Root;