import { useState } from "react";

import RedirectForm from "./components/RedirectForm";
import RedirectTable from "./components/RedirectTable";

const RedirectsPage = () => {
  const [selectedRedirectId, setSelectedRedirectId] =
    useState(null);

  return (
    <div className="space-y-6">
      <RedirectForm
        redirectId={selectedRedirectId}
        onSuccess={() => setSelectedRedirectId(null)}
      />

      <RedirectTable
        onEdit={setSelectedRedirectId}
      />
    </div>
  );
};

export default RedirectsPage;