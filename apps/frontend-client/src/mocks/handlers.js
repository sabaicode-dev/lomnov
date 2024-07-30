// Attempt to import 'rest' or 'http'
import { rest, http } from "msw";

console.log({ rest, http }); // To verify which is defined

export const handlers = [
  (rest || http).post("/api/login", (req, res, ctx) => {
    const { email, password, firstname, lastname } = req.body;

    if (email === "user@example.com" && password === "password13" && firstname === "john" && lastname === "doe") {
      return res(
        ctx.json({
          message: "Login successful",
          token: "123456",
        }),
      );
    }

    return res(ctx.status(403), ctx.json({ message: "Invalid credentials" }));
  }),
];
