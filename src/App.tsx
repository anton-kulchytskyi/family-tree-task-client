import { useState, useEffect } from 'react';
import * as styles from '../src/styles/App.module.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch('https://family-tree-task-server.onrender.com/familymembers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      // fetch('http://localhost:3000/familymembers')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPhotos(data);
      });
  }, []);
  return <h1 className={styles.title}>hello from react with TS and webpack</h1>;
};

export default App;
