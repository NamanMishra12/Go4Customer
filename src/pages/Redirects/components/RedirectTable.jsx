import { useState } from "react";
import {
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";

import { useRedirects } from "../../../hooks/redirects/useRedirects";
import { useDeleteRedirect } from "../../../hooks/redirects/useDeleteRedirect";

const RedirectTable = ({ onEdit }) => {
  const [page, setPage] = useState(1);

  const perPage = 10;

  const { data, isLoading } = useRedirects(
    page,
    perPage
  );

  const deleteMutation = useDeleteRedirect();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this redirect?"
    );

    if (!confirmed) return;

    await deleteMutation.mutateAsync(id);
  };

  const totalPages = Math.ceil(
    (data?.total || 0) / perPage
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Redirect List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left">
                From URL
              </th>

              <th className="px-4 py-3 text-left">
                To URL
              </th>

              <th className="px-4 py-3 text-left">
                Type
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Created
              </th>

              <th className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : data?.items?.length ? (
              data.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="max-w-xs px-4 py-3 break-all">
                    {item.from_url}
                  </td>

                  <td className="max-w-xs px-4 py-3 break-all">
                    {item.to_url}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {item.redirect_type}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {item.created_at
                      ? new Date(
                          item.created_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <a
                        href={item.to_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border p-2 text-green-600 hover:bg-green-50"
                        title="Visit"
                      >
                        <ExternalLink
                          size={16}
                        />
                      </a>

                      <button
                        onClick={() =>
                          onEdit(item.id)
                        }
                        className="rounded-lg border p-2"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className="rounded-lg border p-2 text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-slate-500"
                >
                  No redirects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={
            page >= totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RedirectTable;