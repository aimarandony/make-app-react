import clienteAxios from "../config/AxiosConfig";

const model = "sponsor";

const getSponsors = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const getOneSponsor = async (id) => {
  const resp = await clienteAxios.get(`/${model}/${id}`);
  return resp.data;
};

const countSponsors = async () => {
  const resp = await clienteAxios.get(`/${model}/count`);
  return resp.data;
};

const createSponsor = async (data) => {
  const resp = await clienteAxios.post(`/${model}`, data);
  return resp.data;
};

const updStatusSponsor = async (id) => {
  const resp = await clienteAxios.patch(`/${model}/${id}`);
  return resp.data;
};

const updateSponsor = async (data, id) => {
  const resp = await clienteAxios.put(`/${model}/${id}`, data);
  return resp.data;
};

export {
  getSponsors,
  countSponsors,
  createSponsor,
  updateSponsor,
  getOneSponsor,
  updStatusSponsor,
};
