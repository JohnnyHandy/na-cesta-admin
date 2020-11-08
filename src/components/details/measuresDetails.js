import React from 'react'
import { Table } from 'reactstrap'

import { colors } from '../../utils/constants'

const MeasureDetails = ({
    details
}) => {
    console.log('details', details)
    return (
        <Table>
            <thead>
                <tr> 
                <th>Medidas </th>
                {details.map(item => (
                    <th style={{ textAlign: 'center' }} >{item.measure}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cores</td>
                {details.map(detail =>
                <td
                >                        
                    {detail.colors.map(color => {
                    const findColor = colors.find(colorItem => colorItem.id === color)
                    return <div style={{ backgroundColor: findColor.hex, borderRadius: '50%', width: '15px', height: '15px', margin: 'auto' }} />
                })}
                </td>
                )}
                </tr>
            </tbody>
        </Table>
    )
}

export default MeasureDetails