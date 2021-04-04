function scheduleHtmlParser(html) {

    let result = []

    console.log(html)

    // 抛弃了从 html 获取, 因为课表不完整...
    // // 加载 cheerio
    // const $ = cheerio.load(html, { decodeEntities: false });
    // var sch = document.getElementById("wyy3")
    // // 找到课表所在位置
    // $('tr').each(function (section) {
    //     // 按节开始, 第一节从第一个 tr 开始
    //     if (section > 0) {
    //         console.log(section)
    //         $(this).find('td').each(function (day) {
    //             // 按天开始， 星期一从第一个 td 开始
    //             if (day > 2) {
    //                 console.log($(this).text())
    //             }
    //         })
            
    //     }
    // })

    return { courseInfos: result }
}


