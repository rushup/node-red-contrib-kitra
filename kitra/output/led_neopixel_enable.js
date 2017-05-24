module.exports = function(RED) {
    function LedNeopixelEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,5121,"+(config.enabled == "true"?1:0)+",";
			msg.payload += config.nleds;
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("led_neopixel_enable",LedNeopixelEnable);
}