import React from 'react';
import loading from '../../gif/loading.gif'
import { Title } from '../Root'
import styled from '@emotion/styled'

const PeersContainer = styled.div`
    height: 25%;
    @media(max-width: 588px) {
        margin-bottom: 50px;
    }
`

const PeersLoadingContainer = styled.div`
    // height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LoadingPeers = styled.img`
    height: 40px;
    border-radius: 5%;
    background-color: rgba(89, 89, 105, 0.2);
`

const ContentContainer = styled.div`
    margin-top: 10px;
    display: flex;
`

const Peer = styled.span`
    margin-right: 15px;
    &:hover {
        color: #e0be86;
        cursor: pointer;
    }
`

type PeersProps = {
    peers: string[],
}

type ErrorLoading = {
    errorPeers: any,
    isFetchingPeers: boolean,
}

const Peers: React.FC<PeersProps & ErrorLoading> = ({ errorPeers, isFetchingPeers, peers }) => {

    const renderPeer = (peer: string) => {
        return <Peer>{peer}</Peer>
    }

    return (
        <>
            {!isFetchingPeers ?
            <PeersContainer>
                <Title>TOP PEERS</Title>
                <ContentContainer>
                    {peers.map( peer => renderPeer(peer))}
                </ContentContainer>
            </PeersContainer>
            : isFetchingPeers && !errorPeers ?
            <PeersLoadingContainer>
                <Title>TOP PEERS</Title>
                <LoadingPeers src={loading} /> 
            </PeersLoadingContainer>
            :
            <>
                {errorPeers ? 
                    <div className='PeersErrorContainer'>
                        <div className='PeersError'>⊗</div>
                        <div className='PeersErrorMessage'>{errorPeers.message}</div>
                    </div> : 
                    null
                }
            </>
            }
        </>
    );
}

export default Peers;