import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { useBlogs } from "../../../hooks/blogs/useBlogs";
import { useDeleteBlog } from "../../../hooks/blogs/useDeleteBlog";

export default function BlogTable({ onEdit }) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useBlogs(page, 10);

  const deleteMutation = useDeleteBlog();

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorFn: (row) => row.category?.name,
      },
      {
        header: "Language",
        accessorKey: "locale",
      },
      {
        header: "Author",
        accessorFn: (row) =>
          `${row.author?.firstname} ${row.author?.lastname}`,
      },
      {
        header: "Status",
        accessorFn: (row) =>
          row.is_active ? "Active" : "Inactive",
      },
      {
        header: "Created",
        accessorFn: (row) =>
          new Date(row.created_at).toLocaleDateString(),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(row.original.id)}
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() =>
                deleteMutation.mutate(row.original.id)
              }
            >
              <Trash2
                size={18}
                className="text-red-500"
              />
            </button>
          </div>
        ),
      },
    ],
    [onEdit, deleteMutation]
  );

  const table = useReactTable({
    data: data?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Blogs
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-4"
                  >
                    {flexRender(
                      cell.column.columnDef.cell ??
                        cell.column.columnDef.accessorFn ??
                        cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded border px-4 py-2"
        >
          Previous
        </button>

        <span>
          {page} /{" "}
          {Math.ceil(
            (data?.total || 0) / (data?.per_page || 10)
          )}
        </span>

        <button
          disabled={
            page >=
            Math.ceil(
              (data?.total || 0) /
                (data?.per_page || 10)
            )
          }
          onClick={() => setPage((p) => p + 1)}
          className="rounded border px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}