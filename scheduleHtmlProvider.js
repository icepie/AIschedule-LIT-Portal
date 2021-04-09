/*************************************************************************************
 * Author : icepie
 * last updated @ 2021/04/09 14:45
 * Any question or assistances please contact: mailto:icepie.dev@gmail.com
 * this project has been updated to Github:
 ** https://github.com/icepie/AIschedule-LIT-Portal
 ***************************************************************************************/
function getFormatNowDate() {
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
    http.open('POST', '/webvpn/LjIwNi4xNzAuMjE4LjE2Mi4xNjg=/LjIxMS4xNzUuMTQ4LjE1OC4xNTguMTcwLjk0LjE1Mi4xNTAuMjE2LjEwMi4xOTcuMjA5/portal/myCenter/getMemberInfoForCurrentMember?vpn-0', false)
    http.send();
    let member = JSON.parse(http.responseText);
    // console.log(member)
    if (member.obj == null) {
        return null
    }
    return member.obj.memberId
}

function getCourse(stuid, date) {
    let http = new XMLHttpRequest()
    http.open('POST', '/webvpn/LjIwNi4xNzAuMjE4LjE2Mi4xNjg=/LjIxMS4xNzUuMTQ4LjE1OC4xNTguMTcwLjk0LjE1Mi4xNTAuMjE2LjEwMi4xOTcuMjA5/microapplication/api/course/getCourse?vpn-0', false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send('userName=' + stuid + '&currentTime=' + date + '&role=1');
    return JSON.parse(http.responseText).obj;
}

function distinct(a, b) {
    let obj = a.concat(b)
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    uniques = uniques;
    return uniques;
}

function scheduleHtmlProvider(iframeContent = "", frameContent = "") {

    let stuid = getStuID()

    if (stuid == null) {
        let TriPrompto = `
            没有获取到课表哦
            导入流程:
             >> 输入账号密码登陆
             >> 然后点击 "一键导入"
            `
        alert(TriPrompto)
    }


    //console.log(getFormatNowDate())
    
    // 获取本周课表
    let courseJson = getCourse(stuid, getFormatNowDate())


    var date = new Date();
    var seperator = "-";
    var year = date.getFullYear();
    
    let targetDates = [year+seperator+"09-01",year+seperator+"10-01",year+seperator+"11-01",year+seperator+"12-01"]
    // 判断月份 从特定时间取课表
    let today = new Date();
    let month = today.getMonth();
    if (month >= 3 && month <= 6) {
        targetDates = [year+seperator+"03-01",year+seperator+"04-01",year+seperator+"05-01",year+seperator+"06-01"]

    }


    for (index in targetDates){
        
        // 获取目标时间课表
        let nextWeekcourseJson = getCourse(stuid, targetDates[index])
    
        if (nextWeekcourseJson != null){
            // 整合课表
            courseJson = distinct(courseJson, nextWeekcourseJson)
        }

        //console.log(courseJson)
    }
    

    //console.log(nextWeekcourseJson)
    

    //console.log(courseJson)

    return JSON.stringify(courseJson)
}
