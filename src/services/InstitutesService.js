import clienteAxios from "../config/AxiosConfig";

const getInstitutes = async () => {
  const resp = await clienteAxios.get("/institutes");
  return resp.data;
};

export { getInstitutes };
