import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#06231D]">
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 flex gap-6 pt-6 pb-10">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  </div>
);

export default Layout;
