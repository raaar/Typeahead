import { useState } from 'react';
import dictionary from '../data/manufacturers';
import Trie from '../lib/Trie';

export default  () => {    
    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');
    const trie = new Trie();

    dictionary.map(item => trie.add(item.toLowerCase()))

    const handleChange = (e) => {
        e.persist();
        const userInput = e.target.value.toLowerCase() || '';

        setInput(()=> userInput);
        setSuggestions(() => trie.suggestions(userInput));
    };

    return { 
        suggestions,
        input,
        handleChange
    };
}