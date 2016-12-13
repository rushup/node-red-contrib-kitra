module.exports = function(RED) {
    function BuzzChange(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,5142,";
			msg.payload += (config.frequency || msg.buzz_frequency) + ",";
			msg.payload += (config.duty_cycle || msg.buzz_duty_cycle);
			//if no use_toogle exist take that as a true, for compatibility with old demos
			if(!config.use_toggle || config.use_toggle === "true")
			{
				msg.payload += ",";
				msg.payload += (config.toggle || msg.buzz_toggle);
			}
			
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("buzz_change",BuzzChange);
}