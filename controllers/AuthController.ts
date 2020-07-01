import User from "./../modals/User.ts";
import { RouterContext, compareSync, hashSync } from "./../deps.ts";
class AuthController {
  login() {
  }
  async register(ctx: RouterContext) {
    const { value:{name, email, password} } = await ctx.request.body();

    let user = await User.findOne({ email });
    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Email is already user" };
      return;
    }

    const hashedPassword = hashSync(password);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = { id: user.id, name: user.name, email: user.email };
  }
}

const authController = new AuthController();
export default authController;
