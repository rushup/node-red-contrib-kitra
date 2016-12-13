module.exports = function(RED) {
    function AdcGet(config) {
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
			if(calc_chks == pack_chks && msg.payload.indexOf("$KITRA,631,") > -1)
			{
				var splitted = msg.payload.split(",");
				var pin = splitted[2];
				var adc = splitted[3].split("*")[0];
				if(parseInt(adc) >= 0)
				{
					msg.adc_pin = pin;
					msg.payload = adc;
					node.send(msg);
				}
			}
        });
    }
    RED.nodes.registerType("adc_get",AdcGet);
}