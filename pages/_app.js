import Navbar from '@/components/Navbar'
import AuthContext, { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (<>
  <AuthContextProvider>
    <Navbar/>
  <Component {...pageProps} />
  </AuthContextProvider>
  </>)
}
