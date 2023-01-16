import React from 'react';
import {useEffect, useState} from 'react';
import {AuthContext} from '../../App';
import {useNavigate} from 'react-router-dom';
import {db} from '../../firebase';
import { getAllWords } from './host_logic';
import stylesLogin from "../home/login.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesAvailable from "./availableWords.module.css";
import RecWrapper from '../../components/rectangleWrapper/Wrapper';
import Button from '../../components/button/Button';

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
        <div className={stylesLogin.loginPage}>
            <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" />

            <div className={stylesAvailable.mainWrapper}>
                <RecWrapper
                    size="heightFit"
                    content=
                    {<div className={stylesAvailable.wordWrapper}>
                        <div className={stylesAvailable.font}>Available Words</div>
                        <ul class="wordPage">
                            {words.map(word => <li class="wordPage">{word}</li>)}
                            {/* <li>Test</li> */}
                        </ul>
                    </div>}
                />
                <Button btnText="Back to Selection" onClick={() => navigate('/host/set/select')}
                        btnStyle="gold" length="btnFit"
                />
            </div>
        </div>
    )

};

export default AvailableWords;
