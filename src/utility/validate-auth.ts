import jwks = require('jwks-rsa');
import * as moment from 'moment';

export const getJwksKey = (header, callback) => {
  const jwksClient = jwks({ jwksUri: process.env.SSO_JWKS });
  jwksClient.getSigningKey(header.kid, (err, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

export const validateToken = (idToken) => {
  if (idToken == null) return false;
  switch (idToken) {
    case moment.utc().isBefore(moment.unix(idToken.iat)):
      console.log('invalid iat');
      return false;
    case moment.utc().isBefore(moment.unix(idToken.nbf)):
      console.log('invalid nbf');
      return false;
    case moment.utc().isAfter(moment.unix(idToken.exp)):
      console.log('invalid exp');
      return false;
    case idToken.tid !== process.env.SSO_TID:
      console.log('invalid tid');
      return false;
    case idToken.aud !== process.env.SSO_CLIENT_ID:
      console.log('invalid aud');
      return false;
    default:
      return true;
  }
};
