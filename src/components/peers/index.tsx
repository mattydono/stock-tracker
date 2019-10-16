import React from 'react';
import './index.css'
import loading from '../../gif/loading.gif'

type PeersProps = {
    peers: string[],
}

type ErrorLoading = {
    errorPeers: any,
    isFetchingPeers: boolean,
}

const Peers: React.FC<PeersProps & ErrorLoading> = ({ errorPeers, isFetchingPeers, peers }) => {
    return (
        <div className={isFetchingPeers ? 'PeersLoadingContainer' : 'PeersContainer'}>
            <span className='Title'>TOP PEERS</span>
            {errorPeers ? 
                <div className='PeersErrorContainer'>
                    <div className='PeersError'>⊗</div>
                    <div className='PeersErrorMessage'>{errorPeers.message}</div>
                </div> : 
                null
            }
            {   
                isFetchingPeers && !errorPeers ? 
                <img className='LoadingPeers' src={loading} /> : 
                <div className='contentContainer'>
                    <div>{peers.map( peer => peer + ' ')}</div>
                </div>
            }
        </div>
    );
}

export default Peers;