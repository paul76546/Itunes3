export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');//добавляем All для получения всех радиостанций!
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMute = document.querySelector('.radio-mute');

    let prevVolume = 1;//?

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;//добавляем атрибут disabled, соответствует кнопке воспроизведение в радиоплеере
    //disabled «неработающий, отключённый») блокирует элемент формы. вданном случае при помощи js
    
    const changeIconPlay = () =>  {
        if (audio.paused) {
            radio.classList.remove('play');//когда радио на паузе убираем класс play
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');//когда заиграет радио добавляем класс play
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }
    
    
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;//разблокируем кнопку радиоплеера(воспроизведения)
        audio.src = target.dataset.radioStantion;//получаем ссылки потоков радиостанций
        audio.play();//запускаем 
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }//если музыка на паузе то музыка запускается .play();
         //иначе ставим на паузу .pause();
         changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        prevVolume = audio.volume;

    });

    radioMute.addEventListener('click',() => {
        if(audio.volume) {
            prevVolume = audio.volume;
            audio.volume = 0;
        } else {
            audio.volume = prevVolume;

        }

    })
    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };



    
};