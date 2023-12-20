import express from 'express';
import Word from './models/Word.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
let message = false;
let word = NaN;
let words = NaN;

app.post("/manager/add", async function (req, res) {
  const word = new Word();
  word.word = req.body.word;
  word.nAttempts = 0;
  word.nCorrects = 0;
  word.correctWord = req.body.translation;
  await word.save();
  res.redirect('/manager');
});

app.get("/manager", async function (req, res) {
  const words = await Word.loadMany();
  let scores = [];
  for (var i = 0; i < words.length; i++) {
    let score = "0%"
    if (words[i].nAttempts != 0) {
        score = toString(words[i].nCorrects / words[i].nAttempts * 100);
    } 
    scores.push(score);
  }
  res.render("screen2.ejs", {message : message, scores : scores, words: words});
})

app.get("/manager/delete/:id", async function (req, res) {
  await Word.delete({ idwords: req.params.id });
  console.log(req.params)
  res.redirect('/manager');
});

app.post("/correct", async function (req, res) {
  let test = req.body.input
  console.log(word);
  if (test == word.correctWord) {
    message = "You succeeded !"
    word.nCorrects++;
    res.redirect('/')
  }
  else {
    message = "Wrong answer. Try again"
  }
  word.nAttempts++;
  await word.save();
})

app.get("/", async function (req, res) {
  words = await Word.loadMany();
  const random = Math.floor(Math.random()*words.length)
  word = words[random];
  res.render('screen1.ejs', { word: word, message: message });
});

app.listen(4000);
