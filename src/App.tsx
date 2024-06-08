import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes as BrowserRoutes } from './routes'


function App() {
  const routes  = useRoutes(BrowserRoutes)
 return routes;
}

export default App
