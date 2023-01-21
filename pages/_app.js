import '../styles/globals.css'
import '../styles/mobile.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Container,Nav} from 'react-bootstrap';
function MyApp({ Component, pageProps }) {
  return (
    <>
    
    <Component {...pageProps} />
    </>
    
  );
}

export default MyApp
