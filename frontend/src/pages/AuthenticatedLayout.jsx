import Sidebar from "../components/Sidebar";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div id="outer-container">
      <Sidebar />
      <main id="page-wrap" className="min-h-screen p-6 bg-gray-900 text-white overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
