import { HTTP } from 'meteor/http'

export var GET_DATA = () =>{
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

// for (var key in GET_DATA('None')){
    // key = GET_DATA('None');
    // console.log(key);
// }

// GET_DATA('').then(data => {
//     // console.log(data['data']);
//     for (var member_number in data['data']){
//         console.log(data['data'][member_number]['name']);
//     }
// });


// module.exports = {
//     GET_DATA : (url) => {GET_DATA(url).then(data=>{return data})}
// }
