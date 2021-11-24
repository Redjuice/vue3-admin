// 格式化时间
export default {
  name: 'formatDate',
  func: (timestamp, format) => {
    if (!timestamp) {
      return '--';
    }
    if (!format) {
      format = 'yyyy-MM-dd hh:mm:ss';
    }
    timestamp = parseInt(timestamp) * 1000;
    var realDate = new Date(timestamp);

    function timeFormat(num) {
      return num < 10 ? '0' + num : num;
    }

    var date = [
      ['M+', timeFormat(realDate.getMonth() + 1)],
      ['d+', timeFormat(realDate.getDate())],
      ['h+', timeFormat(realDate.getHours())],
      ['m+', timeFormat(realDate.getMinutes())],
      ['s+', timeFormat(realDate.getSeconds())],
      ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
      ['S+', realDate.getMilliseconds()]
    ];
    var reg1 = new RegExp('(y+)', 'i').exec(format);
    if (reg1) {
      format = format.replace(
        reg1[1],
        (realDate.getFullYear() + '').substring(4 - reg1[1].length)
      );
    }
    for (var i = 0; i < date.length; i++) {
      var k = date[i][0];
      var v = date[i][1];

      var reg2 = new RegExp('(' + k + ')').exec(format);
      if (reg2) {
        format = format.replace(
          reg2[1],
          reg2[1].length == 1 ? v : ('00' + v).substring(('' + v).length)
        );
      }
    }
    return format;
  }
};
