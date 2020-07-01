import { usersCollection } from "./../mongo.ts";
export default class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({ id = "", name = "", email = "", password = "" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static async findOne(params: object) {
    const user = await usersCollection.findOne(params);
    console.log("TCL:: findOne -> user", user);

    user.id = user._id.$oid;
    delete user._id;
    console.log("TCL:: findOne -> user", user);
    return new User(user);
  }

  async save() {
    delete this.id;
    const { $oid } = await usersCollection.insertOne(this);

    this.id = $oid;
    return this;
  }
}
