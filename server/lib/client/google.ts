import { OAuth2Client } from "google-auth-library";

const GoogleAuth = new OAuth2Client(
    Bun.env.GOOGLE_ID,
    Bun.env.GOOGLE_SECRET,
    Bun.env.GOOGLE_REDIRECT
);

export default GoogleAuth;