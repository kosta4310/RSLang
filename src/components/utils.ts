import { state } from "../state";
import { createUserWord, getUserWordById, updateUserWord } from "./api/api";
import { Auth, NoteToWord, UserWord } from "./api/types";
import { WordComplexity } from "./types";

export const getTodayString = function() {
  return new Date().toISOString().slice(0, 10);
}

export const saveWord = async function(wordId: string, complexity: WordComplexity = "hard", options = {}) {
  const { token, userId } = <Auth>state.getItem('auth');
  console.log(userId, wordId, token);

  const body: NoteToWord  = {
    difficulty: complexity,
    optional: options
  }

  const result = await createUserWord(userId, wordId, token, body);
  console.log(result);
  if (result === "such user word already exists") {
    // если существует то обновляем поля
    console.log('word exists, update');

    // чтобы не затереть существующие поля полностью новым объектом optional, мы сначала их вставляем
    const word = await getUserWordById(userId, wordId, token);
    console.log(`word: ${JSON.stringify(word)}`);
    const newBody: NoteToWord = {
      difficulty: complexity,
      optional: { ...(<UserWord>word).optional }
    }
    Object.assign(newBody.optional, options);
    console.log(`newBody: ${JSON.stringify(newBody)}`)
    // и потом присваиваем новые свойства если есть
    const result = await updateUserWord(userId, wordId, token, body);
    console.log(result);
  }
};