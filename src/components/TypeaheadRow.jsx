import React, { useContext } from 'react';
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
  const { rowIndex, setRowIndex, setSelectedItem } = useContext(context);

  const formatSuggestion = () => {
    if(hasSuggestions) {
        return setWordHighlight(word, input)
    }

    return word;
  }

  const rowClasses = classNames('typeahead-row', {
    'is-hover': rowIndex === id
  }); 

  const handleHover = () => setRowIndex(id);
  const handleClick = () => setSelectedItem(word);

  return <div 
    id={`row-${id}`}
    className={rowClasses} 
    onMouseOver={handleHover} 
    onClick={handleClick}
    key={word}>
        {formatSuggestion()}
  </div>;
};