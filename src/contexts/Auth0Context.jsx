import React, { useState, useEffect } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

export const Auth0Context = React.createContext()

export const Auth0Provider = ({ children }) => {
  const [auth0Client, setAuth0Client] = useState(null)
  const [message, setMessage] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
  }

  console.log('config', config)
  useEffect(() => {
    setMessage('Test')
  }, [message])

  useEffect(() => {
    async function initializeAuth0() {
      const client = await createAuth0Client(config)
      const isAuthenticated = await client.isAuthenticated() // <-- new

      setAuth0Client(client)
      setIsAuthenticated(isAuthenticated)
    }
    initializeAuth0()
  }, [setAuth0Client])

  const configObject = {
    message,
    isAuthenticated,
    loginWithRedirect: auth0Client
      ? (...p) => auth0Client.loginWithRedirect(...p)
      : () => {
          console.log('NOOO :(')
        },
    getTokenSilently: auth0Client ? (...p) => auth0Client.getTokenSilently(...p) : () => {},
    getIdTokenClaims: auth0Client ? (...p) => auth0Client.getIdTokenClaims(...p) : () => {},
    logout: auth0Client ? (...p) => auth0Client.logout(...p) : () => {},
  }

  return <Auth0Context.Provider value={configObject}>{children}</Auth0Context.Provider>
}
