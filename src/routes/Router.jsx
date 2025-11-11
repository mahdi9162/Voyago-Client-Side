import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import AllVehicles from '../Pages/Vehicles/AllVehicles';
import AddVehicle from '../Pages/Vehicles/AddVehicle';
import MyVehicles from '../Pages/Vehicles/MyVehicles';
import MyBookings from '../Pages/Bookings/MyBookings';
import NotFound from '../Pages/Error/NotFound';

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
        Component: AddVehicle,
      },
      {
        path: '/my-vehicles',
        Component: MyVehicles,
      },
      {
        path: '/my-bookings',
        Component: MyBookings,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
