import logo from './logo.svg';
import './App.css';
import Header from './Components/Header.js'
import Location from './Components/LocationCard';
import data from './data';

function App() {
  let Locations = data.map(item=>{
    return(<Location
        title= {item.title}
        location= {item.location}
        googleMapsUrl= {item.googleMapsUrl}
        startDate= {item.startDate}
        endDate= {item.endDate}
        description= {item.description}
        imageUrl={item.imageUrl}
      />)
  });
  return (
    <div className="App">
      <Header />
      {Locations}
    </div>
  );
}

export default App;
