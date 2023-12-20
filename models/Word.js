import Model from './Model.js';

export default class Word extends Model {

  static table = "exam.words";
  static primary = ["id"];
}
