import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import AllVehicles from '../Pages/Vehicles/AllVehicles';
import AddVehicle from '../Pages/Vehicles/AddVehicle';
import MyVehicles from '../Pages/Vehicles/MyVehicles';
import MyBookings from '../Pages/Bookings/MyBookings';
import Signup from '../Pages/Auth/Signup';
import VehicleDetails from '../Pages/Vehicles/VehicleDetails';
import PrivateRoute from './PrivateRoute';
import UpdateVehicle from '../Pages/Vehicles/UpdateVehicle';
import NotFound from '../Pages/Error/NotFound';
import ContactUs from '../Pages/Home/Sections/ContactUs';
import AboutUs from '../Pages/Footer/AboutUs';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/all-vehicles',
        Component: AllVehicles,
      },
      {
        path: '/add-vehicle',
        element: (
          <PrivateRoute>
            <AddVehicle></AddVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-vehicles',
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/Signup',
        Component: Signup,
      },
      {
        path: '/vehicle-details/:id',
        element: <VehicleDetails></VehicleDetails>,
      },
      {
        path: '/update-vehicle/:id',
        element: (
          <PrivateRoute>
            <UpdateVehicle></UpdateVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: '/contact-us',
        Component: ContactUs,
      },
      {
        path: '/about-us',
        Component: AboutUs,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
