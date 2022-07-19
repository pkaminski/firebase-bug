import admin from 'firebase-admin';
import {readFile} from 'fs/promises';

const serviceAccount = JSON.parse(await readFile(new URL(
  '../txn-bug-firebase-adminsdk-duxrq-0a04281056.json', import.meta.url
)));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://txn-bug-default-rtdb.firebaseio.com'
});

export const database = admin.database();
export const SERVER_TIMESTAMP = admin.database.ServerValue.TIMESTAMP;
