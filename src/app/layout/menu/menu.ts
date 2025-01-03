export interface MenuItem {
  id?: string;
  labelKey?: string;
  url?: string;
  target?: string;
  items?: MenuItem[];
  style?: any;
  styleClass?: string;
  link?: any;
  queryParams?: { [k:string]: any};
  shortPath?: string[];
}

export interface MenuModel {
  id?: string;
  labelKey?: string;
  iconClass?: string;
  cols?: number;
  items?: MenuItem[];
  separator?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  renderable?: boolean;
  badge?: string;
  style?: any;
  styleClass?: string;
  link?: any;
  queryParams?: { [k: string]: any };
  shortcutName?: string;
}
