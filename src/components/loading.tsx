import { FunctionComponent } from 'react';

const Loading: FunctionComponent = () => {
    return (
        <div className='flex justify-center m-5'>
            <span className="relative grid h-5 w-5 content-center place-content-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4  bg-sky-500"></span>
            </span>
            <span className='text-sky-400 text-sm italic ml-3'>Loading...</span>
        </div>
    );
};

export default Loading;