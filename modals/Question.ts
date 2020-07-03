import { questionCollection } from "./../mongo.ts";
import BaseModal from "./BaseModal.ts";

export default class Question extends BaseModal {
  public id: string = "";
  constructor(
    public surveyId: string,
    public text: string,
    public type: QuestionType,
    public required: boolean,
    public data: any,
  ) {
    super();
  }

  static async findBySurvey(surveyId: string): Promise<Question[]> {
    console.log("TCL:: Question -> surveyId", surveyId);
    const questions = await questionCollection.find({ surveyId });

    return await questions.map((question: any) => Question.prepare(question));
  }

  static async findById(id: string): Promise<Question | null> {
    const question = await questionCollection.findOne({ _id: { $oid: id } });
    if (!question) {
      return null;
    }
    return Question.prepare(question);
  }

  async create() {
    delete this.id;
    const { $oid } = await questionCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  async update(text: string, type: QuestionType, required: boolean, data: any) {
    await questionCollection.updateOne(
      { _id: { $oid: this.id } },
      { $set: { text, type, required, data } },
    );

    this.text = text;
    this.type = type;
    this.required = required;
    this.data = data;
  }

  delete() {
    return questionCollection.deleteOne(
      { _id: { $oid: this.id } },
    );
  }
  protected static prepare(data: any): Question {
    data = BaseModal.prepare(data);
    const question = new Question(
      data.surveyId,
      data.text,
      data.type,
      data.required,
      data.data,
    );
    question.id = data.id;
    return question;
  }
}

export enum QuestionType {
  CHOICE = "choice",
  TEXT = "text",
}
