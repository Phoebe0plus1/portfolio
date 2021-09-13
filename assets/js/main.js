$(function () {
  var $window = $(window);
  var ww = $window.width();

  function indexInit() {
    /**
     * 首頁主動畫
     */
    var effects = [
      {
        options: {
          shapeColors: ['#ffcd32', '#3cb4d2', '#ffffff', '#ffcd32', '#aac38c', '#242627']
        },
        hide: {
          lettersAnimationOpts: {
            duration: 800,
            delay: (t, i) => i * 40,
            easing: 'easeOutExpo',
            opacity: {
              value: 0,
              duration: 100,
              delay: (t, i) => i * 40,
              easing: 'linear'
            },
            translateY: ['0%', '100%']
          }
        },
        show: {
          lettersAnimationOpts: {
            duration: 800,
            delay: (t, i) => i * 40,
            easing: 'easeOutElastic',
            opacity: [0, 1],
            translateY: ['100%', '0%']
          },
          shapesAnimationOpts: {
            duration: 300,
            delay: (t, i) => i * 30 + 100,
            easing: 'easeOutQuad',
            translateY: () => [anime.random(-15, 15), anime.random(-250, 250)],
            scale: () => [0.2, randomBetween(0.5, 1)],
            opacity: [
              {
                value: 1,
                duration: 1,
                delay: (t, i) => i * 30 + 100
              },
              {
                value: 0,
                duration: 200,
                delay: 200,
                easing: 'linear'
              }
            ]
          }
        }
      }
    ];

    // 文字動態
    var $word = $('.word');
    var words = Array.from($word);
    var newWords = [];
    words.forEach(function (word) {
      newWords.push(new Word(word, effects[0].options));
    });
    // console.log(newWords);

    var isAnimating = true;
    newWords[0].show(effects[0].show).then(function () {
      isAnimating = false;
      $('.index_word').delay(1500).fadeOut();
    });
    
    // 內容距離位置
    // var $mainArea = $('.index_main');

    // var wP = Math.pow($window.width(), 2) + Math.pow($window.height(), 2); // 遮罩直徑最大為螢幕對角線長度
    // $mainArea.css('margin-top', Math.pow(wP, 0.5));

    // // 滾動改變遮罩範圍
    // var $kvBox = $('.kv_box');
    // // $kvBox.css('clip-path', 'circle(' + Math.pow(wP, 0.5) / 2 + 'px at center)');
    // $window.on('scroll', function(){
    //   var scrollY = window.scrollY;
    //   $kvBox.css('clip-path', 'circle(' + scrollY + 'px at center)');
    // });

    // parallax.js
    if ($window.width() > 812) {
      for (var i = 0; i < $('.scene').length; i++) {
        var scene = $('.scene').get(i);
        var parallax = new Parallax(scene);
      }
    }


    /**
     * 首頁固定區塊
     */
    $window.on('resize', function () {
      var $section = $('.section');

      if ($window.width() > 812) {
        $section.each(function (top) {
          var $self = $(this);
          var $area = $self.find('.section_l');

          // 左邊要固定的位置
          top = $self.innerHeight() - $area.innerHeight();

          $window.on('scroll', function () {
            var scroll = $window.scrollTop();
            var position = $self.offset().top;

            if (scroll >= position) {
              $area.addClass("fixed");
            } else {
              $area.removeClass("fixed");
            }

            if (scroll >= top + position) {
              $area.css('top', top);
              $area.removeClass("fixed");
            } else {
              $area.removeAttr('style');
            }
          }).trigger('scroll');
        });
      }
    }).trigger('resize');
  }


  function workInit() {
    /* 
    ** 作品列表 瀑布流滾動出現項目
    */
    var $pList = $('.p_iist');
    var pContainW = $('.p_contain').width();
    var $pItem = $('.p_item');
    var pItemW = $pItem.width();

    function loadData() {
      // 初始化
      var counter = 0; /*計數器*/
      var pageStart = 0; /*offset*/
      var pageSize = 0; /*size*/
      if (ww <= 1366) {
        pageSize = 6;
      } else {
        pageSize = 8;
      }

      var isEnd = false; /*結束標誌*/
      // pitemMax = Math.max(Math.floor(pContainW / 380), 1);
      // $pList.width(pitemMax * 400);

      // 首次載入
      getData(pageStart, pageSize);

      // isEnd == true --> 載入更多
      $(window).scroll(function () {
        if (isEnd == true) {
          return;
        }

        // 當滾動到最底部以上50畫素時， 載入新內容
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 50) {
          counter++;
          pageStart = counter * pageSize;

          getData(pageStart, pageSize);
        }
      });

      function getData(offset, size) {
        // $.ajax({
        // type: 'POST',
        // url: adminUrl + 'common/newsServer/0',
        // dataType: 'json',
        // success: // $(function () {
        // 全部的資料筆數
        var sum = newP.length;
        var result = '';

        /****將內容append到ul裡面*********/
        /*如果剩下的記錄數不夠分頁，就讓分頁數取剩下的記錄數
        * 例如分頁數是5，只剩2條，則只取2條
        *
        * 實際MySQL查詢時不寫這個不會有問題
        */
        if (sum - offset < size) {
          size = sum - offset;
        }

        /*使用for迴圈模擬SQL裡的limit(offset,size)*/
        var t = 0;
        for (var i = offset; i < (offset + size); i++) {
          result =
            $('<li class="p_item">' +
              '<a href="' + newP[i].projectsLink + '" target="_blank" rel="nofollow noopener">' +
              '<div class="p_img">' +
              '<img src="' + newP[i].projectsImg + '" alt="' + newP[i].projectsName + '">' +
              '</div>' +
              '<p class="p_type">' + newP[i].projectsType + '</p>' +
              '<h3 class="p_name">' + newP[i].projectsName + '</h3>' +
              '</a>' +
              '</li>');
          // console.log(result);

          // 出現動態
          t += .15,
            TweenMax.fromTo(result, .6, {
              opacity: 0,
              scale: 0.3
            }, {
              opacity: 1,
              scale: 1,
              ease: Power1.easeOut,
              force3D: !0,
              delay: t
            });

          $pList.append(result);
        }

        // 如果後面沒資料了
        if ((offset + size) >= sum) {
          isEnd = true;
        }
        // });
        // ,
        // error: function (xhr, type) {
        //   alert('Ajax error!');
        // }
      }
    }
    // loadData();


    /* 
    ** 作品列表 分類選擇
    */
    // 距離左邊位置
    // $('.p_drop_down').css('margin-left', (pContainW - $pList.width()) / 2 + 10);

    // 出現下拉選單
    // var $dropDownTitle = $('.p_drop_down_choose');
    // var $dropDownItem = $('.p_drop_down ul');
    // $dropDownTitle.click(function(e) {
    //   e.preventDefault();

    //   var $this = $(this);
    //   $this.toggleClass('close');

    //   if ($dropDownItem.hasClass('active')) {
    //     $dropDownItem.removeClass('active');
    //   } else {
    //     $dropDownItem.addClass('active');
    //   }
    // });

    // // 類別選擇切換
    // $('.p_drop_down_radio').on('change', function() {
    //   //  清空原始內容
    //   $pList.empty();
    //   // 重新載入資料
    //   loadData();

    //   $('.p_drop_down_choose').toggleClass('close');
    //   // 關閉類別選單
    //   if ($dropDownItem.hasClass('active')) {
    //     $dropDownItem.removeClass('active');
    //     } else {
    //       $dropDownItem.addClass('active');
    //     }
    // });
  }

  /**
   * 判斷目前頁面 決定執行的function
   */
  var defaultPageName = 'index';
  var pathArr = location.pathname.split('/');
  var pathLen = pathArr.length;
  var pageName = pathArr[pathLen - 1].replace('.html', '').replace('.php', '');
  if (!pageName) {
    pageName = defaultPageName;
  }

  if (pageName == 'index') {
    indexInit();
  } else if (pageName == 'work') {
    workInit();
  }
});