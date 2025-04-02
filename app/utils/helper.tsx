import jwt, { JwtPayload } from "jsonwebtoken";

export const ApiResponse = (status: number, data: any) => {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status,
  });
};

export const getIDFromToken = (token: string) => {
  const userObj: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  let userId = "";
  if (typeof userObj !== "string" && userObj && userObj.id) {
    userId = userObj.id;
  }

  return userId;
};
