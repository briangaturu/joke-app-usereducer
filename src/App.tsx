import './App.css'
import { useReducer } from 'react';
import { JokeComponent } from './components/jokeComponent';
import jokeReducer from './reducers/jokeReducer';
import type { Joke } from './types/types';
function App() {


   const InitialJokes = [
    {
      id: 1,
      joke: 'What do you call a very small valentine? A valen-tiny!!!',
      rate: 0
    },
    {
      id: 2,
      joke: 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!!!',
      rate: 5
    },
    {
      id: 3,
      joke: "Why don't sharks like to eat clowns? Because they taste funny!!!",
      rate: 10
    }
  ];

  
  const [jokes,dispatch] = useReducer(jokeReducer,InitialJokes)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;
    const newJokeText = input.value.trim();
    if (newJokeText) {
      dispatch({  type: 'ADD_JOKE', newJoke: {
          id: Date.now(),
          joke: newJokeText,
          rate: 0
        }
      });
      input.value = '';
    }

  }
  const increaseRates =(id:number)=>{
      dispatch({type: 'INCREASE_JOKES_LIKES',id})
  }

  const decreaseRates = (id:number)=>{
      dispatch({type:'DECREASE_JOKES_LIKES',id})
  }

  const updateJoke = (joke: Joke) =>{
    dispatch({type: 'UPDATE_JOKE',updatedJoke: joke})
  }

  const deleteJoke = (id: number) => {
    dispatch({type: 'DELETE_JOKE',id})
  }

  return (
    <>
       <div className='container'>
        <h2>Jokes For You 😂</h2>

        <form onSubmit={handleSubmit} className='form'>
        <input type="text" placeholder="Enter your joke" style={{padding:"12px", marginRight:"10px"}}/>
        <button type="submit" className="btn">Add Joke</button>
      </form>
       </div>

       <div className="jokes">
        {
          jokes && jokes.sort((a,b)=>b.id - a.id).map((joke:Joke)=>(
            <JokeComponent key={joke.id} joke={joke} increaseRates={increaseRates} decreaseRates={decreaseRates} updateJoke={updateJoke} deleteJoke={deleteJoke}/>
          ))
        }
       </div>
    </>
  )
}

export default App