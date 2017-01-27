module.exports = function(RED) {
    function MicEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,5111,"+parseInt(config.mode)+",";
			msg.payload += config.filter_mask + ",";
			msg.payload += (config.notification_enabled=="true"?1:0) + ",";
			msg.payload += config.noti_freq;
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("mic_enable",MicEnable);
}