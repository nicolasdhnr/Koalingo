import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import {useState} from 'react';
import { WordContext } from './WordContext';
import SetWordContext from './pages/SetWordContext';

function DevApp() {
  // const [wordList, setWordList] = useState([]);
  // Think only way to pass props between routes is where routes defined.
  // Refactor by passing newWord, setNewWord as props in context, then moving handle function to page
  const [newWord, setNewWord] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setNewWord((prev) => ({id: Date.now(), [name]: value }));  // removed ...prev, add back if breaks, only matters for desc
    console.log(newWord);
  };

  const [allWords, setAllWords] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newWord.title) return;
    setAllWords((prev) => [newWord, ...prev]);
    setNewWord({});
    console.log(allWords)
  };
  const handleDelete = (WordIdToRemove) => {
    setAllWords((prev) => prev.filter(
      (Word) => Word.id !== WordIdToRemove
    ));
  };
  const context_props = {'newWord' : newWord,
                          'handleChange' : handleChange,
                          'allWords' : allWords,
                          'handleSubmit' : handleSubmit,
                          'handleDelete' : handleDelete};
  return (
    <div>
    <WordContext.Provider value={context_props}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/set" element={<SetWordContext />}/>
        <Route path="/memorise" element={<Memorise />} />
      </Routes>
    </WordContext.Provider>
    </div>
  );
}

export default DevApp;
