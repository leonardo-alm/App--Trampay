import IRoute from '../interfaces/route';
import SendCSVPage from '../pages/sendcsv';
import ClientsPage from '../pages/clients';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register Page',
        component: RegisterPage
    },
    {
        path: '/clients',
        name: 'Client Page',
        component: ClientsPage
    },
    {
        path: '/sendcsv',
        name: 'Send CSV Page',
        component: SendCSVPage
    },
]

export default routes;