import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import configs from "../config";

// Extend the Request interface to include user
interface User {
  username: string;
  roles: string[]; // Change here to match the expected type
}

declare global {
  namespace Express {
    interface Request {
      user?: User; // Update the Request interface
    }
  }
}

const verifier = CognitoJwtVerifier.create({
  userPoolId: configs.userPoolId,
  tokenUse: "access",
  clientId: configs.cognitoAppCientId,
});

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { routeConfig } = req;

  if (
    routeConfig &&
    routeConfig.methods &&
    !routeConfig.methods[req.method]?.authRequired
  ) {
    return next();
  }

  const token = req.cookies?.["accessToken"];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = await verifier.verify(token);
    req.user = {
      username: payload.username,
      roles: payload["cognito:groups"] || [], // Ensure roles is always an array
    };
    next();
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
};

export default authenticateToken;
