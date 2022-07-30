const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const more =document.getElementById('more');
//Show modal
open.addEventListener('click', () =>{
    document.getElementById('ohBiggie').classList.add('bottomed');
    document.getElementById('wrapUp').classList.add('bottomed');
    document.getElementById('wrapUp2').classList.add('bottomed');
    modal.classList.add('show-modal');
    document.getElementById('toggle').classList.add('phased');
    document.getElementById('toTopperCase2').classList.add('phased');
    more.classList.add('bottomed');
}
);
//Hide modal
close.addEventListener('click', () =>{
    document.getElementById('ohBiggie').classList.remove('bottomed');
    document.getElementById('wrapUp').classList.remove('bottomed');
    document.getElementById('wrapUp2').classList.remove('bottomed');
    modal.classList.remove('show-modal');
    document.getElementById('toggle').classList.remove('phased');
    document.getElementById('toTopperCase2').classList.remove('phased');
    more.classList.remove('bottomed');
}
);
//Hide modal on body-click
window.addEventListener('click', e =>{
    e.target == modal ? modal.classList.remove('show-modal') : false;
    e.target == modal ? document.getElementById('toggle').classList.remove('phased') : false;
    e.target == modal ? document.getElementById('toTopperCase2').classList.remove('phased') : false;
    e.target == modal ? document.getElementById('wrapUp').classList.remove('bottomed') : false;
    e.target == modal ? document.getElementById('wrapUp2').classList.remove('bottomed') : false;
    e.target == modal ? document.getElementById('ohBiggie').classList.remove('bottomed') : false;
    e.target == modal ? more.classList.remove('bottomed') : false;
}
);