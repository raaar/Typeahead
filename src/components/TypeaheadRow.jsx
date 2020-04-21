import React, { memo, useCallback, useMemo, useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import context from '../context';


const setWordHighlight = (word, input) => {
    const re = new RegExp(`^${input}`);

    if(!re.test(word)) {
        return word;
    }

    const sub = word.replace(input, '');
    
    return <span><strong>{input}</strong>{sub}</span>;
}

export default (props) => {
    const { hasSuggestions, word, input, id} = props;

    const { rowIndex, setRowIndex } = useContext(context);

    const isSelected = rowIndex === id;

    const formatSuggestion = () => {
        if(hasSuggestions) {
            return setWordHighlight(word, input)
        }

        return word;
    }

    const rowClasses = classNames('typeahead-row', {
        'is-hover': isSelected
    }); 

    const handleHover = () => setRowIndex(id);

    return <div 
        className={rowClasses} 
        onMouseOver={handleHover} 

        key={word}>
            {formatSuggestion()}
    </div>;
};