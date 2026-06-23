import api from "./api";

export const getRedirects = async (
  page = 1,
  perPage = 10
) => {
  const { data } = await api.get(
    `/redirects?page=${page}&per_page=${perPage}`
  );

  return data.data;
};

export const getRedirectById = async (id) => {
  const { data } = await api.get(
    `/redirects/${id}`
  );

  return data.data;
};

export const createRedirect = async (payload) => {
  const { data } = await api.post(
    "/redirects",
    payload
  );

  return data.data;
};

export const updateRedirect = async ({
  id,
  payload,
}) => {
  const { data } = await api.put(
    `/redirects/${id}`,
    payload
  );

  return data.data;
};

export const deleteRedirect = async (id) => {
  const { data } = await api.delete(
    `/redirects/${id}`
  );

  return data;
};