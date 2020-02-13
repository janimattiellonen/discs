import React, { useEffect, useState } from 'react'

import { useAuth0 } from '../react-auth0-spa'

import DiscForm from './DiscForm'


const DiscPage = ({ fetchManufacturers, fetchTypes, manufacturers, saveDisc, types }) => {
  const { getTokenSilently } = useAuth0()

  const [token, setToken] = useState(null);

  const doSaveDisc = (values) => {
    saveDisc(values, token);
  }

  useEffect(() => {
    const foo = async () => {
      const token = await getTokenSilently()

      setToken(token);
      console.log('ttt: ' + token)
      fetchManufacturers()
    }

    foo()
  }, [])

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <div>
      <h1>Disc page</h1>

      <DiscForm manufacturers={manufacturers} onSave={doSaveDisc} types={types} />
    </div>
  )
}

export default DiscPage
