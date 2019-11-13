import React from 'react'

import DiscForm from './DiscForm'

const DiscPage = ({saveDisc}) => (
  <div>
    <h1>Disc page</h1>

    <DiscForm onSave={saveDisc}/>
  </div>
)

export default DiscPage
