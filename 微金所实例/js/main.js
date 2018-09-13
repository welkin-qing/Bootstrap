'use strict';
$(function(){
    function resize() {
        var windowWidth = $(window).width();//获取屏幕宽度
        //===window.innerWidth
        //判断屏幕大小的宽度,根据屏幕大小选择图片
        var isSmallScreen = windowWidth < 768;
        $('#main_ad > .carousel-inner > .item').each(function (i, item) {
            //将dom节点转换为jq对象
            var $item = $(item);
            //var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            var imgSrc =isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            //设置背景图片
            $item.css('backgroundImage', 'url("' + imgSrc + '")');

            if (isSmallScreen) {
                //当屏幕尺寸小到一定程度时需要使用img标签
                $item.html('<img src="' + imgSrc + '"  alt="轮播图"/>');
            } else {
                $item.empty();
            }
        });
    }
    //不用手动触发===$(window).trigger('ressize')
    //让window对象立即触发
    $(window).on('resize',resize).trigger('resize');

    //初始化tooltips插件
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //横向滚动条
    var $ulContainer = $('.nav-tabs');
    var width =30;
    $ulContainer.children().each(function( index, element){
        width += element.clientWidth
    });
    if(width> $(window).width()){
        $ulContainer.css('width',width).parent().css('overflow-x','scroll');
    }

    //新闻列表切换主题
    var $newsTitle = $('.news-title');
    
    $('#news .nav-pills a').on('click',function(){
        var $this = $(this);
        var title = $this.data('title');
        $newsTitle.text(title);
    });

    //轮播图左滑右滑
    var $carousel = $('.carousel');
    var startX,endX;
    var offset = 50;

    $carousel.on(touchstart,function(e){
        startX = e.originalEvent.touches[0].clientX;
    });
    $carousel.on(touchmove,function(e){
        endX = e.originalEvent.touches[0].clientX;
    })
    $carousel.on(touchend,function(e){
        console.log(e);
        var distance = Math.abs(startX - endX);
        if(distance > offset){
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    })
});