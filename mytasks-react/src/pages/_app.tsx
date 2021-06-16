import '../styles/global.scss';
import { UserContextProvider }from '../contexts/UserContext';
import Layout from '../Layout/Layout';

function MyApp({ Component, pageProps }) {

  return(
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp;
