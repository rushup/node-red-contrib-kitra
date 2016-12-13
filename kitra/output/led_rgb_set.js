module.exports = function(RED) {
    function LedRgbSet(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			//this.log(msg.led_intensity);
			msg.payload = "$KITRA,582,";
			msg.payload += (config.pin || msg.pin) + ",";
			var pin = parseInt((config.pin || msg.pin)) - 1;
			if(pin < 0) pin = 0;
			msg.payload += (config.color || msg.led_color[pin]) + ","; 
			msg.payload += (config.intensity || msg.led_intensity[pin]) + ",";
			msg.payload += config.autostart == "true" ? 1:0;
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("led_rgb_set",LedRgbSet);
}