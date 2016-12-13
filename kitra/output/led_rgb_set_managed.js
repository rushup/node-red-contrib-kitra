module.exports = function(RED) {
    function LedRgbSetManaged(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,583,";
			msg.payload += (config.pin || msg.pin) + ",";
			var pin = parseInt((config.pin || msg.pin)) - 1;
			if(pin < 0) pin = 0;
			msg.payload += parseInt(config.effect) + ",";
			msg.payload += (config.color_target || msg.led_color_target[pin]) + ","; 
			msg.payload += (config.intensity_target || msg.led_intensity_target[pin]) + ",";
			msg.payload += (config.duration || msg.led_duration[pin]) + ",";
			msg.payload += (config.loop || msg.led_loop[pin]) + ",";
			msg.payload += (config.loop_delay || msg.led_loop_delay[pin]) + ",";
			msg.payload += config.autostart == "true" ? 1:0;
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("led_rgb_set_managed",LedRgbSetManaged);
}