let workCurrentTxt = document.getElementById("workCurrentTxt");
let workPreviousTxt=document.getElementById("workPreviousTxt");
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
    let p =document.createElement('p');
        filterData(activityType).then(data => {
        data.map( item=>{
  
            
            switch (item.title){
                case "Work":
                    workCurrentTxt.innerText=`${item.current} hrs`;
                    workPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                    break;
                case "Play":
                        playCurrentTxt.innerText=`${item.current} hrs`;
                        playPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
                case "Study":
                        studyCurrentTxt.innerText=`${item.current} hrs`;
                        studyPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
                case "Exercise":
                        exerciseCurrentTxt.innerText=`${item.current} hrs`;
                        exercisePreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;
            case "Social":
                        socialCurrentTxt.innerText=`${item.current} hrs`;
                        socialPreviousTxt.innerText=`Last Week - ${item.previous}hrs`;
                        break;

             case "Self Care":
                        selfcareCurrentTxt.innerText=`${item.current} hrs`;
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

//display data based on the link clicked
dailyLink.addEventListener('click',function(){
console.log("Enter daily");
    displayCards('daily');
});

weeklyLink.addEventListener('click',function(){
    console.log("Enter weekly");
        displayCards('weekly');
    });
monthlyLink.addEventListener('click',function(){
    console.log("Enter monthly");
        displayCards('monthly');
    });