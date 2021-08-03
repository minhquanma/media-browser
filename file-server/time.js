
function secondsToHours(input) {
    const remainder = input % 3600;
    const hours = (input - remainder) / 3600;

    return {
        hours, remainder
    }
}

function stringToDuration(input = "00:00:00") {
    const [hours, minutes, seconds] = input.split(':');
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}

function secondsToMinutes(input) {
    const remainder = input % 60;
    const minutes = (input - remainder) / 60;

    return {
        minutes, remainder
    }
}

function formatTime(input) {
    return String(input).padStart(2, '0')
}

function createDuration(input) {
    return {
        time: stringToDuration(input),
      
        add(value) {
            this.time += stringToDuration(value)
            return this;
        },
    
        substract(value) {
            this.time -= stringToDuration(value)
            return this;
        },

        toString() {
            if (this.time === 0) return "00:00:00";
    
            let outputHours = 0, outputMinutes = 0, outputSeconds = 0;
    
            const { hours, remainder: hourRemainder } = secondsToHours(this.time);
    
            outputHours = hours;
    
            if (hourRemainder) {
                const { minutes, remainder: minuteRemainder } = secondsToMinutes(hourRemainder);
    
                outputMinutes = minutes;
    
                if (minuteRemainder) outputSeconds = minuteRemainder
    
            }
    
            return `${formatTime(outputHours)}:${formatTime(outputMinutes)}:${formatTime(outputSeconds)}`;
            
        }
    };
}


console.log(createDuration("02:07:00").add("00:01:00").toString())

console.log(createDuration("01:00:00").substract("00:01:00").toString())