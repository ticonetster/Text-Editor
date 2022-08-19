import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to DB');
  //connect to DB and version we want to use
  const jadeDb = await openDB('jate',1);
  //make new transaction , specify the db we posting to and the data privilege of "readwrite"
  const tx = jadeDb.transaction('jate','readwrite');
  //open object store
  const store = tx.objectStore('jate');
  //use .put() method to pass in content
  const request = store.put({ text: content });
  //confirm teh data was added
  const result = await request; 
  console.log('content added to DB', result);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET * FROM DB');

  //connect to DB and version we want to use
  const jadeDb = await openDB('jate', 1);
  // make new transaction , specify the db we posting to and the data privilege of "readonly"
  const tx = jadeDb.transaction('jate', 'readonly');
  //open the object store
  const store = tx.objectStore('jate');
  //use .getAll() method to grab all the content in the DB
  const request = store.getAll();
  //confirm the data was fetched
  const result = await request;
  console.log('result.value', result);
}
initdb();
