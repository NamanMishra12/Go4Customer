import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLanguage } from "../../../hooks/languages/useLanguage";
import { useCreateLanguage } from "../../../hooks/languages/useCreateLanguage";
import { useUpdateLanguage } from "../../../hooks/languages/useUpdateLanguage";

const defaultValues = {
  language: "",
  abrv: "",
  charset: "",
  default_currency: "USD",
  published: false,
  is_active: true,
};

const LanguageForm = ({ languageId, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { data: language } = useLanguage(languageId);

  const createMutation = useCreateLanguage();
  const updateMutation = useUpdateLanguage();

  useEffect(() => {
    if (languageId && language) {
      reset({
        language: language.language,
        abrv: language.abrv,
        charset: language.charset,
        default_currency: language.default_currency,
        published: language.published,
        is_active: language.is_active,
      });
    } else {
      reset(defaultValues);
    }
  }, [languageId, language, reset]);

  const onSubmit = async (values) => {
    try {
      if (languageId) {
        await updateMutation.mutateAsync({
          id: languageId,
          payload: values,
        });
      } else {
        await createMutation.mutateAsync(values);
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
          {languageId ? "Edit Language" : "Add Language"}
        </h2>

        {languageId && (
          <button
            type="button"
            onClick={() => {
              reset(defaultValues);
              onSuccess();
            }}
            className="rounded-lg border px-4 py-2"
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
              Language Name
            </label>

            <input
              {...register("language", {
                required: "Language is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.language && (
              <p className="mt-1 text-sm text-red-500">
                {errors.language.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Abbreviation
            </label>

            <input
              {...register("abrv", {
                required: "Abbreviation is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.abrv && (
              <p className="mt-1 text-sm text-red-500">
                {errors.abrv.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Charset
            </label>

            <input
              {...register("charset", {
                required: "Charset is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.charset && (
              <p className="mt-1 text-sm text-red-500">
                {errors.charset.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Default Currency
            </label>

            <input
              {...register("default_currency")}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("published")}
            />
            Published
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("is_active")}
            />
            Active
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : languageId
            ? "Update Language"
            : "Create Language"}
        </button>
      </form>
    </div>
  );
};

export default LanguageForm;