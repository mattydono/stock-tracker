import React from 'react';
import { _CompanyOverview } from '../../models'
import './index.css'
import loading from '../../gif/loading.gif'

type ErrorLoading = {
    errorCompany: any,
    isFetchingCompany: boolean,
}

const CompanyOverview: React.FC<_CompanyOverview & ErrorLoading> = ({ errorCompany, isFetchingCompany, companyName, symbol, website, description }) => {
    return (
        <div className={companyName && symbol && website && description ? 'CompanyOverviewContainer' : 'CompanyLoadingContainer'}>
            <div className='Title'>COMPANY OVERVIEW</div>
            {errorCompany ? 
                <div className='CompanyErrorContainer'>
                    <div className='CompanyError'>⊗</div>
                    <div className='CompanyErrorMessage'>{errorCompany.message}</div>
                </div> : 
                null
            }
            {!companyName && !symbol && !website && !description && !errorCompany ? <div className='LoadingContainer'><img className='CompanyLoading' src={loading} /> </div> :
            <div className='content'>
                <div className='FetchingContainer'>
                    <div className='Name'>{companyName}{symbol}</div>
                    {isFetchingCompany ? <img className='FetchingCompany' src={loading} /> : null}
                </div>
                <div className='Website'><a href={website ? website : undefined}><i>{website}</i></a></div>
                <div className ='Description'>{description}</div>
            </div>
            }
        </div>
    );
}

export default CompanyOverview;