const tennisHitAudio = document.getElementById('tennis-hit');
const startStopBtn = document.querySelector('#start-stop-btn');
const initialBtnText = 'Play a set';
startStopBtn.innerHTML = initialBtnText;
let isPlayingTennis = false;

let alertMsg = document.createElement('div');
    alertMsg.classList.add('alertMsg');
    alertMsg.innerHTML = `
        <h1>!</h1>
        <p>
            Unfortunately your device isn't supported.<br/>
            Solution: use a ping-pong ball for the IRL experience =)
        </p>
    `;

try {
    const reqMotionAndAddEvent = (motionFunc) => {
        DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', motionFunc);
            isPlayingTennis = true;
            startStopBtn.innerHTML = 'Stop';
          }
        })
    }
    const handleOnOff = (e) => {
        if (isPlayingTennis) {
            window.removeEventListener('devicemotion', handleMotion);
            isPlayingTennis = false;
            startStopBtn.innerHTML = initialBtnText;
        } else {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                reqMotionAndAddEvent(handleMotion);
            } else {
                window.addEventListener('devicemotion', handleMotion);
                isPlayingTennis = true;
                startStopBtn.innerHTML = 'Stop';
            }
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
} catch (error) {
    document.body.prepend(alertMsg);
}