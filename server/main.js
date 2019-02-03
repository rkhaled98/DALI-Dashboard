import { Meteor } from 'meteor/meteor';
import { Markers } from '../imports/api/markers';
import {GET_DATA} from '../imports/backend/httpgetter'
// var getter = require('../imports/backend/httpgetter')

Meteor.startup(() => {
  // GoogleMaps.load();
  // Markers.remove({}); // Reset the markers da
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
