import clienteAxios from "../config/AxiosConfig";

const getInstitutes = async () => {
  const resp = await clienteAxios.get("/institute");
  return resp.data;
};

export { getInstitutes };
