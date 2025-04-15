/*
* FILE : AuthenticatedLayout.jsx
* PROJECT : Moneo
* PROGRAMMER : Group 6
* FIRST VERSION : 14/03/2025
* DESCRIPTION :
* This component wraps protected pages with a sidebar and styled main content layout for logged-in users.
*/
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
