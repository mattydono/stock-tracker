import styled from '@emotion/styled';

export const ChartContainer = styled.div`    
    flex: 0 1 66%;
    margin-top: 15px;
    margin-left: -35px;
    font-size: 10px;
    font-weight: 300;
    max-width: 890px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-right: -30px;
        margin-bottom: -10px;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 60px;
    font-family: 300;
    font-size: 12px;
    color: #beccdc;
`

const LabelRange = styled.div`
    margin: 0rem 0rem 1rem 0.5rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    font-weight: 100;
    text-transform: uppercase;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

const ChartLoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 250px;
    @media(max-width: 750px) {
        margin-top: 10px;
        margin-bottom: 50px;
    }
`
