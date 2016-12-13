

module.exports = function(RED) {
    function DoPwmInit(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			msg.payload = "$KITRA,543,"+config.pin+",";
			msg.payload += config.frequency +",";
			msg.payload += config.percentage +",";
			msg.payload += (config.autostart == "true"?1:0);
			var checksum = util.getChecksum(msg.payload.substring(1));
			msg.payload += "*"+checksum+ '\r' + '\n';
            node.send(msg);
        });
    }
    RED.nodes.registerType("do_pwm_init",DoPwmInit);
}