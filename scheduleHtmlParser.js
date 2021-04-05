/*************************************************************************************
* Author : icepie
* last updated @ 2021/04/06 14:45
* Any question or assistances please contact: mailto:icepie.dev@gmail.com
* this project has been updated to Github:
** https://github.com/icepie/AIschedule-LIT-Portal
***************************************************************************************/

function week2Day(day) {
    switch (day) {
        case "一": return 1;
        case "二": return 2;
        case "三": return 3;
        case "四": return 4;
        case "五": return 5;
        case "六": return 6;
        case "日": return 7;
    }
    return 7
}

// "7-9,10-11" -> [{section:7},{section:8},{section:9},{section:10},{section:11}]
function multisectionText2List(text) {
    let sections = [];
    let splited = text.split(",");
    for (let t of splited) {
        let sec = sectionText2List(t);
        sections = sections.concat(sec);
    }
    return sections;
}

// "7-9" -> [{section:7},{section:8},{section:9}]
function sectionText2List(text) {
    let sections = [];

    let splited = text.split("-");
    if (splited.length == 1) {
        sections.push({ section: Number(text) });
        return sections;
    }
    let start = Number(splited[0]);
    let end = Number(splited[1]);
    for (let i = start; i <= end; i++) {
        sections.push({ section: i });
    }
    return sections;
}

// "7-9,10-11" -> [7,8,9,10,11]
function multiWeekText2List(text,mode=0) {
    let sections = [];
    let splited = text.split(",");
    for (let t of splited) {
        let sec = weekText2List(t,mode);
        sections = sections.concat(sec);
    }
    return sections;
}

// "7-9" -> [7,8,9]
// mode: 0, 1, 2
function weekText2List(text,mode=0) {
    let sections = [];
    let splited = text.split("-");
    if (splited.length == 1) {
        sections.push(Number(text));
        return sections;
    }
    let start = Number(splited[0]);
    let end = Number(splited[1]);
    for (let i = start; i <= end; i++) {
        if (mode == 1 && i % 2 == 1)
        {
           sections.push(i);
        }
        else if (mode == 2 && i % 2 == 0)
        {
           sections.push(i);
        }
        else if (mode == 0)
        {
           sections.push(i);
        }
       
    }
    return sections;
}

let sectionTimeSummer = [
    {
        section: 1,
        startTime: "08:00",
        endTime: "08:45"
    },
    {
        section: 2,
        startTime: "08:55",
        endTime: "09:40"
    },
    {
        section: 3,
        startTime: "10:00",
        endTime: "10:45"
    },
    {
        section: 4,
        startTime: "10:55",
        endTime: "11:40"
    },
    {
        section: 5,
        startTime: "14:30",
        endTime: "15:15"
    },
    {
        section: 6,
        startTime: "15:25",
        endTime: "16:10"
    },
    {
        section: 7,
        startTime: "16:30",
        endTime: "17:15"
    },
    {
        section: 8,
        startTime: "17:25",
        endTime: "18:10"
    },
    {
        section: 9,
        startTime: "19:00",
        endTime: "19:45"
    },
    {
        section: 10,
        startTime: "19:55",
        endTime: "20:40"
    },
]

let sectionTimeWinter = [
    {
        section: 1,
        startTime: "08:00",
        endTime: "08:45"
    },
    {
        section: 2,
        startTime: "08:55",
        endTime: "09:40"
    },
    {
        section: 3,
        startTime: "10:00",
        endTime: "10:45"
    },
    {
        section: 4,
        startTime: "10:55",
        endTime: "11:40"
    },
     {
        section: 5,
        startTime: "14:30",
        endTime: "15:15"
    },
    {
        section: 6,
        startTime: "15:25",
        endTime: "16:10"
    },
    {
        section: 7,
        startTime: "16:30",
        endTime: "17:15"
    },
    {
        section: 8,
        startTime: "17:25",
        endTime: "18:10"
    },
    {
        section: 9,
        startTime: "19:00",
        endTime: "19:45"
    },
    {
        section: 10,
        startTime: "19:55",
        endTime: "20:40"
    },
]

function scheduleHtmlParser(html) {

    let courseInfoList = []

    jsonData = JSON.parse(html);

    //console.log(jsonData.obj)
    
    // 遍历
    for (var index in jsonData.obj) {

       let raw = jsonData.obj[index]

       // console.log(raw)
        
       // 课程详情
       let courseName = raw.courseName
       let coursePosition = raw.courseAdressCode
       let courseTeacher = raw.courseTeacherName
        
       // console.log(raw.courseWeekly)

       let courseWeeks = multiWeekText2List(raw.courseWeekly, raw.courseSingleDoubleWeek)
       let courseDay = week2Day(raw.courseDate)
       let courseSections = multisectionText2List(raw.courseSection)

        // 创建课程
        let courseInfo = {
            name: courseName,
            position: coursePosition,
            teacher: courseTeacher,
            weeks: courseWeeks,
            day: courseDay,
            sections: courseSections
        }
    
       // 添加到课程列表
       courseInfoList.push(courseInfo)
    }

    // 判断月份 使用对应作息时间
    let sectionTime = sectionTimeSummer
    let today = new Date();
    let month = today.getMonth();
    if (month >= 10 || month < 5) {
        sectionTime = sectionTimeWinter
    }

    // 生成最终结果
    let result = {
        courseInfos: courseInfoList,
        sectionTimes: sectionTime
    }
    
    return result
}
