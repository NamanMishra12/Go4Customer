import api from "./api";

export const getLanguages = async (
  page = 1,
  perPage = 10
) => {
  const { data } = await api.get(
    `/languages?page=${page}&per_page=${perPage}`
  );

  return data.data;
};

export const getLanguageById = async (id) => {
  const { data } = await api.get(`/languages/${id}`);

  return data.data;
};

export const createLanguage = async (payload) => {
  const { data } = await api.post(
    "/languages",
    payload
  );

  return data.data;
};

export const updateLanguage = async ({
  id,
  payload,
}) => {
  const { data } = await api.put(
    `/languages/${id}`,
    payload
  );

  return data.data;
};

export const deleteLanguage = async (id) => {
  const { data } = await api.delete(
    `/languages/${id}`
  );

  return data;
};