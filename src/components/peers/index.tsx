import React from 'react';
import loading from '../../gif/loading.gif'
import { Title } from '../Root'
import styled from '@emotion/styled'

const PeersContainer = styled.div`
    height: 25%;
`

const PeersLoadingContainer = styled.div`
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LoadingPeers = styled.img`
    height: 100px;
    padding-left: 35%;
    padding-right: 35%;
    border-radius: 5%;
    background-color: rgba(89, 89, 105, 0.2);
`

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

type PeersProps = {
    peers: string[],
    isFetchingPeers: boolean,
    errorPeers: boolean,
}

const Peers: React.FC<PeersProps> = ({ errorPeers, isFetchingPeers, peers }) => {
    return (
        <>
        {!isFetchingPeers ?
        <PeersContainer>
            <Title>TOP PEERS</Title>
            <ContentContainer>
                <div>{peers.map( peer => peer + ' ')}</div>
            </ContentContainer>
        </PeersContainer>
        :
        <PeersLoadingContainer>
            <Title>TOP PEERS</Title>
            <LoadingPeers src={loading} /> 
        </PeersLoadingContainer>
        }
        </>
    );
}

export default Peers;