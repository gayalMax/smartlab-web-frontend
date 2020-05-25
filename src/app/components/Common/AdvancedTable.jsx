/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import MaterialTable from 'material-table';

import tableIcons from './TableIcons';

const AdvancedTable = ({ filtering, ...other }) => {
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
          search: true,
          filtering
        }}
        {...other}
      />
    </div>
  );
};

AdvancedTable.defaultProps = {
  filtering: false
};

AdvancedTable.propTypes = {
  filtering: PropTypes.bool
};

export default AdvancedTable;
