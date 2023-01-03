import NewWord from "../components/NewWord";
import WordsList from "../components/WordList";

export default function SetWordContext() {
  return (
    <main>
      <h1>Set your Word List</h1>
      <NewWord />
      <WordsList />
      {/* {console.log(useContext(WordContext))} */}
    </main>
  );
};
