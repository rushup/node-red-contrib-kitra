module.exports = function(RED) {
    function PosConfigure(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			
			var event_mask = 0;
			msg.payload = "$KITRA,594,";
			msg.payload += (config.enable_raw_notification=="true"?1:0) + ",1FF,"; //filter mask 1FF
			msg.payload += parseInt(config.enable_euler_notification) + ",";
			msg.payload += config.sampling_frequency + ",";
			if(config.tap_notification=="true")
				event_mask |= 0x02;
			if(config.dtap_notification=="true")
				event_mask |= 0x04;
			if(config.freefall_notification=="true")
				event_mask |= 0x01;
			if(config.tilt_notification=="true")
				event_mask |= 0x08;
			if(config.wakeup_notification=="true")
				event_mask |= 0x10;
			if(config.pedometer_notification=="true")
				event_mask |= 0x20;
			msg.payload += event_mask;
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
			
            node.send(msg);
        });
    }
    RED.nodes.registerType("pos_configure",PosConfigure);
}