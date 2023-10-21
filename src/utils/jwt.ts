import jwt from "jsonwebtoken";
import { UserNoPassword } from "../middlewares/auth";
interface DataSignToken {
  data: UserNoPassword;
  type: "token" | "accessToken";
}

export const signToken = (data: DataSignToken) => {
  return jwt.sign(
    {
      data: data.data,
    },
    process.env.SECRET_KEY ?? "",
    {
      expiresIn: data.type === "token" ? "1h" : "1d",
    }
  );
};

export const verifyToken = (token: string) => {
  jwt.verify(token, process.env.SECRET_KEY ?? "");
};
