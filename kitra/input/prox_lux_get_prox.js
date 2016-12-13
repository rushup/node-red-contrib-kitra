module.exports = function(RED) {
    function ProxLuxGetProx(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			if(!msg.payload)
				return;
			msg.payload = msg.payload.toString();
			
			var calc_chks = util.getChecksum(msg.payload.substring(1,msg.payload.length-5));
			var pack_chks = msg.payload.substring(msg.payload.length-4,msg.payload.length-2);
			//this.log(calc_chks + "    " + pack_chks + '\n');
			if(calc_chks == pack_chks && msg.payload.indexOf("$KITRA,652,") > -1)
			{
				var splitted = msg.payload.split(",");
				var pin = splitted[2];
				var prox = splitted[3].split("*")[0];
				if(parseInt(prox) >= 0)
				{
					msg.prox_pin = pin;
					msg.prox_mm = pin;
					msg.payload = prox;
					node.send(msg);
				}
			}
        });
    }
    RED.nodes.registerType("prox_lux_get_prox",ProxLuxGetProx);
}