import React from 'react'
import _ from 'lodash'
import numeral from 'numeral'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import moment from 'moment'

import styles from './GalleryItem.module.scss'

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
      element = <img src="/unknown.png" alt="?" />
    } else {
      let src = `https://testdb-8e20.restdb.io/media/${disc.image[0]}?s=w`
      element = <img src={src} alt="" />
    }

    return renderTooltip(element)
  }

  const renderAttribute = attribute => {
    return numeral(attribute).format('0.[00]')
  }

  const renderLostDisc = () => {
    if (disc.missing) {
      let element = (
        <div className={styles.discStatus}>
          <span>Lost</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderBrokenDisc = () => {
    if (disc.is_broken) {
      let element = (
        <div className={styles.discStatus}>
          <span>Broken</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderSoldDisc = () => {
    if (disc.sold) {
      let element = (
        <div className={styles.discStatus}>
          <span>Sold</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderDonatedDisc = () => {
    if (disc.Donated) {
      let element = (
        <div className={styles.discStatus}>
          <span>Donated</span>
        </div>
      )
      return renderTooltip(element)
    }
  }

  const renderHioDisc = () => {
    if (disc['Hole in one']) {
      let element = (
        <div className={styles.HoleInOne}>
          <span>Hole in one</span>
        </div>
      )
      return renderHioTooltip(element)
    }
  }

  const renderPrice = () => {
    if (disc.price > 0) {
      return `${numeral(disc.price).format('0.00')} €`
    }
  }

  return (
    <div className={styles.disc}>
      <div className={styles.discImage}>
        {renderImage()}

        {renderLostDisc()}

        {renderSoldDisc()}

        {renderDonatedDisc()}

        {renderBrokenDisc()}

        {renderHioDisc()}
      </div>

      <div>
        <h2>{disc.name}&nbsp;</h2>

        {disc.collection_item && <p className={styles.collectionItem}>Collection item</p>}

        <div className={styles.manufacturer}>
          <p className={styles.manufacturer}>
            {disc.manufacturer} {disc.material}
            {renderWeight(disc)}
          </p>
          <p className={styles.type}>{disc.type}</p>
          <p />
        </div>
        <div className={styles.price}>{renderPrice(disc)}</div>

        <div className={styles.specs}>
          <div className={`${styles.attribute} ${styles.speed}`}>
            <h3>Speed</h3>
            <p>{renderAttribute(disc.speed)}</p>
          </div>
          <div className={`${styles.attribute} ${styles.glide}`}>
            <h3>Glide</h3>
            <p>{renderAttribute(disc.glide)}</p>
          </div>

          <div className={`${styles.attribute} ${styles.stability}`}>
            <h3>Stability</h3>
            <p>{renderAttribute(disc.stability)}</p>
          </div>

          <div className={`${styles.attribute} ${styles.fade2}`}>
            <h3>Fade</h3>
            <p>{renderAttribute(disc.fade)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
