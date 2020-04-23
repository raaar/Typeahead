import React, { useEffect, useState } from 'react';
import Context from './index';
import manufacturers from '../data/manufacturers';

const Provider = (props) => {
    const dictionary = manufacturers.map(item => item.toUpperCase());
    const [rowIndex, setRowIndex] = useState(false);
    const [dictionarySize, setDictionarySize] = useState(dictionary.length);
    const [containerEl, setContainerEl] = useState(undefined);
    const [selectedItem, setSelectedItem] = useState(undefined);

    const values = {
        dictionary,
        rowIndex,
        setRowIndex,
        setDictionarySize,
        setContainerEl,
        selectedItem,
        setSelectedItem
    }

    const uiScroll = (block)=> {
        if(!containerEl.current) { return; }

        const rowEl = containerEl.current.querySelector(`#row-${rowIndex}`);
        
        if(rowEl && rowIndex) {
            rowEl.scrollIntoView({ block });
        }
    }

    const handleKeys = ({key}) => {
        if(key === 'ArrowUp') {        
            setRowIndex((state) => {

                let goTo = state - 1;
                if(goTo < 0) {
                    return dictionarySize - 1;
                }
                
                return goTo;
            });
            
            uiScroll("end")

        }

        if(key === 'ArrowDown') {
            setRowIndex((state) => {
                let goTo = state + 1;
                if(goTo >= dictionarySize) {
                    return 0;
                }

                return goTo
            })

            uiScroll("start")
        }
    }

    useEffect(()=> {
        window.addEventListener('keydown', handleKeys);
        
        return () => {
            window.removeEventListener('keydown', handleKeys);
        }
    }, [dictionarySize, rowIndex]);


    return (
        <Context.Provider value={values}>
            {props.children}
        </Context.Provider>
    )
}

export default Provider;
