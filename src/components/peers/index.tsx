import React from 'react';
import './index.css'
import loading from '../../gif/loading.gif'

type PeersProps = {
    peers: string[],
    isFetchingPeers: boolean,
}

const Peers: React.FC<PeersProps> = ({ isFetchingPeers, peers }) => {
    return (
        <div className={isFetchingPeers ? 'PeersLoadingContainer' : 'PeersContainer'}>
            <span className='Title'>TOP PEERS</span>
            {   
                isFetchingPeers ? 
                <img className='LoadingPeers' src={loading} /> : 
                <div className='contentContainer'>
                    <div>{peers.map( peer => peer + ' ')}</div>
                </div>
            }
        </div>
    );
}

export default Peers;