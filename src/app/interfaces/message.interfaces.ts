export interface TagInterface {
  id: number;
  id_user: number;
  name: string;
}

export interface MessageInterface {
  id: number;
  id_user: number;
  body: string;
  type: number;
  done: boolean;
  is_private: boolean;
  tags: TagInterface[];
  date: string;
  color: string;
  tag_list?: string;
}

export interface TagsResult {
  status: string;
  list: TagInterface[];
}

export interface MessageTypeInterface {
  id: number;
  name: string;
}

export interface MessagesResult {
  status: string;
  list: MessageInterface[];
}

export interface MessageResult {
  status: string;
  message: MessageInterface;
}
