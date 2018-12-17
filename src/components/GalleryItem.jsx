import React from 'react'
import _ from 'lodash';
import numeral from 'numeral';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default ({disc}) => {
  const renderWeight = (weight) => {
    return weight > 0 ? ', ' + weight + 'g' : '';
  }

  const renderTooltip = (disc, element) => {
    if (!disc.missing_description || disc.missing_description.length == 0) {
      return element;
    }

    const tooltip = (
      <Tooltip id={"tooltip-disc-" + disc.id}>
        <span>{disc.missing_description}</span>
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        {element}
      </OverlayTrigger>
    )
  }


  const renderImage = (disc) => {
    const tooltip = (
      <Tooltip id={"tooltip-disc-" + disc.id}>
        <span>{disc.missing_description}</span>
      </Tooltip>
    );

    let element = null;

    if (_.isEmpty(disc.image_url) || disc.image_url == "") {
      element = (<img src="/unknown.png" />);
    } else {
      let src = `https://testdb-8e20.restdb.io/media/${disc.image_url}`;
      element = <img src={src} />;
    }

    return renderTooltip(disc, element);
  }

  const renderAttribute = (attribute) => {
    return attribute.length !== 0 ? numeral(attribute).format('0.[00]') : 'n/a';
  }

  const renderLostDisc = (disc) => {
    if (disc.is_missing) {
      let element = (<div className="disc-status"><span>Lost</span></div>);
      return renderTooltip(disc, element);
    }
  }

  const renderBrokenDisc = (disc) => {
    if (disc.is_broken) {
      let element = (<div className="disc-status"><span>Broken</span></div>);
      return renderTooltip(disc, element);
    }
  }

  const renderSoldDisc = (disc) => {
    if (disc.is_sold) {
      let element = (<div className="disc-status"><span>Sold</span></div>);
      return renderTooltip(disc, element);
    }
  }

  const renderHioDisc = (disc) => {
    if (disc.hole_in_one_at) {
      let element = (<div className="hole-in-one-disc"><span>Hole in one</span></div>);
      return renderTooltip(disc, element);
    }
  }

  return (
    <div className="disc">

      <div className="disc-image">
        {renderImage(disc)}

        {renderLostDisc(disc)}

        {renderSoldDisc(disc)}

        {renderBrokenDisc(disc)}

        {renderHioDisc(disc)}

      </div>

      <div className="disc-info">
        <h2>{disc.name}&nbsp;</h2>

        {
          disc.collection_item &&
          <p className="collection-item">Collection item</p>
        }

        <p className="manufacturer">{disc.manufacturer} {disc.material}&nbsp;</p>
        <p className="type">{disc.type}{renderWeight(disc.weight)}</p>

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
  );
}
