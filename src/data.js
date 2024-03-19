export const API_KEY = 'AIzaSyA8ftE3JQD19YuViNSarHfHYit0_sh1uWU'
export const host = `http://localhost:8000/api/v1`

export const valueConverter = (value) => {
    if (value >= 1000000) {
        return Math.round(value / 100000)/10+"M";
    }  
    else if (value >= 1000) {
        return Math.floor((value/100))/10+"K"
    }
    else {
        return value
    }
}