import React, { useContext } from "react";
import { AuthContext } from '../App';
import { checkIfWordIsAvailable } from "../pages/host/host_logic";
export default function NewWord({className}) {
  const { newWord, allWords, setAllWords, setNewWord } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setNewWord((prev) => ({ ...prev, id: Date.now(), [name]: value }));  // removed ...prev, add back if breaks, only matters for desc
    console.log(newWord);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (await checkIfWordIsAvailable(newWord.title)) {
  //     if (!newWord.title) return;
  //     setAllWords((prev) => [newWord, ...prev]);
  //     setNewWord({});
  //     return;
  //   }
  //   alert("This word had not yet been animated! Please consult our list of words.")
  //   return;
  // };

  const onClickAddWord = async (event) => {
    event.preventDefault();
    if (await checkIfWordIsAvailable(newWord.title)) {
      if (!newWord.title) return;
      setAllWords((prev) => [newWord, ...prev]);
      setNewWord({});
      return;
    }
    alert("This word had not yet been animated! Please consult our list of words.")
    return;
  };

  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         name="title"
  //         placeholder="New Word"
  //         value={newWord.title || ""}
  //         onChange={handleChange}
  //       />
  //       {!newWord.title ? null : (
  //         <>
  //           <button type="submit">Add Word</button>
  //         </>
  //       )}
  //       {console.log(allWords)}
  //     </form>
  //   );
  // }
  return (
    <div>
      <input
      className={className.wordInput}
        name="title"
        placeholder="Enter Word Here: "
        value={newWord.title || ""}
        onChange={handleChange}
      />

      <button className={className.wordInput} onClick={onClickAddWord}>Add Word</button>
    </div>
  );
}