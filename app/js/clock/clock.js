const Clock = function() {};

Clock.prototype.startClock = function() {
    const secondArrow = document.querySelector('.second-arrow');
    const minuteArrow = document.querySelector('.minute-arrow');
    const hourArrow = document.querySelector('.hour-arrow');

    function setDate() {
        const now = new Date();

        const secondsDegress = now.getSeconds();
        const minutesDegress = now.getMinutes();
        const hoursDegress = now.getHours();

        const secondsTime = ((secondsDegress / 60) * 360) + 90;
        const minuteTime = ((minutesDegress / 60) * 360) + 90;
        const hourTime = ((hoursDegress / 12) * 360) + 90;

        secondArrow.style.transform =`rotate(${secondsTime}deg)`;
        minuteArrow.style.transform =`rotate(${minuteTime}deg)`;
        hourArrow.style.transform =`rotate(${hourTime}deg)`;
    }

    setInterval(setDate, 1000);
};

module.exports = Clock;