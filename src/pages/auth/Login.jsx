import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"

import '../../styles/pages/auth/_login.scss'
import 'react-toastify/dist/ReactToastify.css'

import reqres from "@/api/reqres"
import Auth from "@/layouts/Auth"
import Spinner from "@/components/loading/Spinner"

export default function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [passwordType, setPasswordType] = useState("password")
    const [values, setValues] = useState({
        email: 'eve.holt@reqres.in',
        password: "cityslicka",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const changePasswordType = () => {
        passwordType === "password" ? setPasswordType("text") : setPasswordType("password")
    }

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const isValid = event.target.validity.valid;
    
        setValues({ ...values, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
    };

    const handleLogin = (event) => {    
        event.preventDefault()
        setLoading(true)

        const errorNotify = (message) => toast.error(message, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    
        reqres.post('login', {
            email: values?.email,
            password: values?.password,
        })
        .then((response) => {
            setLoading(false);

            const dataResponse = response?.data
            const statusResponse = response?.status

            if (statusResponse === 200) {
                const authToken = dataResponse?.token

                localStorage.setItem('auth_token', authToken)
                localStorage.setItem('auth_email', values?.email);

                if (rememberMe) {
                    sessionStorage.setItem('email', values?.email);
                    sessionStorage.setItem('password', values?.password);
                    sessionStorage.setItem('rememberMe', true);
                } else {
                    sessionStorage.removeItem('email');
                    sessionStorage.removeItem('password');
                    sessionStorage.setItem('rememberMe', false);
                }

                navigate('/users')
            } else if (statusResponse === 400) {
                errorNotify(dataResponse?.error)
            }
        })
        .catch((error) => {
            setLoading(false);
            
            const dataError = error?.response?.data
            errorNotify(dataError?.error)
        });
    };

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        const storedPassword = sessionStorage.getItem('password');
        const storedRememberMe = sessionStorage.getItem('rememberMe');
    
        if (storedRememberMe === 'true') {
          setValues({ email: storedEmail, password: storedPassword });
          setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        localStorage.getItem('auth_token') && navigate('/users')
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Auth
            title = 'Login - Frontend Developer Test Case'
            kw = 'test case login, test case login id, test case login indonesia'
            desc = 'Masuk | Halaman untuk autentikasi pengguna'
        >
            <main
                className='login-component'
            >
                <section id='container_login'>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <NavLink className="flex items-center mb-6 text-[3rem] font-semibold poppins text-slate-900">
                            Test Case    
                        </NavLink>
                        <div className="w-full bg-white rounded-lg shadow-own md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="montserrat text-xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl">
                                    Login Account
                                </h1>
                                <form 
                                    onSubmit={handleLogin}
                                    className="space-y-4 md:space-y-6 montserrat"
                                >
                                    <div className="form-group">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-800">Your email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            className={`form-control border text-slate-800 sm:text-sm rounded-lg outline-none block w-full p-2.5 ${
                                                errors?.email ? 'border-red-500' : 'border-slate-300'
                                            }`} 
                                            placeholder="name@user.com" 
                                            required={true} 
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values?.email} 
                                        />
                                        {errors?.email && (
                                            <h4 className="error-message text-red-500 text-[0.85rem] font-normal mt-3">
                                            Email harus berupa alamat email yang valid!
                                            </h4>
                                        )}
                                    </div>
                                    <div className='form-group space-y-2 mt-6'> 
                                        <div className="relative">
                                            <label htmlFor="password" className="text-gray-800 font-medium">Password</label>
                                            <span className="absolute top-1 right-0" onClick={changePasswordType}>
                                                {
                                                    passwordType === "password" ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                }
                                            </span>
                                        </div>
                                        <input 
                                            id="password"
                                            name="password"
                                            type={passwordType}
                                            required={true}
                                            placeholder='masukkan password'
                                            className={`form-control border text-slate-800 sm:text-sm rounded-lg outline-none block w-full p-2.5 ${
                                                errors?.password ? 'border-red-500' : 'border-slate-300'
                                            }`}
                                            onChange={handleChange} 
                                            onBlur={handleBlur}
                                            value={values?.password}
                                        />
                                        {errors?.password && (
                                            <h4 className="error-message text-red-500 text-[0.85rem] font-normal mt-3">
                                                Sesuaikan dengan yang sudah ditentukan!
                                            </h4>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-start cursor-pointer">
                                            <div className="flex items-center h-5">
                                                <input 
                                                    id="remember" 
                                                    aria-describedby="remember" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 border border-slate-300 rounded bg-slate-50"
                                                    checked={rememberMe}
                                                    onChange={handleRememberMeChange}
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-slate-500 cursor-pointer">Remember me</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading && true} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {
                                        loading ?
                                        <Spinner/>
                                        :
                                        'Login'

                                    }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </Auth>
    )
}