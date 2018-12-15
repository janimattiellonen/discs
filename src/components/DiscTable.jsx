import React from 'react';
import Reactable from 'react-table';
import moment from 'moment';
import numeral from 'numeral';
import discUtil from '../../src/util/disc-util';

export default function DiscTable(
  {
    discs,
  }
) {
  const renderDiscManufacturer= (code) => {
    return discUtil.getManufacturer(code);
  };

  const renderDiscMaterial = (code) => {
    return discUtil.getDiscMaterial(code);
  };

  const renderDiscType = (code) => {
    return discUtil.getDiscType(code);
  };

  const sortFloat = (a, b) => {
    return Number.parseFloat(a) > Number.parseFloat(b) ? 1 : -1;
  };

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
            'accessor': 'name',
            Cell: props => <span>{props.value}</span>,
          },
          {
            Header: 'Type',
            'accessor': 'type',
            Cell: props => (renderDiscType(props.value)),
          },
          {
            Header: 'Manufacturer',
            'accessor': 'manufacturer',
            Cell: props => (renderDiscManufacturer(props.value)),
          },
          {
            Header: 'Material',
            'accessor': 'material',
            Cell: props => (renderDiscMaterial(props.value)),
          },
          {
            Header: 'Weight',
            'accessor': 'weight',
            Cell: props => (<span>{props.value  ? `${Number(props.value)}g` : ''}</span>),
            maxWidth: 75,
            className: 'text-right',
          },
          {
            Header: 'Speed',
            'accessor': 'speed',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Glide',
            'accessor': 'glide',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Stability',
            'accessor': 'stability',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat,
          },
          {
            Header: 'Fade',
            'accessor': 'fade',
            Cell: props => numeral(props.value).format('0.[00]'),
            maxWidth: 75,
            className: 'text-right',
            sortMethod: sortFloat
          }
        ]}
        data={discs.toJS()}
      />
    </div>
  );
}
