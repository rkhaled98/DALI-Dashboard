import { HTTP } from 'meteor/http'

var GET_DATA = (url) =>{
    return new Promise((resolves, rejects) =>{
        HTTP.call( 'GET', 'http://mappy.dali.dartmouth.edu/members.json', {},
        function( error, response ) {
     
        if (error) {
           rejects(error);
        } else {
           resolves(response);
        }
     });
    })
}

GET_DATA('http://mappy.dali.dartmouth.edu/members.json').then(data => console.log(data))
