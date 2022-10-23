import '../styles/globals.css'
import '../styles/mobile.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Container,Nav} from 'react-bootstrap';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className='w-full bg-[#00a884] -z-1 h-[200px] text-white text-4xl'> FN-APP </div>
    <Component {...pageProps} />
    </>
    
  );
}

export default MyApp
