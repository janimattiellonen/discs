import React, { useEffect } from 'react'

import DiscForm from './DiscForm'

const DiscPage = ({ fetchManufacturers, fetchTypes, manufacturers, saveDisc, types }) => {
  useEffect(() => {
    fetchManufacturers()
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
