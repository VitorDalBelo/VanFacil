import {useState,useEffect} from "react"
import { useNavigation} from "@react-navigation/native";
import api from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast, { toastApiError } from "../../helpers/toast";
import { Buffer } from 'buffer';

export default function useAuth(){
    const navigation = useNavigation();
    const [isAuth,setIsAuth] = useState(false);
    const [user,setUser] = useState({});
    const [photoUri,setPhotoUri] = useState('');
    const [loading, setLoading] = useState(true);
   

    const handleLogin = async (email,senha) => {
		setLoading(true);
        await handleLogout()

		try {
            const base64Credentials = Buffer.from(`${email}:${senha}`).toString('base64');
            const resp = await api.post("auth/login",{},{headers:{authorization:`Basic ${base64Credentials}`}})
			const {data} = resp;
			await AsyncStorage.setItem("access_token", data.access_token);
			api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
            setPhotoUri(`${process.env.EXPO_PUBLIC_BACKEND_URL}${data.user.photo}`)
			setUser({...data.user});
			setIsAuth(true);
            if(data.user.profile === "driver") navigation.navigate("M_Inicial");
            else if(data.user.profile === "passenger") navigation.navigate("P_Inicial");
            else toast(`O valor ${data.user.profile} não foi reconhecido como um profile`,"error")
		} catch (err) {
            console.log(err.response.data)
			toastApiError(err);
		}
        finally{
            setLoading(false);
        }
	};

    const handleGoogleLogin = async (googletoken) => {
		setLoading(true);
        await handleLogout()

		try {
            const resp = await api.post("auth/login/google",{},{headers:{googletoken}})
			const {data} = resp;
			await AsyncStorage.setItem("access_token", data.access_token);
			api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
            setPhotoUri(data.user.photo)
			setUser({...data.user});
			setIsAuth(true);
            if(data.user.profile === "driver") navigation.navigate("M_Inicial");
            else if(data.user.profile === "passenger") navigation.navigate("P_Inicial");
            else toast(`O valor ${data.user.profile} não foi reconhecido como um profile`,"error")
		} catch (err) {
            console.log(err.response.data)
			toastApiError(err);
		}
        finally{
            setLoading(false);
        }
	};

    const handleLogout = async ()=>{
        await AsyncStorage.clear();
        setIsAuth(false);
        setUser({});
        api.defaults.headers.Authorization = undefined;
        navigation.navigate("Login");
    }
    api.interceptors.request.use(
		async config => {
			const access_token = await AsyncStorage.getItem("access_token");
			if (access_token) {
				config.headers["Authorization"] = `Bearer ${access_token}`;
				setIsAuth(true);
			}
			return config;
		},
		error => {
			Promise.reject(error);
		}
	);

    api.interceptors.response.use(
        response=>response,
        async error =>{
            // const oldToken = await AsyncStorage.getItem("");
            const originalRequest = error.config;
            if (error?.response?.status === 401) {
                if(!originalRequest._retry){
                    originalRequest._retry = true;
                    const {data} = await api.post('auth/refresh');
                    if(data){
                        setUser({...data.user});
                        setIsAuth(true);
                        await AsyncStorage.setItem("access_token", data.access_token);
                        api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
                    }
                    return api(originalRequest);
                }
                else await handleLogout();
			}
            return Promise.reject(error);
        }
    );

    return {isAuth,user,loading,handleLogin,handleGoogleLogin,handleLogout,setUser,photoUri};
    
} 