import React from 'react';
import { _CompanyOverview } from '../../models'
import './index.css'
import loading from '../../gif/loading.gif'
import FetchingError from '../errors/errorFetching'

type ErrorLoading = {
    errorCompany: any,
    isFetchingCompany: boolean,
}

const Company: React.FC<_CompanyOverview> = ({ companyName, symbol, website, description }) => {
    return (
        <div className='content'>
            <div className='FetchingContainer'>
                <div className='Name'>{companyName}{symbol}</div>
            </div>
            <div className='Website'><a href={website ? website : undefined}><i>{website}</i></a></div>
            <div className ='Description'>{description}</div>
        </div>
    )
}

const CompanyOverview: React.FC<_CompanyOverview & ErrorLoading> = ({ errorCompany, isFetchingCompany, ...companyProps }) => {

    const CompanyError = <FetchingError message={errorCompany.message}/>

    const Loading = <div className='LoadingContainer'><img className='CompanyLoading' src={loading} /> </div>

    return (
        <div className={isFetchingCompany ? 'CompanyOverviewContainer' : 'CompanyLoadingContainer'}>
            <div className='Title'>COMPANY OVERVIEW</div>
            {
                errorCompany && !isFetchingCompany ? CompanyError 
                : isFetchingCompany ? Loading 
                : <Company {...companyProps} />
            }
        </div>
    );
}

export default CompanyOverview;