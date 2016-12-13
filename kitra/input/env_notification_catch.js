module.exports = function(RED) {
    function EnvNotiCatch(config) {
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
			//6.7.1	Read value response || 6.7.2 Notification
			if((msg.payload.indexOf("$KITRA,671,") > -1) || (msg.payload.indexOf("$KITRA,672,") > -1))
			{
				var splitted = msg.payload.split(",");
				try{
					msg.pressure = parseInt(splitted[2].split("*")[0]);
					msg.temperature =  parseInt(splitted[3].split("*")[0]);
					msg.humidity =  parseInt(splitted[4].split("*")[0]);
					msg.lux =  parseInt(splitted[5].split("*")[0]);
				}catch (e){
					
				}
				
				node.send([msg]);
				return;
			}

        });
    }
    RED.nodes.registerType("env_notification_catch",EnvNotiCatch);
}