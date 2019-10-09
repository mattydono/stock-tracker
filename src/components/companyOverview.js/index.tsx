import React from 'react';
import { _CompanyOverview } from '../../models'
import './index.css'

const CompanyOverview: React.FC<_CompanyOverview> = ({ companyName, symbol, website, description }) => {
    return (
        <div className='CompanyOverviewContainer'>
            <div className='Title'>COMPANY OVERVIEW</div>
            <div className='content'>
                <div className='Name'>{companyName}{symbol}</div>
                <div className='Website'><a href={website ? website : undefined}><i>{website}</i></a></div>
                <div className ='Description'>{description}</div>
            </div>
        </div>
    );
}

export default CompanyOverview;