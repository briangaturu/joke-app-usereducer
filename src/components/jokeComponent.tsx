import { useState } from "react";
import type { Joke } from "../types/types";

interface JokeProps {
  joke: Joke;
  increaseRates: (id: number) => void;
  decreaseRates: (id: number) => void;
  updateJoke: (joke: Joke) => void;
  deleteJoke: (id: number) => void;
}

export const JokeComponent = ({
  joke,
  increaseRates,
  decreaseRates,
  updateJoke,
  deleteJoke,
}: JokeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(joke.joke);

  const handleSave = () => {
    if (editedText.trim()) {
      updateJoke({ ...joke, joke: editedText }); // 👈 useReducer dispatch from parent
      setIsEditing(false);
    }
  };

  return (
    <div className="joke-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            style={{padding:"12px", marginRight:"10px"}}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{joke.joke}</p>
          <p>Rate: {joke.rate}</p>
          <button onClick={() => increaseRates(joke.id)} className="btn btn-sm">👍</button>
          <button onClick={() => decreaseRates(joke.id)} className="btn btn-sm">👎</button>
          <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-warning">Edit</button>
          <button onClick={() => deleteJoke(joke.id)} className="btn btn-sm btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
};