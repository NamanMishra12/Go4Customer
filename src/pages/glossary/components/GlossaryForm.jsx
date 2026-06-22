import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";

import { useGlossary } from "../../../hooks/glossary/useGlossary";
import { useGlossaryCategories } from "../../../hooks/glossary/useGlossaryCategories";
import { useLanguages } from "../../../hooks/glossary/useAvailableLanguages";
import { useCreateGlossary } from "../../../hooks/glossary/useCreateGlossary";
import { useUpdateGlossary } from "../../../hooks/glossary/useUpdateGlossary";

const defaultValues = {
  question: "",
  answer_content: "",
  category_id: "",
  language_id: "",
  page_title: "",
  meta_keywords: "",
  meta_description: "",
  is_active: true,
};

const GlossaryForm = ({ glossaryId, onSuccess }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const { data: glossary } = useGlossary(glossaryId);

  const { data: categories = [] } = useGlossaryCategories();

  const { data: languages = [] } = useLanguages();

  const createMutation = useCreateGlossary();
  const updateMutation = useUpdateGlossary();

  useEffect(() => {
    if (glossaryId && glossary) {
      reset({
        question: glossary.question || "",
        answer_content: glossary.answer_content || "",
        category_id: glossary.category?.id || "",
        language_id: glossary.language?.id || "",
        page_title: glossary.page_title || "",
        meta_keywords: glossary.meta_keywords || "",
        meta_description: glossary.meta_description || "",
        is_active: glossary.is_active,
      });
    } else {
      const english = languages.find(
        (lang) => lang.abrv === "en"
      );

      reset({
        ...defaultValues,
        language_id: english?.id || "",
      });
    }
  }, [glossaryId, glossary, languages, reset]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      category_id: Number(values.category_id),
      language_id: Number(values.language_id),
    };

    try {
      if (glossaryId) {
        await updateMutation.mutateAsync({
          id: glossaryId,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      reset(defaultValues);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const loading =
    createMutation.isPending || updateMutation.isPending;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {glossaryId ? "Edit Glossary" : "Add Glossary"}
        </h2>

        {glossaryId && (
          <button
            type="button"
            onClick={() => {
              reset(defaultValues);
              onSuccess();
            }}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Language
            </label>

            <select
              {...register("language_id", {
                required: "Language is required",
              })}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select Language</option>

              {languages
                .filter((lang) => lang.is_active)
                .map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.language}
                  </option>
                ))}
            </select>

            {errors.language_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.language_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Category
            </label>

            <select
              {...register("category_id", {
                required: "Category is required",
              })}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select Category</option>

              {categories
                .filter((cat) => cat.is_active)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            {errors.category_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Question
            </label>

            <input
              {...register("question", {
                required: "Question is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.question && (
              <p className="mt-1 text-sm text-red-500">
                {errors.question.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Page Title
            </label>

            <input
              {...register("page_title")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Meta Keywords
            </label>

            <input
              {...register("meta_keywords")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Meta Description
            </label>

            <textarea
              rows={3}
              {...register("meta_description")}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Status
            </label>

            <select
              {...register("is_active")}
              className="w-full rounded-lg border p-3"
            >
              <option value={true}>Published</option>
              <option value={false}>Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Content / Answer
          </label>

          <Controller
            control={control}
            name="answer_content"
            rules={{
              required: "Content is required",
            }}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                className="mb-12"
              />
            )}
          />

          {errors.answer_content && (
            <p className="text-sm text-red-500">
              {errors.answer_content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : glossaryId
            ? "Update Glossary"
            : "Create Glossary"}
        </button>
      </form>
    </div>
  );
};

export default GlossaryForm;