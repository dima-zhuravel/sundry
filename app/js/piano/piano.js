const Piano = function() {};

Piano.prototype.listenKeys = function() {

    function playSound(e){
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

        if(!audio) return; //stop playing if its not tha audio
        audio.currentTime = 0; //start play from 0 sec every time
        audio.play();

        key.classList.add('playing');
    }

    window.addEventListener('keydown', playSound);
    
    this.transition();
};

Piano.prototype.transition = function() {
    const transition = document.querySelectorAll('.key');

    function removeTransition(e) {
        if(e.propertyName !== 'transform') return;
        this.classList.remove('playing'); 
    }

    transition.forEach(key => key.addEventListener('transitionend', removeTransition));
};

module.exports = Piano;