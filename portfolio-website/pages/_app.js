import '../styles/globals.css'
import { Layout } from '../components'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { SanityDataProvider } from '../context/SanityData'


function MyApp({ Component, pageProps}) {
  const [loadToaster, setLoadToaster] = useState(false);
  useEffect(()=>{
    setLoadToaster(true)
  },[]);
  return (
    <Layout>
      {loadToaster && <Toaster/>}
      <SanityDataProvider>
        <Component {...pageProps} />
      </SanityDataProvider>
    </Layout>
    )
}






export default MyApp
