module.exports = function(RED) {
    function ProxLuxConfigure(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,574,";
			msg.payload += config.pin + ",";
			msg.payload += (config.disable_lux=="true"?1:0) + ",";
			msg.payload += (config.disable_prox=="true"?1:0) + ",";
			msg.payload += config.extended_range;
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
			
            node.send(msg);
        });
    }
    RED.nodes.registerType("prox_lux_configure",ProxLuxConfigure);
}