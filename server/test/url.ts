import GoogleAuth from "~/server/lib/client/google";

const authorizeUrl = GoogleAuth.generateAuthUrl({
    access_type: "offline",
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ],
});

console.log(authorizeUrl);
