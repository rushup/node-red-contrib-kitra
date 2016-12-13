module.exports = function(RED) {
    function SystemStatusGet(config) {
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
			if(calc_chks == pack_chks && msg.payload.indexOf("$KITRA,615,") > -1)
			{
				var splitted = msg.payload.split(",");
				var bat = splitted[2];
				var usb = splitted[3].split("*")[0];
				if(parseInt(bat) >= 0 && parseInt(usb) >= 0)
				{
					msg.battery_mv = bat;
					msg.battery_usb_plugged = usb;
					node.send(msg);
				}
			}
        });
    }
    RED.nodes.registerType("system_status_get",SystemStatusGet);
}