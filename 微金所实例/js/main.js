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
});