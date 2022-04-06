
import Navbar from "components/Navbar";
import "bulma/css/bulma.min.css";
import ActiveResource from "components/Active";
const Layout = ({children}) =>
  <>
    <Navbar />
    <ActiveResource />
    { children }
  </>

export default Layout;
