import React, { memo } from 'react';

type FetchingErrorProps = {
    message: string | null
}

export const FetchingError = memo<FetchingErrorProps>(({ message }) => {
    return (
        <div className='ErrorContainer'>
            <div className='Error'>⊗</div>
            <div className='ErrorMessage'>{message}</div>
        </div>
    )
})
