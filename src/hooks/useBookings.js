import { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const useBookings = () => {
  const { user, loading: authLoading } = use(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const email = user?.email;
        if (!email) {
          setLoading(false);
          return;
        }
        const url = `https://voyago-server-side.vercel.app/bookings?email=${email}`;

        const response = await axios.get(url);
        setBookings(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [authLoading, user?.email]);
  return { bookings, loading };
};

export default useBookings;
