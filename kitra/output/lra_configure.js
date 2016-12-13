module.exports = function(RED) {
    function LraConfigure(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			var pin = parseInt((config.pin || msg.lra_pin) - 1);
			msg.payload = "$KITRA,562,";
			msg.payload += (config.pin || msg.lra_pin) + ",";
			msg.payload += (config.managed =="true"?1:0) + ",";
			if(config.percentage || msg.lra_percentage)
				msg.payload += (config.percentage || msg.lra_percentage[pin]) + ",";
			else
				msg.payload += ",,";
			msg.payload += (config.effect_number || msg.lra_effect_number[pin]) + ",";
			msg.payload += (config.autostart =="true"?1:0);
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
			
            node.send(msg);
        });
    }
    RED.nodes.registerType("lra_configure",LraConfigure);
}