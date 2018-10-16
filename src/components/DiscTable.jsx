import React from 'react';
import Reactable from 'react-table';

export default function DiscTable(
  {
    discs,
  }
) {
  return (
    <div>
      Reactable table!

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
          }
        ]}
        data={discs.toJS()}
      />
    </div>
  );
}
