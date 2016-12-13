module.exports = function(RED) {
    function DiNotiCatch(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var util = require("../kitra_util.js");
        this.on('input', function(msg) {
			if(!msg.payload)
				return;
			msg.payload = msg.payload.toString();
			
			var calc_chks = util.getChecksum(msg.payload.substring(1,msg.payload.length-5));
			var pack_chks = msg.payload.substring(msg.payload.length-4,msg.payload.length-2);
			//6.2.1	Read state response || 6.2.2	State notification
			if(calc_chks == pack_chks && msg.payload.indexOf("$KITRA,621,") > -1 || msg.payload.indexOf("$KITRA,622,") > -1)
			{
				var splitted = msg.payload.split(",");
				var pin = splitted[2];
				var state = splitted[3].split("*")[0];
				if(parseInt(state) >= 0)
				{
					msg.pin = pin;
					msg.state = state;
					node.send(msg);
				}
			}
        });
    }
    RED.nodes.registerType("di_notification_catch",DiNotiCatch);
}