import React from 'react';
import loading from '../../gif/loading.gif'
import { Title } from '../Root'
import styled from '@emotion/styled'
import AdaptiveLoader from '../loader'

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    @media(max-width: 750px) {
        margin-top: 50px;
        margin-bottom: 50px;
    }
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
                        <AdaptiveLoader size={50} seperation={2} speed={1.4} /> 
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