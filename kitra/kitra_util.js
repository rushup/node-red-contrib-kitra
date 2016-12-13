exports.getChecksum = function(packet)
{
  // Compute the checksum by XORing all the character values in the string.
  var checksum = 0;
  for(var i = 0; i < packet.length; i++) {
    checksum = checksum ^ packet.charCodeAt(i);
  }
  // Convert it to hexadecimal (base-16, upper case, MSB)
  var hexsum = Number(checksum).toString(16).toUpperCase();
  if (hexsum.length < 2) {
    hexsum = ("00" + hexsum).slice(-2);
  }
  return hexsum;
};
