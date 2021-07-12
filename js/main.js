const tennisHitAudio = document.getElementById('tennis-hit');
const startStopBtn = document.querySelector('#start-stop-btn');
const initialBtnText = 'Play a set';
startStopBtn.innerHTML = initialBtnText;
let isPlayingTennis = false;

const handleOnOff = (e) => {
    if (isPlayingTennis) {
        window.removeEventListener('devicemotion', handleMotion);
        isPlayingTennis = false;
        startStopBtn.innerHTML = initialBtnText;
    } else {
        window.addEventListener('devicemotion', handleMotion);
        isPlayingTennis = true;
        startStopBtn.innerHTML = 'Stop';
    }
};

// let h1 = document.createElement('h1');
// document.body.appendChild(h1);

const handleMotion = (e) => {
    let motion = (Math.round(Math.abs(e.acceleration.z) * 100 ) / 100) / 5;
    motion += 1;
    
    if (motion > 3) {
        tennisHitAudio.play();
    }
    
    // h1.innerHTML = motion;
}

startStopBtn.addEventListener('click', handleOnOff);