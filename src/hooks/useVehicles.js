import axios from 'axios';
import { useEffect, useState } from 'react';

const useVehicles = (dataLink) => {
  const [vehicles, setVehiclse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${dataLink}`);
        setVehiclse(response);
      } catch (err) {
        setError('Could not fetch vehicle data.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [dataLink]);
  return { vehicles, loading, error };
};

export default useVehicles;
