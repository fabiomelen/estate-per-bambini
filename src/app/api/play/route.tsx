import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const maxPlayAttempts = parseInt(process.env.MAX_PLAY_ATTEMPTS || "", 10);

const client = jwksClient({
  jwksUri: "https://services.cloud.mediaset.net/gigya/v1/jwks",
});

const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    callback(null, key?.getPublicKey());
  });
};

async function verifyAsync(
  token: string,
  getKey: jwt.GetPublicKeyOrSecret,
): Promise<string | jwt.JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {}, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/result", request.url).href, {
    status: 302,
  });

  try {
    if (isNaN(maxPlayAttempts)) {
      throw new Error("Invalid MAX_PLAY_ATTEMPTS");
    }

    const cookieStore = cookies();
    const formData = await request.formData();

    const token = formData.get("id_token");
    const repository = formData.get("repository");

    if (!token || typeof token !== "string") {
      throw new Error("Missing id_token");
    }

    if (!repository || repository !== "rti") {
      throw new Error("Missing repository");
    }

    const data = await verifyAsync(token, getKey);
    const userUID = data?.sub;

    const playAttempts = parseInt(
      cookieStore.get(`play_attempts_${userUID}`)?.value || "0",
      10,
    );
    if (playAttempts >= maxPlayAttempts) {
      throw new Error("Max play attempts reached");
    }

    response.cookies
      .set("user_uid", String(userUID))
      .set(`play_attempts_${userUID}`, String(playAttempts + 1))
      .delete("error");
  } catch (e: any) {
    response.cookies.set("error", e.message);
  }

  return response;
}
