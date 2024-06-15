import { FunctionComponent } from "react";

type Props = {
    isShowButton: boolean,
    isLoading: boolean,
    text: string
}

const ButtonSubmit: FunctionComponent<Props> = ({ isShowButton, isLoading, text }) => {
    return (
        <>
            {
                isShowButton && (
                    <button type="submit" className='relative mt-2 bg-sky-600/20 w-full text-center text-slate-300 block p-1 rounded-md hover:bg-sky-500/40 transition'>
                        {
                            isLoading ? 'loading...' : text
                        }
                        {
                            isLoading && (
                                <span className="absolute grid h-4 w-4 content-center place-content-center" style={{ top: '-5px', right: '-5px' }}>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3  bg-sky-500"></span>
                                </span>
                            )
                        }
                    </button>
                )
            }

        </>
    )
}
export default ButtonSubmit