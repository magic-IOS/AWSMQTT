
const path = require('path');
const directoryPath = path.join(__dirname, '/');
var awsIot = require('aws-iot-device-sdk');
var mqttCertificate = awsIot.device({
	keyPath: directoryPath+"/mqttCertificate/xxxx-private.pem.key",
	certPath: directoryPath+"/mqttCertificate/xxx-certificate.pem.crt",
	caPath: directoryPath+"/mqttCertificate/AmazonRootCA1.pem",
	clientId: "123456789",
	host: "xxx-ats.iot.<Region>.amazonaws.com"
});

/* Defined MQTT Subscribe Function */
mqttCertificate.on('connect', function() {
	console.log('MQTT connected @ '+ Math.floor(Date.now() / 1000));
	mqttCertificate.subscribe('slider');
});

mqttCertificate.on('offline', function () {
	console.log('MQTT offline @ '+ Math.floor(Date.now() / 1000));
});

mqttCertificate.on('reconnect', function () {
	console.log('MQTT reconnecting @ '+ Math.floor(Date.now() / 1000));
});

/* Defined Swtich Case fot MQTT Subscribe Function */
mqttCertificate.on('message', (topic, message) => {
  switch (topic) {
    case 'slider':
      return slider_fw(message)
  }
  console.log('No handler for topic %s', topic)
})

setTimeout(() => {
	//let payload = {"orgid":1};
	mqttCertificate.publish('slider',JSON.stringify({'data':'1'}),{qos:0});
}, 5000);

/* Defined Get Epoch Function ( Unix Timestamp )*/
function getEpoch() {
	let d = new Date();
	let TiDt =  Math.round(d.getTime() / 1000);
	return TiDt;
}


function slider_fw(message) {
	var data = message.toString();
	console.log(data,'slider from FM',getEpoch());
}