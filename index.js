const music = document.querySelector("audio");
const img = document.querySelector('img');
const play = document.getElementById("play"); 


const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");

const progress_div = document.getElementById("progress_div");

const songs = [
    {
        id: 'song1',
        songName: 'Filhal',
        artistName:'B Praak'
    },
    {
        id: 'song2',
        songName: 'Mehendi wale Haath',
        artistName:'Guru Randhawa'
    },
    {
        id: 'song3',
        songName: 'Ranjha',
        artistName:'B Praak, Jasleen Royal'
    },
    
]



let isAudioPlaying = false;

const playMusic = ()=>{
    isAudioPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    play.title ="Pause";
    
    
};


const pauseMusic = ()=>{
    isAudioPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    play.title ="Play";
    
};


play.addEventListener("click", ()=>
{  
    isAudioPlaying ? pauseMusic() : playMusic();

});



const loadSong = (songs)=>{
    songName.textContent = songs.songName;
    artistName.textContent = songs.artistName;
    music.src = "./Music/" + songs.id + ".mp3";
    img.src = "./Images/" + songs.id + ".jpg";
}

songIndex = 0;
const nextSong = ()=>{
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

music.addEventListener('timeupdate', (event) => 
{
    const {currentTime, duration} = event.target;
  
    let progress_time = (currentTime/duration)*100;
    progress.style.width = `${progress_time}%`;
    
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration)
    {
        total_duration.textContent = `${tot_duration}`;
    }



    let min_currentTime = Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime%60);
    if(sec_currentTime<10)
    {
        sec_currentTime = `0${sec_currentTime}`;
    }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_time.textContent = `${tot_currentTime}`;
});

progress_div.addEventListener('click', (event) => {
    const {duration} = music;
    let move_progress = (event.offsetX/event.target.clientWidth)*duration;
    music.currentTime = move_progress;
  });


music.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);