import reqres from "@/api/reqres";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useCallback, useState, useRef } from "react";

import '../styles/pages/_users.scss'

import TestCase from "@/layouts/TestCase";
import { ChevronLeftIcon, ChevronRightIcon, ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import Dot from "@/components/loading/Dot";
import Photo from "@/components/image/Photo";
import { NavLink } from "react-router-dom";

export default function Users() { 

    const inputRef = useRef()
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([])
    const [, setFocusInput] = useState(false)
    const [searchUser, setSearchProduct] = useState('');

    const handleChangeSearchUserInput = useCallback(
        e => setSearchProduct(e.target.value),
        []
    )

    const deleteText = useCallback(() => setSearchProduct(''), [])

    const handleFocusInput = useCallback(
        event => {
            if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
                setFocusInput(true)
                event.preventDefault()
                inputRef.current.focus()
            }
            if (event.code === 'Escape') inputRef.current.blur() || deleteText()
        },
        [inputRef, deleteText]
    )

    const getUsersList = useCallback(() => {    
        
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

        reqres.get(`users?page=${page}`)
        .then((response) => {
            setLoading(false);

            const dataResponse = response?.data?.data
            const statusResponse = response?.status

            if (statusResponse === 200) {
                setUsers(dataResponse)
            }
        })
        .catch((error) => {
            setLoading(false);
            
            const dataError = error?.response?.data
            errorNotify(dataError?.error)
        });
    }, [page]);

    const handlePageChange = (page) => {
        setPage(page);
        sessionStorage.setItem('page', JSON.stringify(page));
    };

    useEffect(() => {
        const storedPage = sessionStorage.getItem('page');
        if (storedPage) {
            setPage(JSON.parse(storedPage));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleFocusInput)

        return () => {
            document.removeEventListener('keydown', handleFocusInput)
        }
    }, [handleFocusInput])

    useEffect(() => {
        getUsersList()
    }, [getUsersList])

    return (
        <TestCase
            title = 'Users List - Frontend Developer Test Case'
            kw = 'test case users list, test case users list id, test case users list indonesia'
            desc = 'Users List | Halaman untuk menampilkan daftar pengguna'
        >
            <main
                className='users-component'
            >
                <section id='container_users'>
                    <div className="user-search-section mt-8 font-medium flex flex-wrap gap-6 justify-between items-center">
                        <div className='search-user montserrat xs:w-full xs:order-2 w-[45%]'>
                            <div className='box-search inter w-full relative'>
                                <input
                                    type='text'
                                    name='search-user'
                                    autoComplete='off'
                                    className={`bg-transparent pr-[3rem] focus:outline-none focus:ring-0 pl-0`}
                                    placeholder='Search user ...'
                                    onChange={handleChangeSearchUserInput}
                                    ref={inputRef}
                                    value={searchUser}
                                />
                                {searchUser !== '' && (
                                    <>
                                        <kbd
                                            onClick={deleteText}
                                            className='montserrat absolute top-[0.85rem] right-0 hidden cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:block'
                                        >
                                            Esc
                                        </kbd>
                                        <kbd
                                            onClick={deleteText}
                                            className='montserrat absolute top-[0.85rem] right-0 block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:hidden'
                                        >
                                            Del
                                        </kbd>
                                    </>
                                )}
                                {
                                    <h1
                                        onClick={() => inputRef.current.focus()}
                                        className={`${
                                            searchUser !== '' ? 'hidden' : 'block'
                                        } inter absolute top-[1.15rem] right-0 text-[14px] font-semibold text-gray-400`}
                                    >
                                        Ctrl K
                                    </h1>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="all-user-table mt-10 overflow-x-auto">
                    {
                        loading ?
                        <Dot classDot='bg-black' className="mt-2 justify-center" />
                        :
                        <table className="w-full text-[1.05rem] text-neutral-800">
                            <thead className="text-white uppercase bg-gray-600 poppins text-left">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Fullname
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Firstname
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Lastname
                                    </th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="montserrat">
                            {
                                users?.length < 1 ?
                                (
                                    <tr className="bg-white border-b">
                                        <td colSpan={7} className="px-6 py-4 text-[1.25rem]">
                                            Empty data users
                                        </td>
                                    </tr>
                                )  
                                :
                                users
                                ?.filter(value => {
                                    // eslint-disable-line array-callback-return
                                    if (searchUser === '')
                                        return value
                                    if (
                                        value?.email
                                            ?.toLowerCase()
                                            .includes(
                                                searchUser
                                                    ?.toLowerCase()
                                                    .trim()
                                            ) ||
                                        value?.first_name
                                        ?.toLowerCase()
                                        .includes(
                                            searchUser
                                                ?.toLowerCase()
                                                .trim()
                                        ) ||
                                        value?.last_name
                                        ?.toLowerCase()
                                        .includes(
                                            searchUser
                                                ?.toLowerCase()
                                                .trim()
                                        )
                                    ) {
                                        return value
                                    }
                                })
                                ?.map( (element) => {
                                    return (
                                        <tr key={element?.id} className="bg-white border-b">
                                            <td className="px-6 py-4">
                                                {element?.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap items-center gap-5">
                                                    <Photo 
                                                        className='w-[64px] rounded-full'
                                                        path={element?.avatar}
                                                        alt={element?.first_name + ' ' + element?.last_name}
                                                    />
                                                    <span>
                                                        {element?.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {element?.first_name + ' ' + element?.last_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element?.first_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element?.last_name}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <NavLink to={`/users/${element?.id}`} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                                    <ViewfinderCircleIcon className="w-6 h-6 mr-2" />
                                                    <span>See user</span>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    }
                    </div>
                    <div className="pagination">
                        <div className="flex flex-wrap gap-3 mt-8 justify-end poppins">
                            {
                                page < 2 ?
                                <>
                                    <button
                                        className='pointer-events-none bg-blue-500 text-gray-100 outline-none mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded transition-colors duration-300'
                                    >
                                        {1}
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(2)}
                                        className='cursor-pointer hover:bg-gray-300 hover:text-slate-800 outline-none mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded transition-colors duration-300'
                                    >
                                        {2}
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(2)}
                                        className={`bg-blue-800 text-gray-100 outline-none mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded`}
                                    >
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </button>
                                </>
                                :
                                <>
                                    <button
                                        onClick={() => handlePageChange(1)}
                                        className='cursor-pointer hover:bg-gray-300 hover:text-slate-800 outline-none mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded transition-colors duration-300'
                                    >
                                        {1}
                                    </button>
                                    <button
                                        className='pointer-events-none bg-blue-500 text-gray-100 outline-none mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded transition-colors duration-300'
                                    >
                                        {2}
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(1)}
                                        className={`bg-blue-800 text-gray-100 outline-none mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded`}
                                    >
                                        <ChevronLeftIcon className="w-5 h-5" />
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </TestCase>
    )
}