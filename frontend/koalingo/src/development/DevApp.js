import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import DispWordSet from './pages/DispWordSet';
import MakeWordSet from './pages/MakeWordSet';
import Home from './Home';
import SetWord from '../components/SetWords';
// import Memorise from './pages/Memorise';
import {useState} from 'react';
import { WordContext } from './WordContext';
import SetWordContext from './SetWordContext';

function DevApp() {
  // const [wordList, setWordList] = useState([]);
  // Think only way to pass props between routes is where routes defined.
  // Can clear away handle functions but states must be defined at level above the routes (i.e here)
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
  return (
    <div>
    {/* <WordContext.Provider value={wordList}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/set" 
        element={<SetWordContext
                    newWord={newWord}
                    handleChange={handleChange}
                    allWords={allWords}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    />}
        />
        <Route path="/memorise" element={<Memorise />} />
      </Routes>
    {/* </WordContext.Provider> */}
    </div>
  );
}

export default DevApp;
