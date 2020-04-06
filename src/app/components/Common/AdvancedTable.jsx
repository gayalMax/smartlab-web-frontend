/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Paper } from '@material-ui/core';
import MaterialTable from 'material-table';

import tableIcons from './TableIcons';

const AdvancedTable = ({ ...other }) => {
  return (
    <div>
      <MaterialTable
        components={{
          Container: props => <Paper {...props} elevation={0} />
        }}
        icons={tableIcons}
        title=""
        options={{
          exportButton: true,
          search: true
        }}
        {...other}
      />
    </div>
  );
};

export default AdvancedTable;
