module.exports = function(RED) {
    function MicNotiCatch(config) {
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
			//6.8.1	Read state response
			if((msg.payload.indexOf("$KITRA,681,") > -1))
			{
				var splitted = msg.payload.split(",");
				msg.angle = parseInt(splitted[2].split("*")[0]);
				
				node.send([msg, null]);
				return;
			}
			
			//6.8.2	Notification
			if((msg.payload.indexOf("$KITRA,682,") > -1))
			{
				var splitted = msg.payload.split(",");
				msg.angle = parseInt(splitted[2].split("*")[0]);
				
				node.send([null,msg]);
				return;
			}

        });
    }
    RED.nodes.registerType("mic_notification_catch",MicNotiCatch);
}