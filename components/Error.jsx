import { useRouteError } from "react-router-dom";
const Error = () => {

    const error = useRouteError();
   
    return (
        <div className="flex flex-col text-red-700 text-xl font-semibold mt-10 items-center">
            <p>{error.data}</p>
            <p>{error.status}</p>
            <p>{error.statusText}</p>
        </div>
    )
}

export default Error;