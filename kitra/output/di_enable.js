

module.exports = function(RED) {
    function DiEnable(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,521,"+config.pin+",";
			msg.payload += (config.enabled == "true"?1:0)+",";
			if(config.pull == "none" )
				msg.payload += "0";
			else if(config.pull == "pu" )
				msg.payload += "1";
			else
				msg.payload += "2";
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("di_enable",DiEnable);
}