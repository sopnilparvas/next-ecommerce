import Navbar from "./Navbar";
import Notify from "./Notify";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Notify />
      <div className='container'>{children}</div>
    </>
  );
}

export default Layout;
