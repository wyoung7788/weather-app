import "./style.css"
import { fetchWeatherApi } from 'openmeteo';
import Search from "./components/search/search";

function App(){
  return (
    <div className="container">
      <Search />
    </div>
  );
}
export default App;
