

module.exports = function(RED) {
    function DiConfigure(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,523,"+config.pin + ",";
			msg.payload += (config.notification_enabled=="true"?1:0) + ",";
			msg.payload += (config.active_state=="true"?1:0) + ",";
			msg.payload += config.sampling_time + ",";
			msg.payload += config.filter_activation;
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("di_configure",DiConfigure);
}