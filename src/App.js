import './App.css';
import {UseState} from './UseState'
import {UseReducer} from './UseRedecer'

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Use Reducer" />

    </div>
  );
}

export default App;
