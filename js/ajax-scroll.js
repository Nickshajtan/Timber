jQuery(document).ready(function($) {
function hide_pagination() {
    $(".pagination").hide();
    $(".pager").hide();
}    
$('.items-leading').addClass('item');    
if ($("li.pagination-next a").length > 0){
$('article').jscroll({
    loadingHtml: '<center><div class="animation-gif"></div></center>',
    padding: 0,
    autoTrigger: true,
    nextSelector: '.pagination-next a',
    contentSelector: '.item',
    callback: hide_pagination
});
$('.item-page').jscroll({
    loadingHtml: '<center><div class="animation-gif"></div></center>',
    padding: 0,
    autoTrigger: true,
    nextSelector: '.pagination-next a',
    contentSelector: '.sigProContainer',
    callback: hide_pagination
});        
}
if ($(".myjsp-next a").length > 0){
 $('article').jscroll({
    loadingHtml: '<center><div class="animation-gif"></div></center>',
    padding: 0,
    autoTrigger: true,
    nextSelector: '.myjsp-next a',
    contentSelector: '.sigProContainer',
    callback: hide_pagination
});   
}    
}); 