import React from 'react';
import styled from '@emotion/styled'
import { Title } from '../Root'

const PeersContainer = styled.div`
    width: 100%;
`

const Peers = ({ peers }) => {
    return (
        <PeersContainer>
            <Title>TOP PEERS</Title>
            <div>{peers.map( peer => peer + ' ')}</div>
        </PeersContainer>
    );
}

export default Peers;