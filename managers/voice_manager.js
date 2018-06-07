const request = require('request');
const Voice = require("../domain/Voice");
const ApiError = require('../domain/ApiError');

module.exports = {
    sendVoice(req, res, next) {

        let sender = null;
        let body = null;
        let receiver = null;
        let language = null;
        let token = null;

        // Get input from ifttt
        // Check if actionFields exists
        if (typeof req.body.actionFields !== 'undefined') {

            sender = req.body.actionFields.sender || "";
            body = req.body.actionFields.body || "";
            receiver = req.body.actionFields.receiver || "";
            language = req.body.actionFields.language || "";
            token  = req.body.actionFields.token || "";

        } else {
            next(new ApiError('actionFields missing in body.', 400));
            return;
        }

        // Validate input
        let voiceObject = null;

        try {
            voiceObject = new Voice(sender, receiver, body, language, token);
        } catch (apiError) {
            next(apiError);
            return;
        }

        // convert ifttt input to CM VOICE
        const receiversIFTTT = voiceObject.receiver.split(', ');
        const receiversCM = [];
        let i;
        for (i = 0; i < receiversIFTTT.length; i++) {
            receiversCM.push({
                number: receiversIFTTT[i]
            });
        }
        console.log('Receivers of the message\n', receiversCM);
        const cmVOICE = {
            callee: receiver,
            caller: sender,
            anonymous: "false",
            prompt: body,
            type: "TTS",
            voice: {
                language: language,
                gender: "Female",
                number: 1
            }
        };

        console.log("Sending post request to CM");
        // Send post request to CM (sending sms)
        request({
            url: "https://voiceapi.cmtelecom.com/v2.0/Notification",
            headers: "X-CM-PRODUCTTOKEN",
            method: "POST",
            json: true,
            body: cmVOICE
        }, function (error, response, body){
            if (error) console.log(error);
            else console.log(body);
        });

        // Send the created response.
        res.status(200).send(response);
    }
};