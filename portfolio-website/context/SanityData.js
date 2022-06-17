import React, {createContext, useContext, useState} from 'react'

const Context = createContext()

const SanityDataProvider = ({children}) => {
  const [data, setData] = useState({})
  
  const storeData = (data)=>{
     setData(data)
  }
  
  return (
    <Context.Provider value={{data, storeData}}>
     {children}
    </Context.Provider>
  )
}

const useSanityData = () => useContext(Context)

export { SanityDataProvider, useSanityData }