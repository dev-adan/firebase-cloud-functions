const functions = require("firebase-functions");
const axios = require('axios')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.api = functions.https.onRequest(async (req,res) => {
  if(req.method === 'GET'){
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
    res.send(response.data)
  }else if(req.method === 'POST'){
    const data = req.body;
    res.send(data);
  }else if(req.method === 'DELETE'){
    res.send('DELETE request');
  }else{
    res.send('it is not a GET, POST or DELETE request');
  }

})


exports.userAdded = functions.auth.user().onCreate(user => {
  console.log('user created', user.email, user.uid);
  return Promise.resolve();
})

exports.userDeleted = functions.auth.user().onDelete(user => {
  console.log('user deleted', user.email, user.uid);
  return Promise.resolve();
})

exports.fruitAdded = functions.firestore.document('fruits/{fruitId}').onCreate((snap, context) => {
  console.log('fruit created', snap.data());
  return Promise.resolve();
}) 


exports.fruitAdded = functions.firestore.document('fruits/{fruitId}').onUpdate((snap, context) => {
  console.log('before', snap.before.data())
  console.log('---------------------------------');
  console.log('after', snap.after.data());
  return Promise.resolve(); 
})

exports.scheduledFunctions = functions.pubsub.schedule('*****').onRun((context) => {
  console.log('this will be run every minute');
  return Promise.resolve();
})