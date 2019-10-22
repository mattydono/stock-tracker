import React from 'react';
import loading from '../../gif/loading.gif'
import { Title } from '../Root'
import styled from '@emotion/styled'

const PeersContainer = styled.div`
    max-height: 30%;
    @media(max-width: 1000px) {
        margin-bottom: 100px;
    };
    @media(max-width: 588px) {
        margin-bottom: 44.7px;
    }
`

const PeersLoadingContainer = styled.div`
    // height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media(min-width: 1700px) {
        min-width: 510px;
        min-height: height: 100%;
    }
`

const LoadingPeers = styled.img`
    height: 40px;
    border-radius: 5%;
    background-color: rgba(89, 89, 105, 0.2);
`

const ContentContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-flow: row wrap;
    color: #beccdc;
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
            <PeersContainer>
                <Title>TOP PEERS</Title>
                {!isFetchingPeers ?
                    <ContentContainer>
                        {peers.map( peer => renderPeer(peer))}
                    </ContentContainer>
                    : isFetchingPeers && !errorPeers ?
                    <PeersLoadingContainer>
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
            </PeersContainer>
    );
}

export default Peers;