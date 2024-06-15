import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

const PageNotFund: FunctionComponent = () => {
    return (
        <div className="h-full w-full flex justify-center">
            <div className="flex items-center">
                <div className="flex flex-col w-96 bg-slate-800 rounded-xl ring-1 ring-gray-50/20 py-5 px-10">
                    <h1 className="text-center text-6xl text-slate-300 font-bold">404</h1>
                    <p className="text-center text-xl text-slate-400 ">Oupss, page non trouvée !!!!</p>
                    <NavLink to={'/'} className='self-center mt-8 bg-sky-600/20  text-center text-slate-300 block py-1 px-10 rounded-md hover:bg-sky-500/40 transition'>
                        <i className='fa fa-arrow-left'></i>
                        <span className='pl-2'>Révenir à l'acceuil</span>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default PageNotFund;