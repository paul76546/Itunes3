import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
      const audio = document.querySelector('.audio');
      const audioImg = document.querySelector('.audio-img');
      const audioHeader = document.querySelector('.audio-header');
      const audioPlayer = document.querySelector('.audio-player');
      const audioNavigation = document.querySelector('.audio-navigation');
      const audioButtonPlay = document.querySelector('.audio-button__play');
      const audioProgress = document.querySelector('.audio-progress');
      const audioProgressTiming = document.querySelector('.audio-progress__timing');
      const audioTimePassed = document.querySelector('.audio-time__passed');
      const audioTimeTotal = document.querySelector('.audio-time__total');
      
      const playlist = ['hello', 'flow', 'speed'];//треки плейлиста, хочу поменять! и дописать свои!!!
      
      let trackIndex = 0;
      



  const loadTrack = () => {
      const isPlayed = audioPlayer.paused;
      const track = playlist[trackIndex];
      audioImg.src = `audio/${track}.jpg`;
      audioHeader.textContent = track.toUpperCase();
      audioPlayer.src = `audio/${track}.mp3`;

      if (isPlayed) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
        //audioPlayer.addEventListener('canplay', (event) => {//не работает
        // 
        //  updateTime();
        //});
      //setTimeout(updateTime, 500)//у меня не работает почему то?!
      
  };

  const prevTrack = () => {
    if (trackIndex !==0) {
      trackIndex--;
  } else {
      trackIndex = playlist.length - 1;
  }
      loadTrack();
  };

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
  } else {
    trackIndex ++;
  }
      loadTrack();
          }; 










      audioNavigation.addEventListener('click', event => {
          const target = event.target;
          

          if (target.classList.contains('audio-button__play')) {
             audio.classList.toggle('play');
             audioButtonPlay.classList.toggle('fa-play');
             audioButtonPlay.classList.toggle('fa-pause');

             const track = playlist[trackIndex];
             if (audioPlayer.paused) {
               audioPlayer.play();
             } else {
                audioPlayer.pause();
             }
             
             audioHeader.textContent = track.toUpperCase();
             //audio.Img.src = ``
          }
          if (target.classList.contains('audio-button__prev')) {
              prevTrack();
          }
          if (target.classList.contains('audio-button__next')) {
              nextTrack();
          }
      });
      
      audioPlayer.addEventListener('ended', () => {
          nextTrack();
          audioPlayer.play();
      });

  audioPlayer.addEventListener('timeupdate', () => {
  const duration = audioPlayer.duration;
  const currentTime = audioPlayer.currentTime;

  const progress = (currentTime / duration) * 100;
  audioProgressTiming.style.width = progress + '%';

  const minutesPassed = Math.floor(currentTime / 60) || '0';   
  const secondsPassed = Math.floor(currentTime % 60) || '0';

  const minutesTotal = Math.floor(duration / 60) || '0';   
  const secondsTotal = Math.floor(duration % 60) || '0';

  audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
  audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`

        });

        
      

      audioProgress.addEventListener('click', event => {
          const x = event.offsetX;
          const allWidht = audioProgress.clientWidth;
          const progress = (x / allWidht) * audioPlayer.duration;
          audioPlayer.currentTime = progress;

      });

          musicPlayerInit.stop = () => {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                audio.classList.remove('play');
                audioButtonPlay.classList.remove('fa-pause');
                audioButtonPlay.classList.add('fa-play');
              }



          }



};
//Интенсив Я.Tunes — Финальный день. Ответы на вопросы ютуб


                    //можно по умолчанию 
                    //const musicPlayerInit = () => {
                    //console.log('music Player');
                    //};
                    //export default musicPlayerInit;//тогда в index.js убираем фигурные скобки при импорте функции