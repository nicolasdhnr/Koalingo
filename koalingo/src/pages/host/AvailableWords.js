import React from 'react';
import {useEffect, useState} from 'react';
import {AuthContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import {db} from '../../firebase';
import { getAllWords } from './host_logic';

const AvailableWords = () => {
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
    useEffect(() => {
        const wordPromise = getAllWords();
        const test = wordPromise.then(value => {
            setWords(prev =>[...new Set(value)]);
            console.log(words);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    console.log('words: ', words, typeof(words))
    // const words = ["yes", "no", "happy", "sad", ""]
    // wordPromise.then(value => {
    //     console.log(value);
    //     }).catch(error => {
    //     console.log(error);
    // });
    words.forEach((word, idx) => {
        console.log(word, idx);
    });
    return (
        <div>
            <ul>
                {words.map(word => <li>{word}</li>)}
                {/* <li>Test</li> */}
            </ul>
            <button onClick={() => navigate('/host/set/select')}> Return to word selection page</button>
        </div>
    )

};

export default AvailableWords;
