import React, { useEffect, useState } from 'react';
import Context from './index';
import manufacturers from '../data/manufacturers';

const Provider = (props) => {
    const dictionary = manufacturers.map(item => item.toUpperCase());
    const [rowIndex, setRowIndex] = useState(false);
    const [dictionarySize, setDictionarySize] = useState(dictionary.length);

    const values = {
        dictionary,
        rowIndex,
        setRowIndex,
        setDictionarySize,
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
        }

        if(key === 'ArrowDown') {
            setRowIndex((state) => {
                let goTo = state + 1;
                if(goTo >= dictionarySize) {
                    return 0;
                }

                return goTo
            })
        }
    }

    useEffect(()=> {
        window.addEventListener('keyup', handleKeys);
        
        return () => {
            window.removeEventListener('keyup', handleKeys);
        }
    }, [dictionarySize]);


    return (
        <Context.Provider value={values}>
            {props.children}
        </Context.Provider>
    )
}

export default Provider;
