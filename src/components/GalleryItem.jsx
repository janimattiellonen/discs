import React from 'react'
import _ from 'lodash';
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

    if (_.isUndefined(disc.image) || disc.image == "") {
      element = (<img src="/images/unknown.png" />);
    } else {
      let src = 'https://testdb-8e20.restdb.io/media/' + disc.image + '?s=o';
      element = <img src={src} />;
    }

    return renderTooltip(disc, element);
  }

  const renderAttribute = (attribute) => {
    return attribute.length !== 0 ? attribute : 'n/a';
  }


  return (
    <div className="disc">

      <div className="disc-image">

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
