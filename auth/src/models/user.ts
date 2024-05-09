import mongoose from "mongoose";
import { Password } from "../services/password";

//interface that describes the properties to create new user

interface UserAtters {
  email: string;
  password: string;
}

//interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(atters: UserAtters): UserDoc;
}

//interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//toJSON controls the respose of user to the frontend. eg, we remove password,__id, change _id to id

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//with this we can create new user with User.build instead of new User() for strong type checking
//otherwise if we use new User() , the type of email , password ,etc wont be checked
userSchema.statics.build = (atters: UserAtters) => {
  return new User(atters);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
