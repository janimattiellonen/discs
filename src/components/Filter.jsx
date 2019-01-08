import React from 'react';

export default ({discs}) => {
  const getDiscCount = () => (discs.count());

  const getDistanceDriverCount = () => (
    discs.filter(disc => disc.type === 'Distance driver').count()
  );

  const getAvailableCount = () => (
    discs.filter(disc => disc.sold !== true && disc.missing !== true && disc.broken !== true).count()
  );

  const getFairwayDriverCount = () => (
    discs.filter(disc => disc.type === 'Fairway driver').count()
  );

  const getApproachCount = () => (
    discs.filter(disc => disc.type === 'Approach').count()
  );

  const getMidrangeCount = () => (
    discs.filter(disc => disc.type === 'Mid-range').count()
  );

  const getPutterCount = () => (
    discs.filter(disc => disc.type === 'Putter').count()
  );

  const getLostDiscCount = () => (
    discs.filter(disc => disc.missing === true).count()
  );

  const getSoldDiscCount = () => (
    discs.filter(disc => disc.sold === true ).count()
  );

  const getCollectibleCount = () => (
    discs.filter(disc => disc.collection_item === true).count()
  );

  return (
    <div>
      <ul>
        <li>All ({getDiscCount()})</li>
        <li>Distance drivers ({getDistanceDriverCount()})</li>
        <li>Fairway drivers ({getFairwayDriverCount()})</li>
        <li>Approach ({getApproachCount()})</li>
        <li>Midrange ({getMidrangeCount()})</li>
        <li>Fairway drivers ({getPutterCount()})</li>
        <li>Available ({getAvailableCount()})</li>
        <li>Lost ({getLostDiscCount()})</li>
        <li>Sold ({getSoldDiscCount()})</li>
        <li>Collection ({getCollectibleCount()})</li>

      </ul>
    </div>
  );
}