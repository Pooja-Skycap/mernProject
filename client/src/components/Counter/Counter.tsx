import { useDispatch, useSelector } from "../../utils/commonImports";
import { AppDispatch, RootState } from "../../redux/store";
import {
  incAsyncFunc,
  decrementByValue,
  incrementByValue,
} from "../../redux/Counter/CounterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementByValue(5))}>Increment</button>
      </div>
      <div>
        <button onClick={() => dispatch(decrementByValue(5))}>Decrement</button>
      </div>
      <div>
        <button onClick={() => dispatch(incAsyncFunc(5))}>Increment</button>
      </div>
    </div>
  );
};

export default Counter;
