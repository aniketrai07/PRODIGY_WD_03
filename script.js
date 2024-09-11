let startTime, updatedTime, difference, tInterval, running = false;
        const display = document.getElementById('display');
        const laps = document.getElementById('laps');

        document.getElementById('start').addEventListener('click', start);
        document.getElementById('stop').addEventListener('click', stop);
        document.getElementById('reset').addEventListener('click', reset);
        document.getElementById('lap').addEventListener('click', recordLap);

        function start() {
            if (!running) {
                startTime = new Date().getTime();
                tInterval = setInterval(getShowTime, 1);
                running = true;
            }
        }

        function stop() {
            if (running) {
                clearInterval(tInterval);
                running = false;
            }
        }

        function reset() {
            clearInterval(tInterval);
            running = false;
            display.innerHTML = '00:00:00.000';
            laps.innerHTML = '';
        }

        function recordLap() {
            if (running) {
                const lapTime = display.innerHTML;
                const li = document.createElement('li');
                li.innerText = lapTime;
                laps.insertBefore(li,laps.firstChild);
            }
        }

        function getShowTime() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            const milliseconds = difference % 1000;
            display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
        }

        function pad(number, length = 2) {
            return number.toString().padStart(length, '0');
        }
