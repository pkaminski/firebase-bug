import {database, SERVER_TIMESTAMP} from './init.js';

const root = database.ref();

setInterval(async () => {
  await Promise.all([1, 2, 3].map(
    i => root.child(`i|${i}`).update({action: 'foo', timestamp: SERVER_TIMESTAMP})
  ));
}, 250);
