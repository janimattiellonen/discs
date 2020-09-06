import React, { useEffect } from 'react'

import DiscForm from './DiscForm'

const DiscPage = ({ fetchManufacturers, fetchTypes, manufacturers, saveDisc, types }) => {
  const doSaveDisc = values => {}

  useEffect(() => {
    const foo = async () => {
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
