import React from 'react'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { Col, Row, FormControl } from 'react-bootstrap'

export default ({ discs, onSearch }) => {
  const getDiscCount = () => discs.count()

  const getDistanceDriverCount = () => discs.filter(disc => disc.type === 'Distance driver').count()

  const getAvailableCount = () =>
    discs.filter(disc => disc.is_sold !== true && disc.is_missing !== true && disc.is_broken !== true).count()

  const getFairwayDriverCount = () => discs.filter(disc => disc.type === 'Fairway driver').count()

  const getApproachCount = () => discs.filter(disc => disc.type === 'Approach').count()

  const getMidrangeCount = () => discs.filter(disc => disc.type === 'Mid-range').count()

  const getPutterCount = () => discs.filter(disc => disc.type === 'Putter').count()

  const getLostDiscCount = () => discs.filter(disc => disc.is_missing === true).count()

  const getSoldDiscCount = () => discs.filter(disc => disc.is_sold === true).count()

  const getDonatedDiscCount = () => discs.filter(disc => disc.is_donated === true).count()

  const getCollectibleCount = () => discs.filter(disc => disc.is_collection_item === true).count()

  const getOwnStampCount = () => discs.filter(disc => disc.is_own_stamp === true).count()

  const getHoleInOneCount = () => discs.filter(disc => disc.is_hole_in_one === true).count()

  const getMoneySpentOnDiscs = () =>
    numeral(discs.filter(disc => disc.price > 0).reduce((total, value) => total + value.price, 0)).format('0.00')

  const getCountForDiscsWithPrice = () => discs.filter(disc => disc.price > 0).count()

  const renderPrice = () => {
    const spentMoney = getMoneySpentOnDiscs()
    const discsWithPrice = getCountForDiscsWithPrice()
    const discCount = getDiscCount()

    return (
      <li title={`${discsWithPrice} discs of ${discCount} has its price set.`}>
        {spentMoney} € ({discsWithPrice} / {discCount})
      </li>
    )
  }

  if (discs.count() === 0) {
    return null
  }

  const handleSearch = e => {
    onSearch(e.target.value)
  }

  return (
    <div className="disc-filter">
      <ul>
        <li>
          <Link to="/gallery">All ({getDiscCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=distanceDriver">Distance drivers ({getDistanceDriverCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=fairwayDriver">Fairway drivers ({getFairwayDriverCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=approach">Approach ({getApproachCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=midrange">Midrange ({getMidrangeCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=putter">Putters ({getPutterCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=available">Available ({getAvailableCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=missing">Lost ({getLostDiscCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=sold">Sold ({getSoldDiscCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=donated">Donated ({getDonatedDiscCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=collection">Collection ({getCollectibleCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=ownStamp">Own stamp ({getOwnStampCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=holeInOne">Hole in one ({getHoleInOneCount()})</Link>
        </li>
        <li>
          <Link to="/gallery?type=latest">Latest (10)</Link>
        </li>
        {renderPrice()}
      </ul>

      <Row>
        <Col>
          <FormControl type="text" onChange={handleSearch} />
        </Col>
      </Row>
    </div>
  )
}
