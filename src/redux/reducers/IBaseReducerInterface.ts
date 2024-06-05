export interface IBaseReducerInterface<Data,type=string> {
  payload: Data;
  type: type;
}
