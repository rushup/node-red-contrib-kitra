module.exports = function(RED) {
    function ProxLuxEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,571,"+config.pin+",";
			msg.payload += (config.enabled == "true"?1:0);
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("prox_lux_enable",ProxLuxEnable);
}