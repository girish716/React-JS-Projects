import '../styles/globals.css'
import {Layout} from '../components'
import {StateContext} from '../context/StateContext'
import { Toaster } from 'react-hot-toast'

// here Component will be the component that is currently in use
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    )
}

export default MyApp
