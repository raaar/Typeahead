// @ts-check

import { useState } from 'react';
import Trie from '../lib/Trie';


/**
 * @param {array} dictionary
 */

export default  (dictionary) => {    
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const trie = new Trie();

  dictionary.map(item => trie.add(item.toUpperCase()))

  const handleChange = (e) => {
    e.persist();
    const userInput = e.target.value.toUpperCase() || '';

    setInput(()=> userInput);
    setSuggestions(() => trie.suggestions(userInput));
  };

  return { 
    suggestions,
    input,
    handleChange
  };
}