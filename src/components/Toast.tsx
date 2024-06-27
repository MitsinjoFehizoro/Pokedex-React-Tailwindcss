import { FunctionComponent } from "react";
import { useToasts } from "../hooks/useToasts";

const Toast: FunctionComponent = () => {
    const { toast, isError, pushToast } = useToasts()
    const handleClickI = () => {
        pushToast(null)
    }
    return (
        <div
            className="fixed z-20 bg-slate-900 top-20 right-1">
            {
                toast && (
                    !isError ? (
                        <div className={`ring-1 ring-green-800 flex rounded bg-emerald-300/20 px-5 py-2 `}>
                            <i className="my-auto text-green-400 fa fa-circle-check"></i>
                            <p className="px-2 w-60 text-green-600 font-bold">{toast}</p>
                            <i onClick={handleClickI} className="my-auto text-xs text-green-600 transition  hover:text-green-300 cursor-pointer italic fa fa-x"></i>
                        </div>
                    ) : (
                        <div className={`ring-1 ring-red-400 flex rounded bg-red-300/20 px-5 py-2 `}>
                            <i className="my-auto text-red-400 fas fa-exclamation-triangle"></i>
                            <p className="px-2 w-60 text-red-400 font-bold">{toast}</p>
                            <i onClick={handleClickI} className="my-auto text-xs text-red-400 transition  hover:text-red-300 cursor-pointer italic fa fa-x"></i>
                        </div>
                    )
                )
            }
        </div>
    )
}
export default Toast