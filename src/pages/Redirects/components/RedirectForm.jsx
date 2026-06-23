import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useRedirect } from "../../../hooks/redirects/useRedirect";
import { useCreateRedirect } from "../../../hooks/redirects/useCreateRedirect";
import { useUpdateRedirect } from "../../../hooks/redirects/useUpdateRedirect";

const defaultValues = {
  from_url: "",
  prtcl: "https://",
  to_url: "",
  redirect_type: 301,
  is_active: true,
};

const RedirectForm = ({
  redirectId,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { data: redirect } =
    useRedirect(redirectId);

  const createMutation =
    useCreateRedirect();

  const updateMutation =
    useUpdateRedirect();

  useEffect(() => {
    if (redirectId && redirect) {
      reset({
        from_url: redirect.from_url,
        prtcl: redirect.prtcl,
        to_url: redirect.to_url,
        redirect_type:
          redirect.redirect_type,
        is_active: redirect.is_active,
      });
    } else {
      reset(defaultValues);
    }
  }, [
    redirectId,
    redirect,
    reset,
  ]);

  const onSubmit = async (values) => {
    try {
      if (redirectId) {
        await updateMutation.mutateAsync({
          id: redirectId,
          payload: values,
        });
      } else {
        await createMutation.mutateAsync(
          values
        );
      }

      reset(defaultValues);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const loading =
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {redirectId
            ? "Edit Redirect"
            : "Add Redirect"}
        </h2>

        {redirectId && (
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
              From URL
            </label>

            <input
              {...register("from_url", {
                required:
                  "From URL is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.from_url && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.from_url
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              To URL
            </label>

            <input
              {...register("to_url", {
                required:
                  "To URL is required",
              })}
              className="w-full rounded-lg border p-3"
            />

            {errors.to_url && (
              <p className="mt-1 text-sm text-red-500">
                {errors.to_url.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Protocol
            </label>

            <select
              {...register("prtcl")}
              className="w-full rounded-lg border p-3"
            >
              <option value="https://">
                https://
              </option>

              <option value="http://">
                http://
              </option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Redirect Type
            </label>

            <select
              {...register(
                "redirect_type"
              )}
              className="w-full rounded-lg border p-3"
            >
              <option value={301}>
                301 - Permanent
              </option>

              <option value={302}>
                302 - Temporary
              </option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("is_active")}
          />
          Active
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          {loading
            ? "Saving..."
            : redirectId
            ? "Update Redirect"
            : "Create Redirect"}
        </button>
      </form>
    </div>
  );
};

export default RedirectForm;