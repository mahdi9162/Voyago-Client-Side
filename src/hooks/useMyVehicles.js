import { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const useMyVehicles = () => {
  const { user, loading: authLoading } = use(AuthContext);

  const [myVehicles, setMyVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchmyVehicles = async () => {
      setLoading(true);
      try {
        const email = user?.email;
        if (!email) {
          setLoading(false);
          return;
        }
        const url = `http://localhost:3000/my-vehicles?email=${email}`;

        const response = await axios.get(url);
        setMyVehicles(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchmyVehicles();
  }, [authLoading, user?.email]);
  return { myVehicles, loading };
};

export default useMyVehicles;
