import { Meteor } from 'meteor/meteor';
import {GET_DATA} from '../imports/backend/httpgetter'
// var getter = require('../imports/backend/httpgetter')

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  getJSON: () =>{
    // GET_DATA().then(data=>{return data});
    return new Promise((resolves,rejects)=>{
      GET_DATA().then(output=>{
        resolves(output);
      });
    });
  },
})
