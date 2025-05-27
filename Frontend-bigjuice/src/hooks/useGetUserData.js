import { BASE_API_URL } from "../utils/api/bigjuice";
import axios from "axios";
import { useState, useEffect } from "react";

export const useGetUserData = (jwtToken) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/users/data`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [jwtToken]);

  return { userData, error };
};
