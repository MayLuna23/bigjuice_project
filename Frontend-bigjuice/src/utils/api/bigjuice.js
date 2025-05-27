import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
let envi;
export let BASE_API_URL = "";

if (ENVIRONMENT === "local") {
  BASE_API_URL = 'http://localhost:3000/api/bigjuice';
} else if (ENVIRONMENT === "development") {
  envi = "";
} else if (ENVIRONMENT === "production") {
  BASE_API_URL = "https://api.bigjuice.net/api/bigjuice"
}


export const getProducts = async (jwtToken) => {
  return axios
    .get(`${BASE_API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error desde la API - PRODUCTS: ${error}`);
    });
};

export const getSales = async () => {
  return axios
    .get(`${BASE_API_URL}/sales`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error desde la API - SALES: ${error}`);
    });
};

export const getSuppliers = async () => {
  return axios
    .get(`${BASE_API_URL}/suppliers`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error desde la API - SUPPLIERS: ${error}`);
    });
};

export const getInventory = async (jwtToken) => {
  return axios
    .get(`${BASE_API_URL}/ingredients`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error desde la API - INGREDIENTES: ${error}`);
    });
};
