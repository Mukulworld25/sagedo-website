
import https from 'https';

const accountSid = 'AC3d45a41c8e0694c7d0094e083ca3058';
const authToken = 'dcaff2de684e7875f499667eeda08234';
const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

const options = {
    hostname: 'api.twilio.com',
    port: 443,
    path: `/2010-04-01/Accounts/${accountSid}.json`,
    method: 'GET',
    headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
    }
};

console.log('--- STARTING TWILIO DEBUG ---');
console.log(`Testing SID: ${accountSid}`);
console.log('Sending Request...');

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('BODY:');
        console.log(data);
        console.log('--- END TWILIO DEBUG ---');
    });
});

req.on('error', (e) => {
    console.error(`PROBLEM WITH REQUEST: ${e.message}`);
});

req.end();
