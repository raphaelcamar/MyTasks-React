import '../styles/global.scss';
import { UserContextProvider }from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return(
    <UserContextProvider>
      <main>
        <Component  {...pageProps} />
      </main>
    </UserContextProvider>
  )
}

export default MyApp
