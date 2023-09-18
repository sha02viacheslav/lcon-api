export const SsoConfig = (code) => {
  return {
    client_id: process.env.SSO_CLIENT_ID,
    scope: process.env.SSO_SCOPE,
    grant_type: process.env.SSO_GRANT_TYPE,
    redirect_uri: process.env.SSO_REDIRECT_URI,
    client_secret: process.env.SSO_CLIENT_SECRET,
    code,
  };
};
