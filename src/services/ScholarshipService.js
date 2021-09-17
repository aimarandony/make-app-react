import clienteAxios from "../config/AxiosConfig";

const model = "scholarships";

const getScholarships = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const getScholarshipsPaginator = async (pageNo, pageSize) => {
  const resp = await clienteAxios.get(`/${model}/${pageNo}/${pageSize}`);
  return resp.data;
};

const getScholarshipCount = async () => {
  const resp = await clienteAxios.get(`/${model}/count`);
  return resp.data;
};

const getOneScholarship = async (id) => {
  const resp = await clienteAxios.get(`/${model}/detail/${id}`);
  return resp.data;
};

const createScholarship = async (data) => {
  const resp = await clienteAxios.post(`/${model}`, data);
  return resp.data;
};

const updateScholarship = async (id, data) => {
  const resp = await clienteAxios.put(`/${model}/${id}`, data);
  return resp.data;
};

export {
  getScholarships,
  getScholarshipsPaginator,
  getScholarshipCount,
  createScholarship,
  updateScholarship,
  getOneScholarship,
};
