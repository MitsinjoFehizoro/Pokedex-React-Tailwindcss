import { FunctionComponent, useEffect } from "react";
import { useAuth } from "../api/users-api/use-auth";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    element: JSX.Element
}

const ProtectedRoute: FunctionComponent<Props> = ({ element }) => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!isAuth) navigate('/login', { state: { from: location.pathname } })
    }, [isAuth, navigate, location.pathname])

    return element
}
export default ProtectedRoute