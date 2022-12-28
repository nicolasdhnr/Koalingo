import React, { useState, useContext } from "react";
import { WordContext } from "../WordContext";
import NewWord from "./NewWord";
import WordsList from "./WordsList";

export default function SetWordContext() {
  return (
    <main>
      <h1>Set your Word List</h1>
      <NewWord />
      <WordsList />
      {console.log(useContext(WordContext))}
    </main>
  );
};
