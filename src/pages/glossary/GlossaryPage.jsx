import { useState } from "react";
import GlossaryForm from "./components/GlossaryForm";
import GlossaryTable from "./components/GlossaryTable";

const GlossaryPage = () => {
  const [selectedGlossaryId, setSelectedGlossaryId] =
    useState(null);

  return (
    <div className="space-y-6">
      <GlossaryForm
        glossaryId={selectedGlossaryId}
        onSuccess={() => setSelectedGlossaryId(null)}
      />

      <GlossaryTable
        onEdit={setSelectedGlossaryId}
      />
    </div>
  );
};

export default GlossaryPage;