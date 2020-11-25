import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import { colors as colorOptions } from '../../utils/constants';

const MeasureDetails = ({
  details,
}) => (
  <Table>
    <thead>
      <tr>
        <th>Medidas </th>
        {details.map((item) => (
          <th style={{ textAlign: 'center' }}>{item.measure}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cores</td>
        {details.map((detail) => (
          <td>
            {detail.colors.map((color) => {
              const findColor = colorOptions.find((colorItem) => colorItem.id === color.colorId);
              return (
                <div style={{
                  backgroundColor: findColor.hex, borderRadius: '50%', width: '15px', height: '15px', margin: 'auto',
                }}
                />
              );
            })}
          </td>
        ))}
      </tr>
    </tbody>
  </Table>
);

MeasureDetails.propTypes = {
  details: PropTypes.objectOf().isRequired,
};

export default MeasureDetails;
