import React from 'react';
import styled from '@emotion/styled'
import { Title } from '../Root'

const PeersContainer = styled.div`
    // flex: 0 0 30px;
    @media(max-width: 800px) {margin-bottom: 40px;};
`

type PeersProps = {
    peers: string[]
}

const Peers: React.FC<PeersProps> = ({ peers }) => {
    return (
        <PeersContainer>
            <Title>TOP PEERS</Title>
            <div>{peers.map( peer => peer + ' ')}</div>
        </PeersContainer>
    );
}

export default Peers;