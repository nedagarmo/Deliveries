import IRoute from '../interfaces/route';
import OrderDetailsPage from '../pages/orders/details';
import NewOrderPage from '../pages/orders/new';
import HomePage from '../pages/home';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Orders',
        component: HomePage,
        exact: true
    },
    {
        path: '/orders/new',
        name: 'New Order',
        component: NewOrderPage,
        exact: true
    },
    {
        path: '/orders/:id',
        name: 'Order Detail',
        component: OrderDetailsPage,
        exact: true
    },
]

export default routes;