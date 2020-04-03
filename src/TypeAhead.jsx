import React from 'react';
import useTrie from './hooks/useTrie.js';

const TypeAhead = () => {
    const { input, suggestions, handleChange } = useTrie();
    const hasSuggestions = suggestions.length > 0;

    return <div>
        <input onChange={handleChange} value={input} />

        <ul>
            {hasSuggestions && suggestions.map((item, key) => <li key={key}>{item}</li>)}
        </ul>
    </div>
}


export default TypeAhead;