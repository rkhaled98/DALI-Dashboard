import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'

import './main.html';

Template.main.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log("hello")
  this.counter = new ReactiveVar(0);
  Meteor.call("getJSON" ,(error, result) => {
    if (error){
      console.log(error)
    }
    console.log(result);
    Session.set('peopleJSON',result)
  });
});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  people(){
    result = Session.get('peopleJSON');
    people = [];
    for (var member_number in result['data']){
        datum = []
        datum.push((result['data'][member_number]['name']));
        datum.push("http://mappy.dali.dartmouth.edu/"+(result['data'][member_number]['iconUrl']));
        people.push(datum)
    }
    return people;

    },
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    console.log("hello")
    instance.counter.set(instance.counter.get() + 1);
  },
});
