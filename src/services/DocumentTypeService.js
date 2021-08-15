import clienteAxios from "../config/AxiosConfig";

const getDocTypes = async () => {
  const resp = await clienteAxios.get("/dtype");
  return resp.data;
};

export { getDocTypes };
