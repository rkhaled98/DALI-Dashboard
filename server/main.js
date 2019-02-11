import { Meteor } from 'meteor/meteor';
import { Markers } from '../imports/api/markers';
import {GET_DATA} from '../imports/backend/httpgetter'
var fs = require('fs');

Meteor.startup(() => {
});

Meteor.methods({
  getJSON: () =>{
    return new Promise((resolves,rejects)=>{
      GET_DATA().then(output=>{
        resolves(output);
      });
    });
  },
  writeJSON: (current) => {
    var path = process.env['METEOR_SHELL_DIR'] + '/../../../public';
    fs.writeFileSync(path + "/" + 'pjs-settings-server.json', JSON.stringify(current))
    return 'pjs-settings-server.json'
  }
})
