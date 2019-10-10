import React from 'react';
import { _CompanyOverview } from '../../models'
import './index.css'
import loading from '../../gif/loading.gif'

const CompanyOverview: React.FC<_CompanyOverview> = ({ errorCompany, isFetchingCompany, companyName, symbol, website, description }) => {

    console.log(errorCompany)

    return (
        <div className={companyName && symbol && website && description ? 'CompanyOverviewContainer' : 'CompanyLoadingContainer'}>
            <div className='Title'>COMPANY OVERVIEW</div>
            {!companyName || !symbol || !website || !description ? <div className='LoadingContainer'><img className='CompanyLoading' src={loading} /> </div> :
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