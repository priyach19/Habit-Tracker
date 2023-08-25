

let weeksContainer = document.querySelectorAll(".weekly__container");

function weeklyData() {
    for( let singleClass of weeksContainer){
        singleClass.style.display = "flex";
    }
}

function dailyData() {
    for (let singleClass of weeksContainer) {
        singleClass.style.display = "none";
    }
}


