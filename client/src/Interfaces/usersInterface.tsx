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

export interface EventProps {
  title: string;
  description: string;
  _id: string;
}

export interface PaginationProps {
  page: number;
  pageSize: number;
}

export interface Notification {
  id: number;
  message: string;
}

export interface EventTitle {
  id?: string;
  title?: string;
}

export interface ResponseData {
  title: string;
  description: string;
  images?: File[];
}

export interface ImageResponse {
  title: string;
  description: string;
  images?: { path: string }[];
}
