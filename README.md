# firebase-txn-bug

This repo contains code to reproduce a Firebase RTDB bug, where transactions sometimes get a bogus input value that never gets corrected so the transaction cannot commit due to `datastale` errors and eventually fails with `maxretry`.

To run:
1. Edit `src/init.js` to point to your service account credentials file and an empty RTDB database instance.
2. Run `node src/txn.js` in one shell.
3. Run `node src/write.js` in another shell.

Observe the output of `txn.js`.  Every so often you'll see see a "Bad input value" error being logged, showing that an input value that shouldn't exist was passed to the transaction -- `action` and `timestamp` are always written together, so it's impossible to end up with just a `timestamp`.  After a minute or two you should see a series of "Bad input value" errors followed by a `maxretry` crash.
