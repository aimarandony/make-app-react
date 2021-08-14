import Axios from "axios";

const URL = "https://apimiracle.herokuapp.com/api";

const clienteAxios = Axios.create({
  baseURL: URL,
});

export default clienteAxios;
