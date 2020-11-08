import React from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import styled from '@emotion/styled'

const selectedStyle = {
    backgroundColor: 'blue',
    color: 'white',
    cursor: 'pointer'
}

const notSelectedStyle = {
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer'
}

const ListContainer = styled('div')`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center
`
const ListItemComponent = ({data, selected, setSelected}) => data.map(item => (
    <ListGroupItem
        style={
            selected === item.id ? selectedStyle : notSelectedStyle
        }
        key={item.id}
        onClick={() => setSelected(selected === item.id ? '' : item.id)}
    >
        {item.model}
    </ListGroupItem>
))

const List = ({ data, selected, setSelected }) => {
    return (
        <ListContainer>
        <ListGroup
            style={{
                width: '100%'
            }}
        >
            <ListItemComponent
                data={data}
                selected={selected}
                setSelected={setSelected}
            />
        </ListGroup>
        <Button color='primary'>
            Criar Produto
        </Button>
        </ListContainer>
    )
}

export default List