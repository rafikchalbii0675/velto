import {
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET doit être défini dans le fichier .env");
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__velto_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  },
});

const { getSession, commitSession, destroySession } = sessionStorage;

export { getSession, commitSession, destroySession };

export async function createUserSession(userId, redirectTo = "/app") {
  const session = await getSession();

  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function requireUserId(request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    const url = new URL(request.url);

    throw redirect(
      `/register?redirectTo=${encodeURIComponent(url.pathname + url.search)}`,
    );
  }

  return userId;
}