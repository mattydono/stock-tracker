import React, { RefObject, Dispatch, SetStateAction, memo, KeyboardEvent } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { AppState }  from '../../../models'
import { updateTicker } from '../redux'

const SearchBarLayoutContainer = styled.div`
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: center;
    position: relative;
`

const InputLabelOverlay = styled.label`
    position: absolute;
    top: 1px;
    left: 52px;
    font-weight: 300;
    opacity: 1;
    overflow: auto;
    display: flex;
    z-index: 1;
    @media(max-width: 650px) {
        margin-top: 5px;
    };
    @media(max-width: 500px) {
        margin-top: 5px;
    };
`

const LabelName = styled.div`
    flex: 1 0 0;
    min-height: 30px;
    overflow: auto;
`

const LabelSymbol = styled.div`
    flex: 0 1 0;
    color: #beccdc;
    margin-left: 15px;
`

const SearchIcon = styled.div`
    height: 23.5px;
    width: 23.5px;
    transform: rotate(-45deg);
    margin-bottom: 30px;
    margin-right: 30px;
    color: #7fb3ff;
    font-size: 40px;
`

const Input = styled.input`
    background-color: rgba(0,0,0,0);
    color: rgba(255, 255, 255, 0);
    font-size: 40px;
    outline: none;
    border: none;
    max-width: 100%;
    width: 100%;
    font-weight: 300;
    z-index: 2;
    &:focus {
        color: #fff;
    };
    &:focus + label {
        display: none;
    };
`

type SearchBarProps = {
    isOpen: boolean,
    toggleIsOpen: Dispatch<SetStateAction<boolean>>,
    inputSelect: RefObject<HTMLInputElement>,
    dropSelect: RefObject<HTMLDivElement>,
    query: string,
    setQuery: Dispatch<SetStateAction<string>>,
    setSelectedStock: Dispatch<SetStateAction<string[]>>,
    selectedStock: string[],
    socket: SocketIOClient.Socket,
}

export const SearchBar = memo<SearchBarProps>(({isOpen, toggleIsOpen, inputSelect, dropSelect, query, setQuery, setSelectedStock, selectedStock, socket}) => {

    const dispatch = useDispatch()
    const stockList = useSelector((state: AppState) => state.search.stockList)

    const handleBlur = () => {
        if(!isOpen) return
        
        requestAnimationFrame(() => {
                if(!inputSelect.current!.contains(document.activeElement) && !dropSelect.current!.contains(document.activeElement)) {
                    toggleIsOpen(false)
                } else {
                    inputSelect.current!.focus()
                }
        })
    }

    const onKeyPress = (event: KeyboardEvent) => {
        if(event.key === 'Enter') {
            socket.emit('isValid', query);
            socket.on('isValid', (bool: boolean) => {
                if(bool) {
                    dispatch(updateTicker(query))
                    setQuery(`${stockList[0].name} (${stockList[0].symbol})`)
                    setSelectedStock([`${stockList[0].name}`, `(${stockList[0].symbol})`])
                }
            });
            toggleIsOpen(false)
            event.preventDefault();
        }
    }

    return (
        <SearchBarLayoutContainer>
            <SearchIcon>⚲</SearchIcon>
            <Input id='search' ref={inputSelect} value={query} onChange={({ target: { value }}: any) => { setQuery(value); toggleIsOpen(query.length > 0) }} onKeyPress={onKeyPress} onBlur={handleBlur} />
            {query && (
            <InputLabelOverlay htmlFor='search'>
                <LabelName>{selectedStock[0]}</LabelName>
                <LabelSymbol>{selectedStock[1]}</LabelSymbol>
            </InputLabelOverlay>
            )}
        </SearchBarLayoutContainer>
    )
})