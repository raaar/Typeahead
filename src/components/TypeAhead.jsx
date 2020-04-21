import React, { memo, useMemo, useEffect, useContext, useCallback } from 'react';
import useTrie from '../hooks/useTrie.js';
import TypeAheadRow from './TypeaheadRow';
import context from '../context';


const TypeAhead = (props) => {
    const { rowIndex, setDictionarySize, dictionary } = useContext(context);
    const { input, suggestions, handleChange } = useTrie(dictionary);
    const hasSuggestions = suggestions.size > 0;
    const listData = hasSuggestions ? suggestions : new Set(dictionary);

    useEffect(() => {
        setDictionarySize(listData.size);
    }, [rowIndex, listData.size]);

    return <div>
        <input onChange={handleChange} value={input} />

        <div className="typeahead">
            {[...listData].map((word, index) => 
                <TypeAheadRow
                    word={word} 
                    id={index} 
                    key={index}
                    hasSuggestions={hasSuggestions} 
                    input={input} />
            )}
        </div>
    </div>
}


export default TypeAhead;