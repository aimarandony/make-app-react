import clienteAxios from "../config/AxiosConfig";

const getCountries = async () => {
  const resp = await clienteAxios.get("/country");
  return resp.data;
};

export { getCountries };
