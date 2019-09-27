import React from 'react';
import styled from '@emotion/styled'

const PeersContainer = styled.div`
    width: 100%;
    height:5vh;
`

const Peers = ({ peers }) => {
    return (
        <PeersContainer>
            <div>TOP PEERS</div>
            <div>{peers.map( peer => peer + ' ')}</div>
        </PeersContainer>
    );
}

export default Peers;