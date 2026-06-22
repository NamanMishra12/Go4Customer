import api from "./api";

export const getGlossaries = async (
  page = 1,
  perPage = 10
) => {
  const { data } = await api.get(
    `/glossary?page=${page}&per_page=${perPage}`
  );

  return data.data;
};

export const getGlossaryById = async (id) => {
  const { data } = await api.get(`/glossary/${id}`);

  return data.data;
};

export const getGlossaryCategories = async () => {
  const { data } = await api.get("/glossary/categories");

  return data.data;
};

export const getLanguages = async (
  page = 1,
  perPage = 50
) => {
  const { data } = await api.get(
    `/languages?page=${page}&per_page=${perPage}`
  );

  return data.data.items;
};

export const createGlossary = async (payload) => {
  const { data } = await api.post("/glossary", payload);

  return data.data;
};

export const updateGlossary = async ({
  id,
  payload,
}) => {
  const { data } = await api.put(
    `/glossary/${id}`,
    payload
  );

  return data.data;
};

export const deleteGlossary = async (id) => {
  const { data } = await api.delete(`/glossary/${id}`);

  return data;
};