let workCurrentTxt = document.getElementById("workCurrentTxt");
let workPreviousTxt=document.getElementById("workPreviousTxt");
let playCurrentTxt=document.getElementById("playCurrentTxt");
let playPreviousTxt=document.getElementById("playPreviousTxt");
let studyCurrentTxt =document.getElementById("studyCurrentTxt");
let studyPreviousTxt=document.getElementById("studyPreviousTxt");
let exerciseCurrentTxt=document.getElementById("exerciseCurrentTxt");
let exercisePreviousTxt =document.getElementById("exercisePreviousTxt");
let socialCurrentTxt= document.getElementById("socialCurrentTxt");
let socialPreviousTxt=document.getElementById("socialPreviousTxt");
let selfcareCurrentTxt=document.getElementById("selfcareCurrentTxt");
let selfcarePreviousTxt=document.getElementById("selfcarePreviousTxt");



let dailyLink =document.getElementById("dailyLink");
let weeklyLink= document.getElementById("weeklyLink");
let monthlyLink= document.getElementById("monthlyLink");

function getAllData() {
     return fetch("../data/data.json")
        .then(response => response.json())
        .then(data => {
            return data;

        });
}

function filterData(activityType) {

    let filteredActivityList=[];
    return getAllData().then(data => {
        //go through each item in the data and add  to another array depending on the activityType passed
        data.map(item => {
            switch (activityType) {
                case "daily":
                    filteredActivityList.push({
                        'title': item.title,
                        'current': item.timeframes.daily.current,
                        'previous': item.timeframes.daily.previous
                    });
                    break;

                case "weekly":
                    filteredActivityList.push({
                        'title': item.title,
                        'current': item.timeframes.weekly.current,
                        'previous': item.timeframes.weekly.previous
                    });
                    break;

                case "monthly":
                    filteredActivityList.push({
                        'title': item.title,
                        'current': item.timeframes.monthly.current,
                        'previous': item.timeframes.monthly.previous
                    });
                    break;

                default:
                    console.log("Invalid activity type");

            }// end of switch statment

        });   
            return (filteredActivityList);
    });

}

// displayData based on activityType
function displayCards(activityType) {
  
        filterData(activityType).then(data => {
        data.map( item=>{
  
            
            switch (item.title){
                case "Work":
                    workCurrentTxt.innerText=`${item.current}hrs`;
                    workPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                    break;
                case "Play":
                        playCurrentTxt.innerText=`${item.current}hrs`;
                        playPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
                case "Study":
                        studyCurrentTxt.innerText=`${item.current}hrs`;
                        studyPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
                case "Exercise":
                        exerciseCurrentTxt.innerText=`${item.current}hrs`;
                        exercisePreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
            case "Social":
                        socialCurrentTxt.innerText=`${item.current}hrs`;
                        socialPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;

             case "Self Care":
                        selfcareCurrentTxt.innerText=`${item.current}hrs`;
                        selfcarePreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
                default: console.log("Invalid item title");

            }
        }

        )
    });

   
}

//display daily as default
displayCards('daily'); 

function removeActiveClass(){
    dailyLink.classList.remove("active");
    weeklyLink.classList.remove("active");
    monthlyLink.classList.remove("active");

}

//display data based on the link clicked and update active link display
dailyLink.addEventListener('click',function(){
    displayCards('daily');
    removeActiveClass();
    dailyLink.classList.add("active");
});

weeklyLink.addEventListener('click',function(){
        displayCards('weekly');
        removeActiveClass();
        weeklyLink.classList.add("active");
    });
monthlyLink.addEventListener('click',function(){
        displayCards('monthly');
        removeActiveClass();
        monthlyLink.classList.add("active");
    });