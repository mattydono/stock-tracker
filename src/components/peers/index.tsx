import React from 'react';

type PeersProps = {
    peers: string[]
}

const Peers: React.FC<PeersProps> = ({ peers }) => {
    return (
        <div className='PeersContainer'>
            <span className='Title'>TOP PEERS</span>
            <div>{peers.map( peer => peer + ' ')}</div>
        </div>
    );
}

export default Peers;