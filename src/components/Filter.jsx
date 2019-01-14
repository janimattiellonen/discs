import React from 'react';
import { Link } from 'react-router-dom';

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

  const getHoleInOneCount = () => (
    discs.filter(disc => disc['Hole in one'] === true).count()
  );


  if (discs.count() === 0) {
    return null;
  }

  return (
    <div className="disc-filter">
      <ul>
        <li><Link to="/gallery">All ({getDiscCount()})</Link></li>
        <li><Link to="/gallery?type=distanceDriver">Distance drivers ({getDistanceDriverCount()})</Link></li>
        <li><Link to="/gallery?type=fairwayDriver">Fairway drivers ({getFairwayDriverCount()})</Link></li>
        <li><Link to="/gallery?type=approach">Approach ({getApproachCount()})</Link></li>
        <li><Link to="/gallery?type=midrange">Midrange ({getMidrangeCount()})</Link></li>
        <li><Link to="/gallery?type=putter">Putters ({getPutterCount()})</Link></li>
        <li><Link to="/gallery?type=available">Available ({getAvailableCount()})</Link></li>
        <li><Link to="/gallery?type=missing">Lost ({getLostDiscCount()})</Link></li>
        <li><Link to="/gallery?type=sold">Sold ({getSoldDiscCount()})</Link></li>
        <li><Link to="/gallery?type=collection">Collection ({getCollectibleCount()})</Link></li>
        <li><Link to="/gallery?type=holeInOne">Hole in one ({getHoleInOneCount()})</Link></li>
      </ul>
    </div>
  );
}