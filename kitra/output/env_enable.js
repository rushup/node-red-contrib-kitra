module.exports = function(RED) {
    function EnvEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,5101,";
			msg.payload += (config.enabled == "true"?1:0) + ",";
			var mask = 0;
			if(config.pressure == "true")
				mask |= 0x01;
			if(config.temperature == "true")
				mask |= 0x02;
			if(config.humidity == "true")
				mask |= 0x04;
			if(config.lux == "true")
				mask |= 0x08;
			msg.payload += mask.toString(16);
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("env_enable",EnvEnable);
}