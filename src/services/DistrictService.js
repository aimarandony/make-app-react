import clienteAxios from "../config/AxiosConfig";

const getDistricts = async () => {
  const resp = await clienteAxios.get("/district");
  return resp.data;
};

export { getDistricts };
