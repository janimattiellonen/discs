import React from 'react';
import Reactable from 'react-table';

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

  return (
    <div>
      <Reactable
        columns={[
          {
            Header: 'Id',
            accessor: 'id',
            Cell: props => <span>{props.value}</span>,
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
            Cell: props => (<span>{props.value}g</span>),
          },
          {
            Header: 'Speed',
            'accessor': 'speed',
            Cell: props => props.value,
          },
          {
            Header: 'Glide',
            'accessor': 'glide',
            Cell: props => props.value,
          },
          {
            Header: 'Stability',
            'accessor': 'stability',
            Cell: props => props.value,
          },
          {
            Header: 'Fade',
            'accessor': 'fade',
            Cell: props => props.value,
          },
        ]}
        data={discs.toJS()}
      />
    </div>
  );
}
