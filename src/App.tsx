// import { useState, useEffect } from 'react';
import * as styles from '../src/styles/App.module.css';
// import { IFamilyMember } from './interfaces/FamilyMember';
import FamilyTree from './components/FamilyTree';

const App = () => {
  // const [photos, setPhotos] = useState([]);
  // useEffect(() => {
  //   // fetch('http://localhost:3000/familymembers', {
  //   fetch('https://family-tree-task-server.onrender.com/familymembers', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       const paretns = data.filter(
  //         (item: IFamilyMember) => !item.parents.length
  //       );
  //       setPhotos(paretns);
  //     });
  // }, []);
  return (
    <>
      <h1 className={styles.title}>hello from react with TS and webpack</h1>
      <FamilyTree />
    </>
  );
};

export default App;
