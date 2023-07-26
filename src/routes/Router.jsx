import { Routes, Route } from 'react-router-dom'

/* Auth Page */
import Login from '@/pages/auth/Login'

/* User Page */
import Users from '@/pages/Users'
import UserDetail from '@/pages/UserDetail'

/* Support Component */
import ScrollPage from '@/components/button/ScrollPageButton'
// import NotFound from '@/pages/NotFound'


export default function Router() {
    return (
        <ScrollPage>
            <Routes>
                <Route path='users' element={<Users />} />
                <Route path='users/:id' element={<UserDetail />} />
                <Route path='/' element={<Login />} />

                {/* <Route path='*' element={<NotFound />} /> */}
            </Routes>
        </ScrollPage>
    )
}