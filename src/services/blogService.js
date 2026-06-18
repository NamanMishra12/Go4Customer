import api from "./api";

export const getBlogs = async (page = 1, perPage = 10) => {
  const { data } = await api.get(
    `/blogs?page=${page}&per_page=${perPage}`
  );

  return data.data;
};

export const getBlogById = async (id) => {
  const { data } = await api.get(`/blogs/${id}`);

  return data.data;
};

export const getCategories = async () => {
  const { data } = await api.get("/blogs/categories");

  return data.data;
};

export const createBlog = async (payload) => {
  const { data } = await api.post("/blogs", payload);

  return data.data;
};

export const updateBlog = async ({ id, payload }) => {
  const { data } = await api.put(`/blogs/${id}`, payload);

  return data.data;
};

export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`);

  return data;
};

export const uploadBlogImage = async ({ id, file }) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    `/blogs/${id}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};