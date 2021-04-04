function getNowFormatDate() {
    var date = new Date();
    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator + month + seperator + strDate
    return currentdate;
}


function getStuID() {
      let http = new XMLHttpRequest()
      http.open('POST', 'https://sec.lit.edu.cn/webvpn/LjIwNi4xNzAuMjE4LjE2Mi4xNjg=/LjIxMS4xNzUuMTQ4LjE1OC4xNTguMTcwLjk0LjE1Mi4xNTAuMjE2LjEwMi4xOTcuMjA5/portal/myCenter/getMemberInfoForCurrentMember?vpn-0',false)
      http.send()
      const member = JSON.parse(http.responseText);
      return member.obj.memberId
}


function scheduleHtmlProvider(iframeContent = "", frameContent = "") {

      let stuid = getStuID()

      let date = getNowFormatDate()

      //console.log(stuid, date)

      let http = new XMLHttpRequest()
      http.open('POST', '/webvpn/LjIwNi4xNzAuMjE4LjE2Mi4xNjg=/LjIxMS4xNzUuMTQ4LjE1OC4xNTguMTcwLjk0LjE1Mi4xNTAuMjE2LjEwMi4xOTcuMjA5/microapplication/api/course/getCourse?vpn-0', false)
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.send('userName=' + stuid + '&currentTime=' + date + '&role=1')
      courseJson = http.responseText
      
      // 抛弃了从 html 获取, 因为课表不完整...
      // var sch = document.getElementById("wyy3")
      if (!courseJson) {
            let TriPrompto = `
            没有获取到课表哦
            导入流程:
             >> 输入账号密码登陆
             >> 然后点击 "一键导入"
            `
            alert(TriPrompto)
      }
      return courseJson
}