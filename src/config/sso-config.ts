import { Secrets } from "../main";

export const SsoConfig = (code) => {
  return {
    client_id: Secrets.ssoClientId,
    scope: process.env.SSO_SCOPE,
    grant_type: process.env.SSO_GRANT_TYPE,
    redirect_uri: process.env.SSO_REDIRECT_URI,
    client_secret: Secrets.ssoClientSecret,
    code,
  };
};
