export interface NavigationItem {
  name: string;
  icon?: string;
  children?: { name: string }[];
}

export interface Notification {
  id: number;
  title: string;
  time: string;
  unread: boolean;
}
