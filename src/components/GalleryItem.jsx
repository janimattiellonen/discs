import React from 'react'
import _ from 'lodash';
import numeral from 'numeral';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from "moment";

import styles from './GalleryItem.module.scss';

export default ({disc}) => {
  const renderWeight = (weight) => (
    weight > 0 ? ', ' + weight + 'g' : ''
  )

  const renderOverlayTrigger = (tooltip, element) => (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      {element}
    </OverlayTrigger>
  )

  const renderTooltip = (disc, element) => {
    if (!disc.missing_description || disc.missing_description.length === 0) {
      return element;
    }

    const tooltip = (
      <Tooltip id={"tooltip-disc-" + disc.id}>
        <span>{disc.missing_description}</span>
      </Tooltip>
    );

    return renderOverlayTrigger(tooltip, element)
  }

  const renderHioTooltip = (disc, element) => {
    if (!disc['HIO date']) {
      return element;
    }

    const tooltip = (
      <Tooltip id={"tooltip-disc-hio-" + disc.id}>
        <span>{moment(disc['HIO date']).format('DD.MM.YYYY')}</span>
      </Tooltip>
    );

    return renderOverlayTrigger(tooltip, element)
  }

  const renderImage = (disc) => {
    const tooltip = (
      <Tooltip id={"tooltip-disc-" + disc.id}>
        <span>{disc.missing_description}</span>
      </Tooltip>
    );

    let element = null;

    if (_.isEmpty(disc.image) ) {
      element = (<img src="/unknown.png" alt="?" />);
    } else {
      let src = `https://testdb-8e20.restdb.io/media/${disc.image[0]}`;
      element = <img src={src} alt="" />;
    }

    return renderTooltip(tooltip, element);
  }

  const renderAttribute = (attribute) => {
    return numeral(attribute).format('0.[00]');
  }

  const renderLostDisc = (disc) => {
    if (disc.missing) {
      let element = (<div className={styles.discStatus}><span>Lost</span></div>);
      return renderTooltip(disc, element);
    }
  }

  const renderBrokenDisc = (disc) => {
    if (disc.is_broken) {
      let element = (<div className={styles.discStatus}><span>Broken</span></div>);
      return renderTooltip(disc, element);
    }
  }

  const renderSoldDisc = (disc) => {
    if (disc.sold) {
      let element = (<div className={styles.discStatus}><span>Sold</span></div>);
      return renderTooltip(disc, element);
    }
  }

  const renderHioDisc = (disc) => {
    if (disc['Hole in one']) {
      let element = (<div className={styles.HoleInOne}><span>Hole in one</span></div>);
      return renderHioTooltip(disc, element);
    }
  }

  return (
    <div className={styles.disc}>
      <div className={styles.discImage}>
        {renderImage(disc)}

        {renderLostDisc(disc)}

        {renderSoldDisc(disc)}

        {renderBrokenDisc(disc)}

        {renderHioDisc(disc)}
      </div>

      <div>
        <h2>{disc.name}&nbsp;</h2>

        {disc.collection_item && (
          <p className={styles.collectionItem}>Collection item</p>
        )}

        <p className={styles.manufacturer}>{disc.manufacturer} {disc.material}&nbsp;</p>
        <p className={styles.type}>{disc.type}{renderWeight(disc.weight)}</p>

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
  );
}
