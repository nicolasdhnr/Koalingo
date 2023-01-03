import {useContext} from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

export function WordAnimation({wordIdx=0, setWordIdx}) {
    const {allWords} = useContext(AuthContext);

    console.log('wordIdx from WordAnimation', wordIdx);
    console.log('allWords: ', allWords);
    const word = allWords[wordIdx]['title'];
    console.log(word);
    const vidsrc = '../' + word + '.mp4'; // add if vid not found

    const animation = <video src={vidsrc} controls></video>;
    const navigate = useNavigate()
    const onClick = () => navigate('/host/set/select')

    return (
        <div>
            {/* <div>This is the Word Animation Component</div> */}
            <h1>{word}</h1>
            {console.log('useContext from WordAnimation: ', allWords)}
            {animation}
            {console.log(vidsrc)}
            <button onClick={onClick}>Return to set words</button>
        </div>
    );
}