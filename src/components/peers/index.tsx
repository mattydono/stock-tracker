import React from 'react';
import './index.css'
import loading from '../../gif/loading.gif'

type PeersProps = {
    peers: string[],
    isFetchingPeers: boolean,
}

const Peers: React.FC<PeersProps> = ({ isFetchingPeers, peers }) => {
    return (
        <div className={peers.length <= 1 ? 'PeersLoadingContainer' : 'PeersContainer'}>
            <span className='Title'>TOP PEERS</span>
            { peers.length < 2 ? <img className='LoadingPeers' src={loading} /> : <div className='contentContainer'><div>{peers.map( peer => peer + ' ')}</div>{isFetchingPeers ? <img className='FetchingPeers' src={loading} /> : null}</div> }
        </div>
    );
}

export default Peers;