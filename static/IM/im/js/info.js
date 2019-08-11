
$(document).ready(function(){
  var getUrlParams = function() {
      let hashStr = window.location.search;
      let params = {};
      if (hashStr.split('?')[1]) {
          let arr = hashStr.split('?')[1].split('&');

          for (let i = 0, len = arr.length; i < len; i++) {
              let data = arr[i].split('=');
              if (data.length === 2) {
                  params[data[0]] = data[1];
              }
          }
      }
      return params;
  }

  //获取患者信息
  let personInfo = JSON.parse(sessionStorage.getItem('openIMPersonInfo'));
   
  //打开聊天窗口
  let account = getUrlParams().account || personInfo.yunXinAccount; //account 例如 'test99';
  window.yunXin.openChatBox( account, 'p2p');

  //设置患者信息

  $(".personInfo .name").html(personInfo.name);
  $(".personInfo .age").html(personInfo.age)
  $(".personInfo .sex").html(personInfo.sex == 2 ? '女' : '男');
});