export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  date: number;
}

export interface IsupportiveTodo {
  ids: number[];
  items: ITodo[];
}
