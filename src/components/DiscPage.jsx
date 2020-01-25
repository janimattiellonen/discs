import React, { useEffect } from 'react'

import { useAuth0 } from '../contexts/Auth0Context'

import DiscForm from './DiscForm'

const DiscPage = ({ fetchManufacturers, fetchTypes, manufacturers, saveDisc, types }) => {
  const { getTokenSilently } = useAuth0()

  useEffect(() => {
    const foo = async () => {
      const token = await getTokenSilently()

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

      <DiscForm manufacturers={manufacturers} onSave={saveDisc} types={types} />
    </div>
  )
}

export default DiscPage
