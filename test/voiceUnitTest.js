const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const validIftttKey = '12345';
const fakePhoneNumber = '0031612345678';

//call should function for starting point
chai.should();

//Use chaiHttp to make request to this API
chai.use(chaiHttp);

//Authentication tests?

//Tests for the input from a voice action
describe('Validation of instruction id', () => {
    //instruction id: alphanumeric, 64 chars, optional
    //incorrect values
    //missing value
    //missing key
    //correct values

});

describe('Validation of callee', () => {
    //callee: alphanumeric, 24 chars, required, international format
    //incorrect values
    //missing value
    //missing key
    //correct values

    it('should throw an error when not using a string as sender', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/sendvoice')
            .set('IFTTT-Service-Key', validIftttKey)
    });
});

describe('Validation of caller', () => {
    //caller: alphanumeric, 24 chars, required, international format
    //correct values
});

describe('Validation of callback-url', () => {
    //callback-url: alphanumeric, 256 chars, optional, callback url regex
    //correct values
});

describe('Validation of anonymous', () => {
    //anonymous: boolean, 1 char, optional
    //correct values
});

describe('Validation of prompt', () => {
    //prompt: alphanumeric, 500 chars, required
    //correct values
});

describe('Validation of prompt type', () => {
    //prompt-type: alphanumeric, 4 chars, optional, either TTS or File
    //correct values
});

describe('Validation of voice', () => {
    //voice: JSON, any size, optional,
    // requires language, gender and numer in JSON
    //correct values
});
