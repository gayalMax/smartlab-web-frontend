/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import MaterialTable from 'material-table';

import tableIcons from './TableIcons';

const AdvancedTable = ({ filtering, grouping, ...other }) => {
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
          filtering,
          grouping
        }}
        {...other}
      />
    </div>
  );
};

AdvancedTable.defaultProps = {
  filtering: false,
  grouping: false
};

AdvancedTable.propTypes = {
  filtering: PropTypes.bool,
  grouping: PropTypes.bool
};

export default AdvancedTable;
