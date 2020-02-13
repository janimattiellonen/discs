import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = ({ children }) => {
  const [auth0Client, setAuth0Client] = useState(null)
  const [message, setMessage] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    redirect_uri: window.location.origin,
  }

  console.log('config', config)
  useEffect(() => {
    setMessage('Test')
    console.log('MEEE: ' + message)
  }, [message])

  useEffect(() => {
    console.log('useEffect:A: ' + isAuthenticated)
    async function initializeAuth0() {
      console.log('initializeAuth0():A')
      const client = await createAuth0Client(config)
      console.log('auth0Client: ' + JSON.stringify(client, null, 2))
      setAuth0Client(client)

      if (window.location.search.includes('code=')) {
        return handleRedirectCallback(client)
      }

      const u = await client.getUser()
      console.log('U: ' + JSON.stringify(u, null, 2))
      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)
      setUser(u)
      setIsLoading(false)
    }
    initializeAuth0()
  }, [])

  const handleRedirectCallback = async client => {
    //this.setState({ isLoading: true });
    console.log('handleRedirectCallback')
    await client.handleRedirectCallback()

    //this.setState({ user, isAuthenticated: true, isLoading: false });

    setUser(client.getUser())
    setIsAuthenticated(true)
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  const configObject = {
    isLoading,
    user,
    message,
    isAuthenticated,
    loginWithRedirect: auth0Client
      ? (...p) => {
          return auth0Client.loginWithRedirect(...p)
        }
      : () => {
          console.log('NOOO :(')
        },
    getTokenSilently: auth0Client ? (...p) => auth0Client.getTokenSilently(...p) : () => {},
    getIdTokenClaims: auth0Client ? (...p) => auth0Client.getIdTokenClaims(...p) : () => {},
    logout: auth0Client ? (...p) => auth0Client.logout(...p) : () => {},
  }

  return <Auth0Context.Provider value={configObject}>{children}</Auth0Context.Provider>
}

// https://auth0.com/blog/authenticating-your-first-react-app/#Configuring-Our-Auth0-Account
