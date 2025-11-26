export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export enum AnimationState {
  HIDDEN = "hidden",
  VISIBLE = "visible",
  EXIT = "exit"
}
