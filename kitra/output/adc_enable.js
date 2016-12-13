

module.exports = function(RED) {
    function AdcEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,531,"+config.pin+",";
			msg.payload += (config.enabled == "true"?1:0);
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("adc_enable",AdcEnable);
}