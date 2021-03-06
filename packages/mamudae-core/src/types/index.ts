export enum Role {
  'admin',
  'streamer',
}

export interface RoleData {
  value: boolean
}

export interface UserResult extends User {
  uid: string;
  lastSignInTime: string;
  creationTime: string;
  lastRefreshTime?: string | null;
}

export interface UserRequest extends User {
  password?: string;
}

export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  roles?: RoleData[];
}
