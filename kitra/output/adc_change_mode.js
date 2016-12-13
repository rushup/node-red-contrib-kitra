

module.exports = function(RED) {
    function AdcChangeMode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,532,"+config.pin+",";
			if(config.mode == "start")
				msg.payload += "2";
			else if(config.mode == "pause")
				msg.payload += "1";
			else
				msg.payload += "0";
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("adc_change_mode",AdcChangeMode);
}