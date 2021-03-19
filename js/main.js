document.addEventListener('DOMContentLoaded',() =>{
    const tabs = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabItem = document.querySelectorAll('.tabheader__item'),
        dataTime = '2021-03-21';
// ----------------------tabs-------------------
       function hideItem (){
        tabItem.forEach((tabs)=>{
            tabs.classList.remove('active')
        });
        // .hide
        tabContent.forEach((item)=>{
            item.classList.remove('show');
            item.classList.add('hide');
        })
       } ;
       function showItem(i=0){
        tabContent[i].classList.add('show');
        tabItem[i].classList.add('active')
       };
       hideItem();
       showItem();

       tabs.addEventListener('click',(i)=>{
            const tab=i.target;
            if(tab && tab.classList.contains('tabheader__item')){
                tabItem.forEach((tabi,e)=>{
                    if(tab==tabi){   
                        hideItem();
                        showItem(e);
                    }
                });
            }
       });
       // ------------------//----tabs-------------------

       //---------------------timer----------------------
       function endTimeRemaining(endtime=dataTime){
        const ti = Date.parse(endtime)-Date.parse(new Date()),
        days = Math.floor(ti/(1000*60*60*24)),
        hours = Math.floor(ti/(1000*60*60)%24),
        minuts = Math.floor(ti/(1000*60)%60),
        seconds = Math.floor(ti/1000%60);
        return{
            'days':days,
            'hours':hours,
            'minuts':minuts,
            'seconds':seconds,
            'total': ti

            };  
        };
        function zeroTime(numb){
            if(numb>=0&&numb<10){
                return `0${numb}`;
            }else{
                return numb
            }
        }
        function onTimer(selector,endtime){
            const timer = document.querySelector(selector),
                day = timer.querySelector('#days'),
                hour = timer.querySelector('#hours'),
                minut = timer.querySelector('#minutes'),
                second = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock,1000);
                updateClock();
                function updateClock(){
                    const t = endTimeRemaining(endtime);
                    day.innerHTML = zeroTime(t.days);
                    hour.innerHTML = zeroTime(t.hours);
                    minut.innerHTML = zeroTime(t.minuts);
                    second.innerHTML = zeroTime(t.seconds);
                    if(t.total<=0){
                        const titleTime = document.querySelector('.promotion__timer').children;
                        // console.log('1')
                        console.log(titleTime)
                        day.innerHTML = '00';
                        hour.innerHTML = '00';
                        minut.innerHTML = '00';
                        second.innerHTML = '00';
                        clearInterval(timeInterval);
                        for (let i = 0; i < titleTime.length; i++) {
                            let timeItem=titleTime[i]
                            if(timeItem.classList.contains('title')){
                                timeItem.innerHTML='Акция закончилась.'
                            }

                        }
                        // titleTime[0]
                    }
            }
        }
        onTimer('.timer',dataTime);
        //--------------//-----timer----------------------

        //----------------------modal---------------------

        
        const modalBtnShow = document.querySelectorAll('[data-show]'),
            modal = document.querySelector('.modal'),
            modalClose = document.querySelector('[data-hiden]');
        
        function showModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow='hidden';
            clearTimeout(showModal);
        };

        function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow='';
            
            
        };

        for (let j = 0; j < modalBtnShow.length; j++) {
            let btnSow=modalBtnShow[j]
            if(btnSow.classList.contains('btn')){
                btnSow.addEventListener('click', showModal);
            }
        };

        modalClose.addEventListener('click', () => {
            closeModal()

            });

        modal.addEventListener('click',(m)=>{
            const mod=m.target;
            if (mod===modal){
                closeModal();
                }
        });
        //---закрываем модалку по ескейп
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
            clearTimeout(showModal);
        }
    });
        //--------------------
        //----таймер для вкл модалки
    setTimeout(showModal, 10000);
    clearTimeout(showModal);
        
        //--------------------------
    
    //------------модалка при сколе до футера
    function byModal() {
        if (window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll',byModal)
        }
    }
    window.addEventListener('scroll', byModal);
    
    //---------------------------------------

        //--------------//------modal---------------------
        
        //------card--------------------------------------
    class NewCard{
        constructor(src,alt,title,descr,price,parantSelector){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price =price;
        this.cours=27;
        this.convertUah();
        this.parent = document.querySelector(parantSelector);
        }
        convertUah(){
            this.price = this.price * this.cours;
        }
        renderHtml(){
            const elementHtml= document.createElement('div')
            elementHtml.innerHTML =`
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            this.parent.append(elementHtml);
        }
    }
    new NewCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).renderHtml();
    new NewCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).renderHtml();
    new NewCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).renderHtml();
    //-----//-card------------------------------------
    //------------ОТПРАВКА ФОРМЫ НА СЕРВАК------------
    const forms = document.querySelectorAll('form');
    const messag = {
        loading: 'Подождите загрузка',
        success: 'Мы перезвоним',
        fuilure: 'Опс что то не так'
    };
    forms.forEach((item) => {
        postDate(item);
    })
    function postDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = messag.loading;
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);
            request.send(formData);
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = messag.success;
                } else {
                    statusMessage.textContent = messag.fuilure;
                }
            });

        })
    }

     //---------//--ОТПРАВКА ФОРМЫ НА СЕРВАК----------
}); 

