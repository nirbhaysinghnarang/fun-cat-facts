import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import cat from './cat.jpeg';

const imgApiKey = '03292e54-e8c6-4f20-ae7f-12fefe722c1c';
let imgUrl;
let text;
function App() {
  return (
    <div className="App" id="div-app">
      <div>
        <div>
          <header className="App-header">
              <h1> Fun Cat Facts</h1>
          </header>
          <button className="fetchBtn" onClick={fetchFact}>😼 </button>
        </div>
          <img className="catImg" src={cat}/>
          <br/>
          <p className="catFact"> catto fact incoming </p>
      </div>
    </div>
  );
}

const fetchFact = async () => {
  console.log('fetching');
  getImg().then(function(res){
    imgUrl = res
    getFact().then(function(res){
      text = res
      console.log(imgUrl,text);
      updateUI()

    },function(err){
      console.log(err);
    });
  },function(err){
    console.log(err);
  });
}

const getImg = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const myJson = await response.json();
  return myJson[0]["url"];
}

const getFact = async () => {
  const response = await fetch('https://meowfacts.herokuapp.com/');
  const myJson = await response.json();
  return String(myJson["data"]);
}
function updateUI(){
  const img = <img className="catImg" src={imgUrl} />
  const fact = <p className="catFact"> {text} </p>
  const factBlock = (
    <div>
      <div>
        <header className="App-header">
            <h1> Fun Cat Facts</h1>
        </header>
        <button className="fetchBtn" onClick={fetchFact}>😼 </button>
      </div>
        <img className="catImg" src={imgUrl} />
        <br/>
        {fact}
    </div>
  )
  ReactDOM.render(factBlock,document.getElementById('div-app'));
}
export default App;
