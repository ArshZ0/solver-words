const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);

router.post(
  "/selectWord",
  [check("word", "Word is mandatory").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { word } = req.body;
    let dico = await Dico.find();
    let red = dico[0].red;

    try {
      result = selectWord(word, red);
      res.status(200).json(result);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Error in update");
    }
  }
);

router.post(
  "/search",
  [check("word", "Word is mandatory").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { word } = req.body;
    let dico = await Dico.find();
    let letters = dico[0].letters;
    let red = dico[0].red;
    let yellow = dico[0].yellow;
    let white = dico[0].white;
    try {
      let update = updateSearched(word, letters, red, yellow, white);
      let words = filter(dico[0].words, red, yellow, white);
      let best = analyseFrequence(words, letters);
      update["words"] = words.toString();
      await dico[0].updateOne(update);
      if (words.length === 0) words = "Aucun mot trouvé";
      if (best.length === 0) {
        best = "Aucun mot trouvé";
      }
      res.status(200).json({ words: words, best: best });
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Error in update");
    }
  }
);

app.listen(8080, () => {
  console.log("Server Ready !");
});
