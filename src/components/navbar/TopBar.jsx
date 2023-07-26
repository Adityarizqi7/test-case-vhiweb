import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteAllCookies, getCookie } from "@/utils/cookie";

import Photo from "../image/Photo";
import profile from '@/assets/images/profile.png'
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function TopBar() {

    const navigate = useNavigate()

    const handleLogout = () => {
        deleteAllCookies()
        sessionStorage.removeItem('page')
        navigate('/', {replace: true})
    }

    return (
        <nav className="bg-white border-gray-200">
            <div className="flex flex-wrap items-center 4xs:justify-center 4xs:gap-7 p-4 border border-gray-100">
                <NavLink to={'/users'} end>
                    <span className="poppins self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Frontend DEV</span>
                </NavLink>
                <ul className="py-2 list-menu-wrapper flex items-center ml-10 montserrat xs:hidden">
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'block px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[5px]' : 'block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-[5px]'} to="/users" end >
                            Home
                        </NavLink>
                    </li>
                </ul>
                <div className="ml-auto 4xs:ml-0 flex items-center 4xs:justify-between 4xs:w-full gap-4">
                    <Menu as={'div'} className='menu-button hidden xs:block'>
                        <Menu.Button className='flex items-center gap-1 cursor-pointer'>
                            <Bars3Icon className='w-10 h-10 hover:bg-slate-100 p-1 rounded-full transition-colors duration-300 ui-open:bg-slate-100 ui-open:p-1 ui-open:rounded-full' />
                        </Menu.Button>
                        <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className='absolute right-5 4xs:left-5 z-[2] mt-5 w-56 5xs:w-[7rem] divide-y divide-gray-100 rounded-md bg-white shadow-own montserrat text-slate-800'>
                                <div className='px-1 py-1'>
                                    <Menu.Item>
                                        <NavLink className={({isActive}) => isActive ? 'bg-blue-base/40 hover:bg-blue-base/80 text-slate-600 w-full px-2 py-2 rounded-md block' : 'hover:bg-blue-base/40 hover:text-slate-900 w-full px-2 py-2 rounded-md block'} to="/users" end>
                                            Home
                                        </NavLink>
                                    </Menu.Item>    
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as={'div'} className='profile-button'>
                        <div className='flex items-center gap-1'>
                            <Photo 
                                path={profile}
                                path_light={profile}
                                alt='Image Profile'
                                className="w-[54px] rounded-full"
                                caption={`<h4 style='font-family: montserrat;'>${getCookie('auth_email')} • Test Case</h4>`}
                            />
                            <Menu.Button>
                                <ChevronDownIcon className='w-7 h-7 hover:bg-slate-100 p-1 rounded-full transition-colors duration-300 ui-open:bg-slate-100 ui-open:p-1 ui-open:rounded-full' />
                            </Menu.Button>
                        </div>
                        <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className='absolute right-5 z-[2] mt-3 w-56 5xs:w-[7rem] divide-y divide-gray-100 rounded-md bg-white shadow-own montserrat text-slate-800'>
                                <div className='px-1 py-1'>
                                    <Menu.Item>
                                        <button
                                        onClick={handleLogout}
                                        className='w-full px-2 py-2 text-left text-pink-base hover:bg-blue-base hover:text-slate-100 rounded-md'
                                        >
                                            Logout
                                        </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}