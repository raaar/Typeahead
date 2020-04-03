import React from 'react';
import useTrie from './hooks/useTrie.js';
import dictionary from './data/manufacturers';

const setWordHighlight = (word, input) => {
    const re = new RegExp(`^${input}`);

    if(!re.test(word)) {
        return word;
    }

    const sub = word.replace(input, '');
    
    return <span><strong>{input}</strong>{sub}</span>;
}

const TypeAhead = () => {
    const { input, suggestions, handleChange } = useTrie(dictionary);
    const hasSuggestions = suggestions.size > 0;
    const listData = hasSuggestions ? suggestions : new Set(dictionary);
    
    const formatSuggestion = (word) => {
        if(hasSuggestions) {
            return setWordHighlight(word, input)
        }

        return word;
    }

    return <div>
        <input onChange={handleChange} value={input} />

        <ul>
            {[...listData].map(word => 
                <li key={word}>{formatSuggestion(word)}</li>)
            }
        </ul>
    </div>
}


export default TypeAhead;