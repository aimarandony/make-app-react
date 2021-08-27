import clienteAxios from "../config/AxiosConfig";

const getScholarships = async () => {
  const resp = await clienteAxios.get("/scholarship");
  return resp.data;
};

export { getScholarships };
