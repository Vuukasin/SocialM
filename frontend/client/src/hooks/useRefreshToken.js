import axios from "axios";
import { setCredentials } from "features/auth/authSlice";
import { useDispatch } from "react-redux";


const useRefreshToken =  () => {
    const dispatch = useDispatch()

    const refresh = async () => {
        const response = await axios.get('http://localhost:5000/refresh', {
            withCredentials: true
        });
        dispatch(setCredentials({ ...response.data }))
        return response.data.accessToken
        
    }
    return refresh
    


}

export default useRefreshToken