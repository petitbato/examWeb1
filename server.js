import express from 'express';
import Word from './models/Word.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/manager/add", async (req, res) => {
  console.log(req.body);
  console.log(req.body.word);
  console.log(req.body.correctWord);
  const word = new Word({
    word: req.body.word,
    nAttempts: 0,
    nCorrects: 0,
    correctWord: req.body.correctWord
  });
  await word.update({ word: req.body.word, nAttempts: 0, nCorrects: 0, correctWord: req.body.correctWord });
  console.log(word);
  await word.save();
  res.redirect('/manager');
});

app.get("/manager", async (req, res) => {
  const message = req.query.message;
  const words = await Word.loadMany();
  const scores = words.map(w => w.nAttempts ? `${(w.nCorrects / w.nAttempts * 100).toFixed(2)}%` : "0%");
  res.render("screen2.ejs", { message, scores, words });
});

app.get("/manager/delete/:id", async (req, res) => {
  await Word.delete({ id: req.params.id });
  res.redirect('/manager');
});

app.post("/correct", async (req, res) => {
  console.log(req.body);
  const test = req.body.input;
  let word = await Word.load({ correctWord: req.body.correctWord });
  let message;
  if (test === word.correctWord) {
    message = "You succeeded!";
    word.nCorrects++;
  } else {
    message = "Wrong answer. Try again";
  }
  word.nAttempts++;
  word.update({ nAttempts: word.nAttempts, nCorrects: word.nCorrects });
  await word.save();
  res.redirect(`/?message=${encodeURIComponent(message)}`);
});

app.get("/", async (req, res) => {
  const words = await Word.loadMany();
  const word = words[Math.floor(Math.random() * words.length)];
  const message = req.query.message;
  res.render('screen1.ejs', { word, message });
});

app.listen(4000);