/* 
** 作品列表 資料
*/
 var projectsData = [
  {
    'projectstypeData': 'event',
    'projectsLink': '#',
    'projectsImg': 'assets/images/work/pimg_elastine.jpg',
    'projectsType': '活動網站',
    'projectsName': 'LG Elastine 香水洗髮精－新品頁'
   },
   {
     'projectstypeData': 'event',
     'projectsLink': '#',
     'projectsImg': 'assets/images/work/pimg_philips.jpg',
     'projectsType': '活動網站',
     'projectsName': 'Philips 飛利浦 廚房家電－電商平台產品頁'
   },
   {
    'projectstypeData': 'official',
    'projectsLink': '#',
    'projectsImg': 'assets/images/work/pimg_buckskin.jpg',
    'projectsType': '形象官網',
    'projectsName': 'Buckskin Restaurant Group 柏客金餐酒集團'
   },
   {
    'projectstypeData': 'official',
     'projectsLink': '#',
     'projectsImg': 'assets/images/work/pimg_springhot.jpg',
     'projectsType': '形象官網',
     'projectsName': '清泉日式溫泉館 訂房系統'
   },
   {
    'projectstypeData': 'event',
     'projectsLink': '#',
     'projectsImg': 'assets/images/work/pimg_mission.jpg',
     'projectsType': '活動網站',
     'projectsName': 'belif 炸彈水手出任務'
   },
   {
    'projectstypeData': 'official',
     'projectsLink': '#',
     'projectsImg': 'assets/images/work/pimg_tacc.jpg',
     'projectsType': '形象官網',
     'projectsName': 'TAcc+ 台灣加速器－會員系統'
   },
   {
    'projectstypeData': 'official',
     'projectsLink': 'https://pure-design.com.tw/',
     'projectsImg': 'assets/images/work/pimg_pure.jpg',
     'projectsType': '形象官網',
     'projectsName': '純粹設計 官網'
   }
 ];

//  判斷專案類型
var newP = [];
// var newP = projectsData.filter(obj => obj.projectstypeData === 'official');

// console.log(newP);

// 預設顯示全部分類
var $projectTypeText = $('.p_drop_down_choose');
// $('.p_drop_down_radio[value=projects-all]').attr("checked", true);
$projectTypeText.text('全部分類 All Category');
newP = projectsData;

// 判斷顯示分類
function selectType(){
  $(".p_drop_down_radio:checked").each(function(){
    if ($(this).val() === 'projects-all'){
      $projectTypeText.text('全部分類 All Category');
      newP = projectsData;
    }
    else if($(this).val() === 'projects-official'){
      $projectTypeText.text('官方網站 Official Website');
      newP = projectsData.filter(obj => obj.projectstypeData === 'official');
    }
    else if($(this).val() === 'projects-event'){
      $projectTypeText.text('活動網站 Event Website');
      newP = projectsData.filter(obj => obj.projectstypeData === 'event');
    }
    else {
      $projectTypeText.text('社群素材 Social Media');
    }
  });
}

// 當選中的radio改變時
$('.p_drop_down_radio').on("change", function() {
  selectType();

  // console.log(newP);
});
  