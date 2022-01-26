import logo from './logo.svg';
import './App.css';
import MyImage from './images/My Image new.jpg';
import Header from './Components/Header.js';
import Buttons from './Components/Buttons.js';
import Deatils from './Components/Deatils.js';
import Footer from './Components/Footer.js';


function App() {
  return (
    <div className="App">
    <img src={MyImage} alt='my image'></img>
      <Header/>
      <Buttons/>
      <Deatils/>
      <Footer/>
    </div>
  );
}

export default App;
