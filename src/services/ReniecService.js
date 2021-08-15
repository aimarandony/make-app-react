import axios from "axios";

let APIReniecURL = "http://servicio.dayangels.com/api/reniec/dni";
let token =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkwMDc4MDQsImlzcyI6ImxvY2FsaG9zdCIsInVzZXJfaWQiOjQzMDN9.VTVuYjExvDHoMyZHnT0FZmW-szLt6233IXsIKwgtOWA";

const getDataOfReniec = async (data) => {
  const resp = await axios.post(APIReniecURL, data, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return resp.data;
};

export { getDataOfReniec };
