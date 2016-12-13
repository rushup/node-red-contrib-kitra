module.exports = function(RED) {
    function CapConfigureNotifications(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,553,"+config.pin+",";
			msg.payload += (config.notification_touch_enabled == "true"?1:0)+",";
			msg.payload += (config.notification_press_enabled == "true"?1:0)+",";
			msg.payload += (config.notification_release_enabled == "true"?1:0)+",";
			msg.payload += config.threshold_level_press;
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("cap_configure_notifications",CapConfigureNotifications);
}