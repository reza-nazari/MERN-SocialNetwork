import Landing from '../containers/Landing/Landing';
import Register from '../containers/Auth/Register/Register';
import Login from '../containers/Auth/Login/Login';
import Logout from '../containers/Auth/Logout/Logout';
import Dashboard from '../containers/Dashboard/Dashboard';
import CreateProfile from '../containers/Create_Profile/CreateProfile';


const routes = [
    {
        path: '/',
        component: Landing,
        isPrivate: false

    },
    {
        path: '/Dashboard',
        component: Dashboard,
        isPrivate: true
    },
    {
        path: '/Register',
        component: Register,
        isPrivate: false

    },
    {
        path: '/Login',
        component: Login,
        isPrivate: false

    },
    {
        path: '/Logout',
        component: Logout,
        isPrivate: false

    },
    {
        path: '/create-profile',
        component: CreateProfile,
        isPrivate: true
    }

]

export default routes