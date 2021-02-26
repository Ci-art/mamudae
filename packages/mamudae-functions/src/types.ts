export enum Role {
  'admin',
  'streamer',
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
  roles?: { [key in Role]: boolean };
}

export class RestError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RestError);
    }

    this.status = status;
  }
}
