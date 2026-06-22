import RedirectForm from "./components/RedirectForm";
import RedirectTable from "./components/RedirectTable";

function RedirectPage() {
  return (
    <div className="space-y-6">

      {/* Redirect Form Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <RedirectForm />
      </div>

      {/* Redirect Table Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <RedirectTable />
      </div>
    </div>
  );
}

export default RedirectPage;