import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "hooks/useRefreshToken";
import { selectCurrentToken } from "features/auth/authSlice";
import { useSelector } from "react-redux";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const token = useSelector(selectCurrentToken)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                // console.log(verifyRefreshToken.response)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        

        !token ? verifyRefreshToken() : setIsLoading(false)

        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${token}`)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoading])


    return (
      <>
        {isLoading
            ? <p>Loading...</p>
            : <Outlet />}
      </>
    )
}

export default PersistLogin