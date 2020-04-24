import React, { useRef, useEffect, useContext } from 'react';
import useTrie from '../hooks/useTrie.js';
import TypeAheadRow from './TypeaheadRow';
import context from '../context';
import { useState } from 'react';

const Input = ({ onFocus, handleChange, input}) => {    
  return (
    <div className="form-group">
      <input className="form-control" 
          onFocus={onFocus}
          onChange={handleChange} 
          value={input}
          placeholder="Enter manufacturer..." />
    </div>
  )
}

const TypeAhead = () => {
  const [isVisible, setSuggestionsVisible] = useState(false);
  const { selectedItem, rowIndex, setDictionarySize, dictionary, setContainerEl } = useContext(context);
  const { input, suggestions, handleChange } = useTrie(dictionary);
  const hasSuggestions = suggestions.size > 0;
  const listData = hasSuggestions ? suggestions : new Set(dictionary);
  const typeaheadEl = useRef(null);
  const containerEl = useRef(null);

  const handleOnFocus = (e) => setSuggestionsVisible(true);        
  const handleInputChange = (e) => {
    setSuggestionsVisible(true);        
    handleChange(e);
  }

  const handleClickOutside = (e) => {
    if (containerEl.current && !containerEl.current.contains(e.target)) {
      setSuggestionsVisible(false);        
    }
  }

  useEffect(() => setContainerEl(typeaheadEl), []);
  useEffect(() => setDictionarySize(listData.size), [rowIndex, listData.size]);
  useEffect(() => console.log('TODO:', selectedItem), [selectedItem]);
  useEffect(() =>{
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    }
  }, [containerEl]);

  return <div ref={containerEl} className="container">
    <Input 
      handleChange={handleInputChange} input={input} onFocus={handleOnFocus} />

    {isVisible && (
      <div ref={typeaheadEl} className="typeahead">
        {[...listData].map((word, index) => 
          <TypeAheadRow
            word={word} 
            id={index} 
            key={index}
            hasSuggestions={hasSuggestions} 
            input={input} />
        )}
      </div>
    )}

  </div>
}


export default TypeAhead;