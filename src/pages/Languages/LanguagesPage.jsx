import { useState } from "react";

import LanguageForm from "./components/LanguageForm";
import LanguageTable from "./components/LanguageTable";

const LanguagesPage = () => {
  const [selectedLanguageId, setSelectedLanguageId] =
    useState(null);

  return (
    <div className="space-y-6">
      <LanguageForm
        languageId={selectedLanguageId}
        onSuccess={() => setSelectedLanguageId(null)}
      />

      <LanguageTable
        onEdit={setSelectedLanguageId}
      />
    </div>
  );
};

export default LanguagesPage;