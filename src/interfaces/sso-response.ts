export interface SsoResponse {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  email: string;
  name: string;
  oid: string;
  preferred_username: string;
  rh: string;
  roles: string[];
  sub: string;
  tid: string;
  uti: string;
  ver: string;
  onpremisessamaccountname: string;
  userprincipalname: string;
  givenname: string;
  surname: string;
  mail: string;
}
