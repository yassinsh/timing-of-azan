let place = [
    {
        arabicname: "دمشق",
        englishname: "	Dimashq"
    },
    {
        arabicname: "حلب",
        englishname: "	Ḩalab"
    },
    {
        arabicname: "ادلب",
        englishname: "	Idlib"
    },
    {
        arabicname: "طرطوس",
        englishname: "	Ţarţūs"
    },
    {
        arabicname: "اللاذقية",
        englishname: "	Al Lādhiqīyah"
    },
    {
        arabicname: "حمص",
        englishname: "	Ḩimş"
    },
    {
        arabicname: "حماه",
        englishname: "	Ḩamāh"
    },
    {
        arabicname: "الرقة",
        englishname: "	Ar Raqqah"
    },
    {
        arabicname: "درعا",
        englishname: "	Dar'ā"
    },
    {
        arabicname: "دير الزور",
        englishname: "	Dayr az Zawr"
    },
]
for (let city of place) {
    let content = `
    <option>${city.arabicname}</option>`
    document.querySelector(".place").innerHTML += content
}
document.querySelector(".place").addEventListener("change", function () {
    document.querySelector(".city-name").innerHTML = this.value
    let cityname = ""
    for (let city of place) {
        if (city.arabicname == this.value) {
            cityname = city.englishname
        }
    }
    getcity(cityname)
})
function getcity(cityid) {
    let params = {
        country: "SY",
        city: cityid
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {
            const timings = response.data.data.timings
            const readAble = response.data.data.date.readable
            const weekDate = response.data.data.date.hijri.weekday.ar
            document.querySelector(".fajar").innerHTML = timings.Fajr
            document.querySelector(".sunrise").innerHTML = timings.Sunrise
            document.querySelector(".dahur").innerHTML = timings.Dhuhr
            document.querySelector(".asr").innerHTML = timings.Asr
            document.querySelector(".maqrib").innerHTML = timings.Maghrib
            document.querySelector(".ashaa").innerHTML = timings.Isha
            document.querySelector(".date").innerHTML = weekDate + " " + readAble
            console.log(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getcity("	Dimashq")
