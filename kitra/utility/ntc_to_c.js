module.exports = function(RED) {
    function NtcToC(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			
			var invT_0;
			var invB;
			var resistenza;
			var resolution = 4096;
			var logNTC;
			var temp = 0;
			var RESITANCE_VALUE = 10000;
			var B_NTC = config.b;

			msg.payload = parseInt(msg.payload);
			/* Ambient */
			//Resistor Value
			resistenza = RESITANCE_VALUE * ((resolution / msg.payload) - 1.0);

			msg.resistenza = resistenza;
			// 1/T_0
			invT_0 = 1.0 / 298.15;
			// 1/B
			invB = 1.0 / B_NTC;
			// ln(NTC/NTC_0)
			logNTC = (Math.log((resistenza / config.ntc_res)));
			// Temperature in Kelvin
			temp = 1.0 / (invT_0 + (invB * logNTC));
			// Convert Kelvin to Celsius
			temp -= 273.15;

			msg.temp =temp.toFixed(2);

            node.send(msg);
        });
    }
    RED.nodes.registerType("ntc_to_c",NtcToC);
}