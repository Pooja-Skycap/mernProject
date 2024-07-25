export interface UsersProps {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  email: string;
  picture: {
    medium: string;
  };
}
