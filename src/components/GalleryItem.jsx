import React from 'react'
import _ from 'lodash'
import numeral from 'numeral'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import moment from 'moment'

export default ({ disc }) => {
  const renderWeight = disc => (disc.weight > 0 ? `, ${disc.weight}g` : '')

  const renderOverlayTrigger = (tooltip, element) => (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      {element}
    </OverlayTrigger>
  )

  const renderTooltip = element => {
    if (
      (!disc.missing_description || disc.missing_description.length === 0) &&
      (!disc['Donation description'] || disc['Donation description'].length === 0)
    ) {
      return element
    }

    const tooltip = (
      <Tooltip id={`tooltip-disc-${disc.id}`}>
        <span>{disc.missing_description || disc['Donation description']}</span>
      </Tooltip>
    )

    return renderOverlayTrigger(tooltip, element)
  }

  const renderHioTooltip = element => {
    if (!disc.hole_in_one_date) {
      return element
    }

    const tooltip = (
      <Tooltip id={`tooltip-disc-hio-${disc.id}`}>
        <span>{moment(disc.hole_in_one_date).format('DD.MM.YYYY')}</span>
      </Tooltip>
    )

    return renderOverlayTrigger(tooltip, element)
  }

  const renderImage = () => {
    let element = null

    if (_.isEmpty(disc.image)) {
      element = <img src="/unknown.png" alt="?" />
    } else {
      let src = `http://127.0.0.1:8000/uploads/images/discs/${disc.image}`
      element = <img src={src} alt="" />
    }

    return renderTooltip(element)
  }

  const renderAttribute = attribute => {
    return numeral(attribute).format('0.[00]')
  }

  const renderLostDisc = () => {
    if (disc.is_missing) {
      let element = (
        <div className="discStatus">
          <span>Lost</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderBrokenDisc = () => {
    if (disc.is_broken) {
      let element = (
        <div className="discStatus">
          <span>Broken</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderSoldDisc = () => {
    if (disc.is_sold) {
      let element = (
        <div className="discStatus">
          <span>Sold</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderDonatedDisc = () => {
    if (disc.is_donated) {
      let element = (
        <div className="discStatus">
          <span>Donated</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderHioDisc = () => {
    if (disc.is_hole_in_one) {
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
        <h2>{disc.name}&nbsp;</h2>

        {disc.is_collection_item && <p className="collectionItem">Collection item</p>}

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
