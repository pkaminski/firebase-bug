import {database} from './init.js';

await database.setRules(`
{
  "rules": {
    ".read": false,
    ".write": false,
    ".indexOn": "lease",
    "$itemKey": {
      ".validate": "newData.hasChildren(['action', 'timestamp'])",
      "action": {".validate": "newData.isString()"},
      "timestamp": {".validate": "newData.isNumber()"},
      "lease": {".validate": "newData.isNumber()"}
    }
  }
}
`);

const root = database.ref();

const query = root.orderByChild('lease').limitToFirst(2);
query.on('child_added', snap => {});
query.on('child_removed', snap => {});
query.on('child_moved', snap => {});

setInterval(async () => {
  await Promise.all([1, 2, 3].map(async i => {
    const key = `i|${i}`;
    console.log(`Starting txn on ${key}`);
    const result = await root.child(key).transaction(value => {
      if (!value) value = {};
      if (value.timestamp && !value.action) {
        console.log(`Bad input value for ${key}: ${JSON.stringify(value)}`);
      }
      value.lease = Date.now();
      return value;
    });
    console.log(`${result.committed ? 'Finished' : 'Aborted'} txn on ${key}`);
  }));
}, 1000);
