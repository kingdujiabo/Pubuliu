// 1: window.onload时  把现在加载 的图片排序一次

var loading = false; // 如果没有加载,就可以加载

window.onload = function () {
  // 排序
  waterfall('main','box');

  //滚轮加载, 符合条件时, 当滚轮滚到最后一个div 的一半时执行ajax请求, 请求新的数据
  window.onscroll = function () {
    if　(getMore())　{
      // 这里是 ajax 请求, 如果没有加载,就可以加载, 加载完成后就设置为false未加在状态
      if (!loading) {
        loading = true;
        console.log('发起请求, 加载更多');
        // 模拟加载完成,后设置状态为false
        // setTimeout(function() {
        //   loading = false ;
        //   console.log('加载完成')
        // },3000)
        putDate();
      }
    }
  }


}

// 排序方法
// 获取大盒子. 获取 小盒子
// 计算大盒子里能放 几列 小盒子
// 计算 哪个盒子所在的位置的 offsetTop 最小
// 获取这个最小盒子的 offsetTop 加上自己的 offsetHeight  作为下一个盒子的position : top 的值
waterfall = (parent, box) => {
  // 获取大盒子. 获取 小盒子
  let parentBox = document.getElementById(parent);
  let theBox = document.getElementsByClassName(box);

  // 计算大盒子里能放 几列 小盒子
  let mainWidth = document.documentElement.clientWidth;
  let contentWidth = theBox[0].offsetWidth;
  let clo = Math.floor(mainWidth/contentWidth);

  // 给大盒子设置宽度
  parentBox.style.cssText = `width: ${contentWidth*clo}px; margin: 0 auto;`;


  /* 计算 哪个盒子所在的位置的 offsetTop 最小
    创建一个数组, 把现在屏幕宽度能设置的列数,比如最大时4列, 把前4 个div的高度放进数组中,
    然后超过 4 的开始计算,
    1: 数组中谁最小,
    2: 获取他的值 作为这个将要定位的div 的 top值, 下标*contentWidth 作为 left的定位
    3: 更改数组, 把这个div的 offsetHeight + 最小值 更新这个值
  */

  let arr = [];
  [...theBox].map((item,index) =>{
    if (index < clo ) {
      arr.push(item.offsetHeight)
    } else {
      let getMinNum = Math.min.apply( null, arr);             // 获取最小值
      let getMinNumIndex = arr.findIndex(function(item) { return item === getMinNum}) // 获取最小值所在的Index
      theBox[index].style.cssText = `position: absolute; top: ${getMinNum}px; left: ${getMinNumIndex*contentWidth}px`;
      arr[getMinNumIndex] += theBox[index].offsetHeight;
    }

  })
  // console.log();
};

// 条件, 当滚动到最后一个 div 的 中间位置, 就加载
// 即 div.offsetTop +  div.offsetHeight/2  小于 scrollTop(滚动到上面看不到的距离) + clientHeight (现在可视区域的高度) 时就加载
getMore = () => {
  let theBox = document.getElementsByClassName('box');
  let len = theBox.length;
  let ele = theBox[len - 1 ];

  // 获取div的 offsetTop ,offsetHeight
  let divTop = ele.offsetTop + ele.offsetHeight/2 ;

  // 获取 scrollTop(滚动到上面看不到的距离)
  let scrollT = document.body.scrollTop || document.documentElement.scrollTop;

  //获取 clientHeight (现在可视区域的高度)
  let clitH = document.body.clientHeight || document.documentElement.clientHeight;

  return divTop < scrollT + clitH
  console.log(clitH)
}


//后台请求数据

function putDate(){
  var xhr = ajaxContent();

  xhr.onreadystatechange = function(){


    if(xhr.readyState == 4 && xhr.status == 200) {
      var res = JSON.parse(xhr.responseText);
      var oparent = document.getElementById('main');
      var narr = JSON.parse(res.data);					//将数据转成对象
      var len =narr.length;
      for (var i = 0; i < len; i++){
        var url = narr[i].src;
        var str ='<div class="pic"><img src="imgp/'+url+'"></div>';
        var mdiv = document.createElement('div');
        mdiv.setAttribute('class','box')
        mdiv.innerHTML = str;
        console.log(mdiv);
        oparent.appendChild(mdiv);
        waterfall('main','box');			//请求一次做一次定位
        loading = false;
      }
    }

  }
  xhr.open('get','./php/pubu.php',true);

  xhr.send();


}


function ajaxContent(){
  var xhr= null;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{
    xhr =  new ActiveXObjext('Microsoft.XMLHTTP');
  }

  return xhr;
}
