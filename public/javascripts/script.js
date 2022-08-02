const toggle = document.getElementById('toggle');
const theToggle = document.getElementById('theToggle');
const goToTop = document.getElementById('goToTop');
const goToTop2 = document.getElementById('goToTop2');
//Toggle nav
toggle.addEventListener('click', () =>{
    document.body.classList.toggle('show-nav');
    toggle.classList.toggle('toggleTurned');
    goToTop.classList.toggle('moved');
    goToTop2.classList.toggle('reveal');
    if(theToggle.classList.contains('fa-bars')){
        theToggle.classList.replace('fa-bars','fa-close');
    }else{
        theToggle.classList.replace('fa-close','fa-bars');
    }
}
);

//Move toggle down on scroll
function stickyFix(){
    if($(document).scrollTop()>72){
        $(".description").addClass('shrink');
        $("#toggle").addClass('moved');
        $(".links").addClass('shrinkText');
        $(".socials").addClass('socialsSmalled');
    }else{
        $(".description").removeClass('shrink');
        $("#toggle").removeClass('moved');
        $(".links").removeClass('shrinkText');
        $(".socials").removeClass('socialsSmalled');
    }
}
$(document).on('scroll',function(){
    stickyFix();
});