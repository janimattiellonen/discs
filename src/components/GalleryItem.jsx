import React from 'react'
import _ from 'lodash'
import numeral from 'numeral'
import Tooltip from '@material-ui/core/Tooltip'
import moment from 'moment'

import { DiscStatus } from './DiscStatus'

import unknown from '../unknown.png'

export default ({ disc }) => {
  const renderWeight = disc => (disc.weight > 0 ? `, ${disc.weight}g` : '')

  const renderOverlayTrigger = (tooltip, element) => element

  const renderTooltip = element => {
    if (
      (!disc.missing_description || disc.missing_description.length === 0) &&
      (!disc['Donation description'] || disc['Donation description'].length === 0)
    ) {
      return element
    }

    const tooltip = (
      <Tooltip id={`tooltip-disc-${disc.id}`} placement="bottom">
        <span>{disc.missing_description || disc['Donation description']}</span>
      </Tooltip>
    )

    return renderOverlayTrigger(tooltip, element)
  }

  const renderHioTooltip = element => {
    if (!disc['HIO date']) {
      return element
    }

    const tooltip = (
      <Tooltip id={`tooltip-disc-hio-${disc.id}`}>
        <span>{moment(disc['HIO date']).format('DD.MM.YYYY')}</span>
      </Tooltip>
    )

    return renderOverlayTrigger(tooltip, element)
  }

  const renderImage = () => {
    let element = null

    if (_.isEmpty(disc.image)) {
      element = <img src={unknown} alt="?" />
    } else {
      let src = `https://testdb-8e20.restdb.io/media/${disc.image[0]}`
      element = <img src={src} alt="" />
    }

    return renderTooltip(element)
  }

  const renderAttribute = attribute => {
    return numeral(attribute).format('0.[00]')
  }

  const renderLostDisc = () => {
    if (disc.missing) {
      return renderTooltip(<DiscStatus label={'Lost'} />)
    }
  }

  const renderBrokenDisc = () => {
    if (disc.broken) {
      return renderTooltip(<DiscStatus label={'Broken'} />)
    }
  }

  const renderSoldDisc = () => {
    if (disc.sold) {
      return renderTooltip(
        <DiscStatus
          label={`Sold ${!!disc.sold_for && disc.sold_for > 0 ? ` (${numeral(disc.sold_for).format('0.00')}€)` : ''}`}
        />
      )
    }
  }

  const renderDonatedDisc = () => {
    if (disc.Donated) {
      return renderTooltip(<DiscStatus label={'Donated'} />)
    }
  }

  const renderHioDisc = () => {
    if (disc['Hole in one']) {
      let element = (
        <div className="HoleInOne">
          <span>Hole in one</span>
        </div>
      )
      return renderHioTooltip(element)
    }
  }

  const renderPrice = () => {
    if (disc.price_status === 'gift') {
      return 'Gift'
    } else if (disc.price_status === 'price_unknown') {
      return 'n/a'
    } else if (disc.price > 0) {
      return `${numeral(disc.price).format('0.00')} €`
    }
  }

  return (
    <div>
      <div className="discImage">
        {renderImage()}

        {renderLostDisc()}

        {renderSoldDisc()}

        {renderDonatedDisc()}

        {renderBrokenDisc()}

        {renderHioDisc()}
      </div>

      <div>
        <h2>
          {disc.name}&nbsp;{disc.collection_item && <p className="collectionItem">Collection item</p>}
        </h2>

        <div className="manufacturer">
          <p className="manufacturer">
            {disc.manufacturer} {disc.material}
            {renderWeight(disc)}
          </p>
          <p className="type">{disc.type}</p>
          <p />
        </div>
        <div className="price">{renderPrice(disc)}</div>

        <div className="specs">
          <div className="attribute speed">
            <h3>Speed</h3>
            <p>{renderAttribute(disc.speed)}</p>
          </div>
          <div className="attribute glide">
            <h3>Glide</h3>
            <p>{renderAttribute(disc.glide)}</p>
          </div>

          <div className="attribute stability">
            <h3>Stability</h3>
            <p>{renderAttribute(disc.stability)}</p>
          </div>

          <div className="attribute fade2">
            <h3>Fade</h3>
            <p>{renderAttribute(disc.fade)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
