import { surveyCollection } from "./../mongo.ts";
export default class Survey {
  public id: string = "";

  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {}

  static async findByUser(userId: string) {
    const surveys = await surveyCollection.find({ userId });

    const surveysArray = await surveys.map((survey: any) =>
      Survey.prepare(survey)
    );
    console.log("TCL:: Survey -> findByUser -> surveysArray", surveysArray);
    return surveysArray;
  }

  async create() {
    delete this.id;
    const { $oid } = await surveyCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  private static prepare(data: any) {
    data.id = data._id.$oid;
    delete data._id;
    return data;
  }
}
