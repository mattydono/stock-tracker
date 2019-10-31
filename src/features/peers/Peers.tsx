import React, { memo } from 'react';
import { Title } from '../Root'
import styled from '@emotion/styled'
import AdaptiveLoader from '../loader/Loader'

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
    margin-top: 10.2px;
    display: flex;
    flex-flow: row wrap;
    color: #beccdc;
`

const Peer = styled.span`
    margin-right: 18px;
    font-size: 14px;
    &:hover {
        color: #e0be86;
        cursor: pointer;
    }
`

type PeersProps = {
    peers: string[],
}

type ErrorLoading = {
    errorPeers: {
        message: string
    },
    isFetchingPeers: boolean,
}

const HARD_PEERS = [
    'MSFT',' NOK', 'IBM'
]

const Peers: React.FC<PeersProps & ErrorLoading> = ({ errorPeers, isFetchingPeers, peers }) => {

    const renderPeer = (peer: string) => {
        return <Peer key={peer} >{peer}</Peer>
    }

    return (
            <PeersContainer>
                <Title>TOP PEERS</Title>
                {!isFetchingPeers ?
                    <ContentContainer>
                        {HARD_PEERS.map( peer => renderPeer(peer))}
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

export default memo(Peers);