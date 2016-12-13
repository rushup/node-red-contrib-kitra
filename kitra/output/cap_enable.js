module.exports = function(RED) {
    function CapEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,551,"+config.pin+",";
			msg.payload += (config.enabled == "true"?1:0)+",";
			msg.payload += (config.sensitivity?config.sensitivity:20);
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("cap_enable",CapEnable);
}