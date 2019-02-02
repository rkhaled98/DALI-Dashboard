import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log("hello")
  this.counter = new ReactiveVar(0);
  Meteor.call("getJSON" ,(error, result) => {
    if (error){
      console.log(error)
    }
    console.log(result);
    Session.set('result',result)
  });
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  people(){
    result = Session.get('result')
    to_return = []
    for (var member_number in result['data']){
        to_return.push((result['data'][member_number]['name']));
    }
    return to_return;
    // Meteor.call("GET_DATA", "None", (result) => {
    //   return result;
    // })


    // const result = Meteor.call('getJSON', "None");
    // return result

    },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    console.log("hello")
    instance.counter.set(instance.counter.get() + 1);
  },
});
