import { GoogleClient } from "~/server/lib/client/google";

const authorizeUrl = GoogleClient.generateAuthUrl({
    access_type: "offline",
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ],
    prompt: "consent",
});

console.log(authorizeUrl);
