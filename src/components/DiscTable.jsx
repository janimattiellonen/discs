import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import Reactable from 'react-table'
import moment from 'moment'
import numeral from 'numeral'
import discUtil from '../../src/util/disc-util'

export default function DiscTable({ discs }) {
  const renderDiscManufacturer = code => {
    return discUtil.getManufacturer(code)
  }

  const renderDiscMaterial = code => {
    return discUtil.getDiscMaterial(code)
  }

  const renderDiscType = code => {
    return discUtil.getDiscType(code)
  }

  const sortFloat = (a, b) => {
    return Number.parseFloat(a) > Number.parseFloat(b) ? 1 : -1
  }

  return (
    <div>
      <Reactable
        columns={[
          {
            Header: 'Id',
            accessor: 'id',
            Cell: props => <span>{Number(props.value)}</span>,
            maxWidth: 45,
            className: 'text-right',
          },
          {
            Header: 'Name',
            accessor: 'name',
            Cell: props => <span>{props.value}</span>,
            maxWidth: 160,
          },
          {
            Header: 'Type',
            accessor: 'type',
            Cell: props => renderDiscType(props.value),
            maxWidth: 140,
          },
          {
            Header: 'Manufacturer',
            accessor: 'manufacturer',
            Cell: props => renderDiscManufacturer(props.value),
            maxWidth: 140,
          },
          {
            Header: 'Material',
            accessor: 'material',
            Cell: props => renderDiscMaterial(props.value),
            maxWidth: 140,
          },
          {
            Header: 'Weight',
            accessor: 'weight',
            Cell: props => <span>{props.value ? `${Number(props.value)}g` : ''}</span>,
            maxWidth: 75,
            className: 'text-right',
          },
          {
            Header: 'Speed',
            accessor: 'speed',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Glide',
            accessor: 'glide',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Stability',
            accessor: 'stability',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Fade',
            accessor: 'fade',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Collectible',
            accessor: 'is_collection_item',
            Cell: props => (props.value ? <Glyphicon glyph="ok" /> : ''),
            maxWidth: 75,
          },
          {
            Header: 'Sold',
            accessor: 'is_sold',
            Cell: props => (props.value ? <Glyphicon glyph="ok" /> : ''),
            maxWidth: 75,
          },
          {
            Header: 'Sold at',
            accessor: 'sold_at',
            Cell: props => (props.value ? moment(props.value).format('DD.MM.YYYY') : ''),
            maxWidth: 100,
          },
          {
            Header: 'Lost',
            accessor: 'is_missing',
            Cell: props => (props.value ? <Glyphicon glyph="ok" /> : ''),
            maxWidth: 75,
          },
          {
            Header: 'Lost description',
            accessor: 'missing_description',
            Cell: props => props.value,
            maxWidth: 160,
          },
          {
            Header: 'HIO at',
            accessor: 'hole_in_one_at',
            Cell: props => (props.value ? moment(props.value).format('DD.MM.YYYY') : ''),
            maxWidth: 100,
          },
        ]}
        data={discs.toJS()}
      />
    </div>
  )
}
