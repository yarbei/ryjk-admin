/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(function () {
    // eslint-disable-next-line space-before-function-paren
    var getUrlParams = function () {
        let hashStr = window.location.search
        let params = {}
        if (hashStr.split('?')[1]) {
            let arr = hashStr.split('?')[1].split('&')

            for (let i = 0, len = arr.length; i < len; i++) {
                let data = arr[i].split('=')
                if (data.length === 2) {
                    params[data[0]] = data[1]
                }
            }
        }
        return params
    }

    // 获取患者信息
    let personInfo = JSON.parse(sessionStorage.getItem('openIMPersonInfo'))
    console.log(personInfo)

    // 获取计划列表
    let planList = JSON.parse(sessionStorage.getItem('openIMPlanList'))

    // 打开聊天窗口
    let account = getUrlParams().account || personInfo.yunXinAccount // account 例如 'test99';
    window.yunXin.openChatBox(account, 'p2p')

    // 设置患者信息
    $('.personInfo .name').html(personInfo.name)
    $('.personInfo .age').html(personInfo.age)
    $('.personInfo .sex').html(personInfo.sex == 2 ? '女' : '男')
    $('.personInfo .idCard').html(personInfo.idCard)
    $('.personInfo .phone').html(personInfo.phone)
    $('.personInfo .departmentName').html(personInfo.departmentName)
    $('.personInfo .doctorName').html(personInfo.doctorName)



    // 设置计划列表
    planList.forEach(item => {
        $('.VerticalMenu').append(`<div>
    <div><span>${item.name}</span><i class="fa fa-angle-right fa-lg"></i></div>
    <div class="parentMenu${item.planId}" name="xz"></div>
    </div>`)
        let visitList = JSON.parse(sessionStorage.getItem(item.planId))
        visitList.forEach(item1 => {
            item1.visitContent = JSON.parse(item1.visitContent)
            if (item1.visitContent.drug === undefined) {
                item1.visitContent.drug = '无'
            }
            if (item1.visitContent.diet === undefined) {
                item1.visitContent.diet = '无'
            }
            if (item1.visitContent.motion === undefined) {
                item1.visitContent.motion = '无'
            }
            if (item1.visitContent.smok === undefined) {
                item1.visitContent.smok = '无'
            }
            if (item1.visitContent.psychology === undefined) {
                item1.visitContent.psychology = '无'
            }
            if (item1.visitContent.recovery === undefined) {
                item1.visitContent.recovery = '无'
            }
            if (item1.visitContent.other === undefined) {
                item1.visitContent.other = '无'
            }
            $('.parentMenu' + item.planId).append(`
        <div>
            <div><span class="childMenu">随访时间：${item1.visitTime}</span></div>
            <div><span class="childMenu">用药建议：${item1.visitContent.drug}</span></div>
            <div><span class="childMenu">饮食建议：${item1.visitContent.diet}</span></div>
            <div><span class="childMenu">运动建议：${item1.visitContent.motion}</span></div>
            <div><span class="childMenu">戒烟限酒建议：${item1.visitContent.smok}</span></div>
            <div><span class="childMenu">心理建议：${item1.visitContent.psychology}</span></div>
            <div><span class="childMenu">康复建议：${item1.visitContent.recovery}</span></div>
            <div><span class="childMenu">其他建议：${item1.visitContent.other}</span></div>
        </div>`)
        })
    })
})




// 下拉菜单js
$(document).ready(function () {
    $('.VerticalMenu>div>div:first-child').click(function () {
        $xz = $('.VerticalMenu>div>div:first-child')
        $($xz).not(this).children('i.fa-angle-right').css({ 'transform': 'rotate(0deg)', 'color': '#000000' }).attr('leng', '')
        if ($(this).children('i.fa-angle-right').attr('leng') != 's') {
            $(this).children('i.fa-angle-right').attr('leng', 's')
            $(this).children('i.fa-angle-right').css({ 'transform': 'rotate(90deg)', 'color': '#f9579e' })
        } else {
            $(this).children('i.fa-angle-right').attr('leng', '')
            $(this).children('i.fa-angle-right').css({ 'transform': 'rotate(0deg)', 'color': '#000000' })
        }
        $($xz).not($(this)).siblings("[name='xz']").stop().slideUp(400)
        $(this).siblings("[name='xz']").slideToggle(400)
    })
    // eslint-disable-next-line camelcase
    $VerticalMenu_scdj = null
    $('.VerticalMenu>div>div:last-child>div').click(function () {
        $($VerticalMenu_scdj).css('background-color', 'white')
        $(this).css('background-color', '#00ff90')
        // eslint-disable-next-line camelcase
        $VerticalMenu_scdj = $(this)
    })
})




