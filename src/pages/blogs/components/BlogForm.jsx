import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import RichTextEditor from "../../../components/editor/RichTextEditor";
import { decode } from "html-entities";

import { useBlog } from "../../../hooks/blogs/useBlog";
import { useCategories } from "../../../hooks/blogs/useCategories";
import { useCreateBlog } from "../../../hooks/blogs/useCreateBlog";
import { useUpdateBlog } from "../../../hooks/blogs/useUpdateBlog";
import { useUploadBlogImage } from "../../../hooks/blogs/useUploadBlogImage";
import { useLanguages } from "../../../hooks/blogs/useLanguages";

const defaultValues = {
  title: "",
  content: "",
  page_title: "",
  meta_keywords: "",
  meta_description: "",
  blog_tags: "",
  category_id: "",
  locale: "en",
  is_active: true,
};

export default function BlogForm({
  blogId,
  onSuccess,
  onCancel,
}) {
  const [imageFile, setImageFile] = useState(null);

  const { data: categories = [] } = useCategories();
  const { data: languages = [] } = useLanguages();
  console.log(languages);
  console.log(Array.isArray(languages));
  const { data: blog } = useBlog(blogId);

  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const uploadImageMutation = useUploadBlogImage();

  const {
    register,
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (!blog) {
      reset(defaultValues);
      return;
    }

    reset({
      title: blog.title,
      content: decode(blog.content),
      page_title: blog.page_title,
      meta_keywords: blog.meta_keywords,
      meta_description: blog.meta_description,
      blog_tags: blog.blog_tags,
      category_id: blog.category?.id,
      locale: blog.locale,
      is_active: blog.is_active,
    });
  }, [blog, reset]);

  const onSubmit = async (values) => {
    try {
      let response;

      if (blogId) {
        response = await updateBlogMutation.mutateAsync({
          id: blogId,
          payload: values,
        });
      } else {
        response = await createBlogMutation.mutateAsync(values);
      }

      const id = blogId || response.id;

      if (imageFile) {
        await uploadImageMutation.mutateAsync({
          id,
          file: imageFile,
        });
      }

      reset(defaultValues);
      setImageFile(null);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {blogId ? "Edit Blog" : "Add Blog"}
        </h2>

        {blogId && (
          <button
            onClick={() => {
              reset(defaultValues);
              onCancel();
            }}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              {...register("category_id", {
                required: true,
              })}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Page Title
            </label>

            <input
              {...register("page_title")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Language
            </label>

            <select
              {...register("locale")}
              className="w-full rounded-lg border p-3"
            >
              {languages.map((language) => (
                <option
                  key={language.id}
                  value={language.abrv}
                >
                  {language.language}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Meta Keywords
            </label>

            <input
              {...register("meta_keywords")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Tags
            </label>

            <input
              {...register("blog_tags")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Meta Description
            </label>

            <textarea
              rows={4}
              {...register("meta_description")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files[0])
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="flex items-center gap-3 pt-8">
            <input
              type="checkbox"
              {...register("is_active")}
            />

            <label>Active</label>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Blog Content
            </label>

            <Controller
  name="content"
  control={control}
  render={({ field }) => (
    <RichTextEditor
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="submit"
            disabled={
              createBlogMutation.isPending ||
              updateBlogMutation.isPending
            }
            className="rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            {blogId ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}