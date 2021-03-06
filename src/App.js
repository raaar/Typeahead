import React from 'react';
import TypeAhead from './components/TypeAhead';
import TypaheadProvider from './context/Provider';

function App() {
  return (
    <div className="App">
      <TypaheadProvider>  
        <TypeAhead />
      </TypaheadProvider>
    </div>
  );
}

export default App;
