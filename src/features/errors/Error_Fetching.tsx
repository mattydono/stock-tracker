import React, { memo } from 'react';

type FetchingErrorProps = {
    message: string | null
}

const FetchingError: React.FC<FetchingErrorProps> = ({ message }) => {
    return (
        <div className='ErrorContainer'>
            <div className='Error'>⊗</div>
            <div className='ErrorMessage'>{message}</div>
        </div>
    )
}

export default memo(FetchingError);