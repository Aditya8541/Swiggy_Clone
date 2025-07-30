import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Contact from '../components/Contact.jsx'
import Error from '../components/Error.jsx'
import {createBrowserRouter ,  RouterProvider  , Outlet} from 'react-router-dom'
import Body from '../components/Body.jsx'
import ResMenu from '../components/ResMenu.jsx'
import { lazy , Suspense} from 'react'
import Shimmer from '../components/Shimmer.jsx'
import Cart from '../components/Cart.jsx'

const About = lazy(() => import('../components/About.jsx'))


const appRoute = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children : [
            {
                path:'/',
                element:<Body/>

            },
            {
                path:'/about',
                element:<Suspense fallback={<Shimmer/>}>
                    <About/>
                </Suspense>
            },

            {
                path:'/contact',
                element:<Contact/>
            }
            , 

            {
                path:'/cart',
                element: <Cart/>
            },

            {
                path:'restaurants/:resid',
                element:<ResMenu/>
            }
        ],

        errorElement: <Error />,
        
    },

])



createRoot(document.getElementById('root')).render(

   <RouterProvider router={appRoute} />
)
