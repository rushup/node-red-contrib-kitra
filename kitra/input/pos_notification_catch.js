module.exports = function(RED) {
    function PosNotiCatch(config) {
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
			//6.6.1	Read raw response || 6.6.3	Notification raw
			if((msg.payload.indexOf("$KITRA,661,") > -1) || (msg.payload.indexOf("$KITRA,663,") > -1))
			{
				var splitted = msg.payload.split(",");
				msg.acc_x = parseInt(splitted[2].split("*")[0]);
				msg.acc_y =  parseInt(splitted[3].split("*")[0]);
				msg.acc_z =  parseInt(splitted[4].split("*")[0]);
				msg.gyro_x =  parseInt(splitted[5].split("*")[0]);
				msg.gyro_y =  parseInt(splitted[6].split("*")[0]);
				msg.gyro_z =  parseInt(splitted[7].split("*")[0]);
				msg.magnet_x =  parseInt(splitted[8].split("*")[0]);
				msg.magnet_y =  parseInt(splitted[9].split("*")[0]);
				msg.magnet_z =  parseInt(splitted[10].split("*")[0]);
				
				node.send([msg]);
				return;
			}
			
			//6.6.2	Read euler angles response || 6.6.4	Notification euler
			if((msg.payload.indexOf("$KITRA,662,") > -1) || (msg.payload.indexOf("$KITRA,664,") > -1))
			{
				var splitted = msg.payload.split(",");
				msg.roll = parseInt(splitted[2].split("*")[0]);
				msg.pitch =  parseInt(splitted[3].split("*")[0]);
				msg.yaw =  parseInt(splitted[4].split("*")[0]);
				
				node.send([null,msg]);
				return;
			}
			
			//6.6.5	Managed notification
			if(msg.payload.indexOf("$KITRA,665,") > -1)
			{
				var splitted = msg.payload.split(",");
				var noti_mask = parseInt(splitted[2].split("*")[0],16);
				var returns = new Array();
				returns.push(null);
				returns.push(null);
				returns.push((noti_mask & 0x01)!=0?msg:null);
				returns.push((noti_mask & 0x02)!=0?msg:null);
				returns.push((noti_mask & 0x04)!=0?msg:null);
				returns.push((noti_mask & 0x08)!=0?msg:null);
				returns.push((noti_mask & 0x10)!=0?msg:null);
				returns.push((noti_mask & 0x20)!=0?msg:null);
				msg.noti_mask = noti_mask;
				
				try{
					var extra = parseInt(splitted[3].split("*")[0]);
					msg.extra = extra;
				}catch(err){
					//do nothing if bad or missing param
				}
				
				node.send(returns);
				return;
			}

        });
    }
    RED.nodes.registerType("pos_notification_catch",PosNotiCatch);
}