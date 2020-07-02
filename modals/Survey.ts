import { surveyCollection } from "./../mongo.ts";
import BaseModal from "./BaseModal.ts";
export default class Survey extends BaseModal {
  public id: string = "";

  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {
    super();
  }

  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys = await surveyCollection.find({ userId });

    const surveysArray = await surveys.map((survey: any) =>
      Survey.prepare(survey)
    );
    console.log("TCL:: Survey -> findByUser -> surveysArray", surveysArray);
    return surveysArray;
  }

  static async findById(id: string): Promise<Survey | null> {
    const survey = await surveyCollection.findOne({ _id: { $oid: id } });
    console.log("TCL:: Survey -> survey", survey);
    if (!survey) {
      return null;
    }
    return Survey.prepare(survey);
  }

  async create() {
    delete this.id;
    const { $oid } = await surveyCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  async update({ name, description }: { name: string; description: string }) {
    const { modifiedCount } = await surveyCollection.updateOne(
      { _id: { $oid: this.id } },
      { name, description },
    );
    console.log("TCL:: Survey -> update -> modifiedCount", modifiedCount);

    this.name = name;
    this.description = description;
  }

  protected static prepare(data: any): Survey {
    data = BaseModal.prepare(data);
    const survey = new Survey(data.userId, data.name, data.description);
    survey.id = data.id;
    return survey;
  }
}
