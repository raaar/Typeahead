import React from 'react';
import useTrie from './hooks/useTrie.js';
import dictionary from './data/manufacturers';

const TypeAhead = () => {
    const { input, suggestions, handleChange } = useTrie(dictionary);
    const hasSuggestions = suggestions.length > 0;
    const listData = hasSuggestions ? suggestions : dictionary;


    return <div>
        <input onChange={handleChange} value={input} />

        <ul>
            {listData.map((item, key) => <li key={key}>{item.toLowerCase()}</li>)}
        </ul>
    </div>
}


export default TypeAhead;