import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { useGlossaries } from "../../../hooks/glossary/useGlossaries";
import { useDeleteGlossary } from "../../../hooks/glossary/useDeleteGlossary";

const GlossaryTable = ({ onEdit }) => {
  const [page, setPage] = useState(1);

  const perPage = 10;

  const { data, isLoading } = useGlossaries(
    page,
    perPage
  );

  const deleteMutation = useDeleteGlossary();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this glossary item?"
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
        Glossary List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left">
                Question
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Language
              </th>

              <th className="px-4 py-3 text-left">
                Views
              </th>

              <th className="px-4 py-3 text-left">
                Status
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
            ) : (
              data?.items?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="px-4 py-3">
                    {item.question}
                  </td>

                  <td className="px-4 py-3">
                    {item.category?.name}
                  </td>

                  <td className="px-4 py-3">
                    {item.language?.language}
                  </td>

                  <td className="px-4 py-3">
                    {item.total_views}
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
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="rounded-lg border p-2"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="rounded-lg border p-2 text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GlossaryTable;