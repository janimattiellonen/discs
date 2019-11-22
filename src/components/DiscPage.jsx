import React from 'react'

import DiscForm from './DiscForm'

const DiscPage = ({ manufacturers, saveDisc, types }) => (
  <div>
    <h1>Disc page</h1>

    <DiscForm manufacturers={manufacturers} onSave={saveDisc} types={types} />
  </div>
)

export default DiscPage
