import Role from "./enums/Role";

class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  enabled: boolean;
  username: string;
  authorities: [];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: Role,
    enabled: boolean,
    username: string,
    authorities: [],
    accountNonExpired: boolean,
    credentialsNonExpired: boolean,
    accountNonLocked: boolean
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.enabled = enabled;
    this.username = username;
    this.authorities = authorities;
    this.accountNonExpired = accountNonExpired;
    this.credentialsNonExpired = credentialsNonExpired;
    this.accountNonLocked = accountNonLocked;
  }
}

export default User;
