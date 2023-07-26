import { useParams } from 'react-router'
import { toast, ToastContainer } from "react-toastify";
import { useCallback, useState, useEffect } from "react";

import '../styles/pages/_userdetail.scss'

import reqres from "@/api/reqres";
import TestCase from "@/layouts/TestCase";
import Photo from '@/components/image/Photo';
import { IdentificationIcon } from '@heroicons/react/24/solid';
import Dot from '@/components/loading/Dot';

export default function UserDetail() {

    const { id } = useParams()

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)

    const getUserDetail = useCallback(() => {    
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

        reqres.get(`users/${id}`)
        .then((response) => {
            setLoading(false);

            const dataResponse = response?.data?.data
            const statusResponse = response?.status

            if (statusResponse === 200) {
                setUser(dataResponse)
            }
        })
        .catch((error) => {
            setLoading(false);
            
            const dataError = error?.response?.data
            errorNotify(dataError?.error)
        });
    }, [id]);

    useEffect(() => {
        getUserDetail()
    }, [getUserDetail])

    return (
        <TestCase
            title = {`${user?.first_name} ${user?.last_name} - Frontend Developer Test Case`}
            kw = 'test case users detail, test case users detail id, test case users detail indonesia'
            desc = 'User Detail | Halaman untuk menampilkan detail pengguna'
        >
            <main
                className='user-detail-component'
            >
                <section id='container_user_detail'>
                {
                    loading ?
                    <Dot classDot='bg-black' className="mt-8 pl-4" />
                    :
                    <article className='user-wrapper py-8'>
                        <div className='user__image-name pl-4 flex 4xs:flex-col gap-3'>
                            <Photo 
                                path={user?.avatar}
                                className='w-[137px] h-[137px] rounded-[10px]'
                                alt={`${user?.first_name} ${user?.last_name}`}
                                caption={`<h4 style='font-family: montserrat;'>${user?.first_name} ${user?.last_name} • Test Case</h4>`}
                            />
                            <div className="user__first-last-name mt-2 pl-4 4xs:pl-0 space-y-2 montserrat truncate">
                                <h1 className='text-slate-800 font-bold text-[18px] poppins'>{`${user?.first_name} ${user?.last_name}`}</h1>
                                <div className='flex items-center gap-2'>
                                    <IdentificationIcon className='w-5 h-5' />
                                    <h3 className='text-slate-500'>{`${user?.last_name}, ${user?.first_name}.`}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="user__email mt-5 pl-4 montserrat">
                            <h5 className='text-slate-500 mb-1'>Email address</h5>
                            <h3 className='text-slate-900 font-medium truncate'>{`${user?.email}`}</h3>
                        </div>
                    </article>
                }
                </section>
                <ToastContainer />
            </main>
        </TestCase>
    )
}