let activitiesList = document.getElementById("activitiesList");
let current = document.getElementById("current");
function getAllData() {
     return fetch("../data/data.json")
        .then(response => response.json())
        .then(data => {

            console.log("FULL JSON DATA");
            console.log(data);
            return data;

        })
}

function filterData(activityType) {

    let filteredActivityList=[];
    return getAllData().then(data => {
        //go through each item in the data
        data.map(item => {

            switch (activityType) {
                case "daily":
                    // console.log("entered daily");
                    filteredActivityList.push({
                        'title': item.title,
                        'current': item.timeframes.daily.current,
                        'previous': item.timeframes.daily.previous
                    });
                    

                    break;

                case "weekly":
                    filteredActivityList.push({
                        title: item.title,
                        weekly: item.timeframes.weekly
                    });
                    break;

                case "monthly":
                    filteredActivityList.push({
                        title: item.title,
                        monthly: item.timeframes.monthly
                    });
                    break;

                default:
                    console.log("Invalid activity type");

            }// end of switch statment

        });

        
            return (filteredActivityList);

    });

}


function displayCards() {
    let activityList = filterData('daily');
    // console.log('FILTERED DATA');
    // console.log(`LENGTH : ${activityList.length}`);
    // console.log(`activityList type:  ${typeof activityList}`);
    // console.log(activityList);

    // activityList.map(item =>{

        
    //         console.log("ENTER ACTIVITYLIST");
    //         console.log(item.timeframes);
    //         // console.log(`DAILY  CURRENT: ${activityList[i].timeframes.daily.current}`);
    // })
    let p =document.createElement('p');
    
    filterData('daily').then(data => {
        console.log("FILTERED");
        console.log(data);
        data.map( item=>{
            let h1 =document.createElement('h1');
            h1.innerText=item.title;
            activitiesList.appendChild(h1)

            let p =document.createElement('p');
            p.innerText=item.current;
            current.appendChild(p);

            console.log(`CURRENT ${item.current}`);
            console.log(`TIME: ${item.title}`);
        }

        )
    });

   
}

displayCards();