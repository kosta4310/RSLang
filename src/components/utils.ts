import { state } from "../state";
import { createUserWord, getUserWordById, updateUserWord } from "./api/api";
import { Auth, Difficulty, NoteToWord, UserWord } from "./api/types";

export const getTodayString = function() {
  return new Date().toISOString().slice(0, 10);
}

export const saveWord = async function(wordId: string, complexity: Difficulty = "hard", options = {}) {
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

// // async setStatisticWord(word: IWord, isRight: boolean) {
// //   const wordId = word.id;
// //   const { userId, token } = state.getItem('auth');
// //   // let { optional } = word;

// //   // const currentDate = new Date().toISOString().slice(0, 10);
// //   const initOption = <IOptionalToWord>{
// //       sprintCorrect: 0,
// //       sprintTotal: 0,
// //       audioCallCorrect: 0,
// //       audioCallTotal: 0,
// //       correctInLineCount: 0,
// //   };

// //   let userWord = await API.getUserWordById(userId, wordId, token);
// //   if (typeof userWord === 'string') {
// //       userWord = <UserWord>(
// //           await API.createUserWord(userId, wordId, token, { difficulty: 'normal', optional: initOption })
// //       );
// //   }
// //   if (isRight) {
// //       userWord.optional.sprintCorrect += 1;
// //       userWord.optional.correctInLineCount += 1;
// //       if (
// //           (userWord.difficulty === 'normal' && userWord.optional.correctInLineCount >= 3) ||
// //           (userWord.difficulty === 'hard' && userWord.optional.correctInLineCount >= 5)
// //       ) {
// //           userWord.difficulty = 'easy';
// //       }
// //   } else userWord.optional.correctInLineCount = 0;

// //   userWord.optional.sprintTotal += 1;
// //   const noteToWord = <NoteToWord>{
// //       difficulty: userWord.difficulty,
// //       optional: JSON.parse(JSON.stringify(userWord.optional)),
// //   };
// //   const res = await API.updateUserWord(userId, wordId, token, noteToWord);
// //   console.log(res);
// // }

export function shuffle <T>(array: Array<T>): Array<T> {
    return array.sort(() => Math.random() - 0.5);
}
