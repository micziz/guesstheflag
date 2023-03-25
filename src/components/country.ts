import { writable } from 'svelte/store';
import randomCountry from 'random-country'
let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

export const playing = writable(true)
export const startPlaying = writable(false)

let countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

async function getWinningCountryAndFlag(): Promise<string[]> {
    const country = randomCountry();
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`)
    let flag
    if (res.ok){
        const data = await res.json()
        flag = data[0].flags.png
    } else {
        const country = randomCountry();
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`) 
        const data = await res.json()
        flag = data[0].flags.png
    }
    return [country, flag]
}

async function getOtherThreeList(winningCountry) {
    const newArr = countryList 
    const indexOfWinningCountry = countryList.indexOf(winningCountry)
    newArr.splice(indexOfWinningCountry, 1)
    const countryArrayToReturn = []
    countryArrayToReturn.push(newArr[Math.floor( Math.random() * countryList.length )])
    countryArrayToReturn.push(newArr[Math.floor( Math.random() * countryList.length )])
    countryArrayToReturn.push(newArr[Math.floor( Math.random() * countryList.length )])
    return countryArrayToReturn
}

export async function regen() {
    let theFour = []
    let winningCountry = await getWinningCountryAndFlag()
    let otherThree = await getOtherThreeList(winningCountry[0])
    theFour.push(regionNames.of(winningCountry[0]))
    otherThree.forEach((el) => {
        theFour.push(el)
    })
    theFourStore.set(theFour)
    winningCountryStore.set(winningCountry[0])
    flag.set(winningCountry[1])
}

let theFour = []
let winningCountry = await getWinningCountryAndFlag()

let otherThree = await getOtherThreeList(winningCountry[0])
theFour.push(regionNames.of(winningCountry[0]))
otherThree.forEach((el) => {
    theFour.push(el)
})
export const theFourStore = writable(theFour)
export const winningCountryStore = writable(winningCountry[0])
export const flag = writable(winningCountry[1])