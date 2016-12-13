module.exports = function(RED) {
    function ProxLuxManagedCatch(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			if(!msg.payload)
				return;
			msg.payload = msg.payload.toString();
			
			var calc_chks = util.getChecksum(msg.payload.substring(1,msg.payload.length-5));
			var pack_chks = msg.payload.substring(msg.payload.length-4,msg.payload.length-2);
			if(calc_chks != pack_chks)
				return;
			if((msg.payload.indexOf("$KITRA,654,") > -1))
			{
				var splitted = msg.payload.split(",");
				msg.prox_lux_evt = parseInt(splitted[2].split("*")[0]);
				
				if(msg.prox_lux_evt == 0)
					node.send([msg]);
				else if(msg.prox_lux_evt == 1)
					node.send([null,msg]);
				return;
			}

        });
    }
    RED.nodes.registerType("prox_lux_managed_catch",ProxLuxManagedCatch);
}