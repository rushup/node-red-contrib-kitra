module.exports = function(RED) {
    function PosStepCounterGet(config) {
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
			if(calc_chks == pack_chks && msg.payload.indexOf("$KITRA,667,") > -1)
			{
				var splitted = msg.payload.split(",");
				var steps = splitted[2].split("*")[0];
				if(parseInt(steps) >= 0)
				{
					msg.step_counter = steps;
					node.send(msg);
				}
			}
        });
    }
    RED.nodes.registerType("pos_step_counter_get",PosStepCounterGet);
}