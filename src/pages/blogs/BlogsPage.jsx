import { useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogTable from "./components/BlogTable";

export default function BlogsPage() {
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  return (
    <div className="space-y-6">
      <BlogForm
        blogId={selectedBlogId}
        onSuccess={() => setSelectedBlogId(null)}
        onCancel={() => setSelectedBlogId(null)}
      />

      <BlogTable onEdit={setSelectedBlogId} />
    </div>
  );
}