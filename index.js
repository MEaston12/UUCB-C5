//Using JQuery 3.4.1 and Luxon 1.26.0

let now = luxon.DateTime.now();
let timeBlocks = [];

$('#currentDay').text(`Today is ${now.toLocaleString({
    weekday: 'long',
    month: 'long',
    day: '2-digit'
})}`);

function renderTimeBlocks(){
    now = luxon.DateTime.now();
    $('#time-blocks').empty();
    for(let timeBlock of timeBlocks){
        $('#time-blocks').append(`
<div class="input-group time-block" data-hr="${timeBlock.lux.hour}">
    <div class="input-group-prepend">
        <span class="input-group-text">${timeBlock.lux.toLocaleString(luxon.DateTime.TIME_SIMPLE)}</span>
    </div>
    <input type="text" class="form-control ${timeBlock.lux > now ? 'future' : timeBlock.lux.plus({hours:1}) > now ? 'present' : 'past'}" placeholder="No event this hour, click to add event.">
    <div class="input-group-append">
        <button class="btn btn-primary saveBtn" type="button">
            <i class="fas fa-save"></i>
        </button>
    </div>
</div>`)
    }
    $('input').each((_index, element) =>{
        const timeBlockEle = $(element).closest('.time-block');
        const targetHr = timeBlockEle.data('hr');
        const timeBlock = timeBlocks.find(ele => ele.lux.hour === targetHr);
        timeBlockEle.find('input').val(timeBlock.eventStr);
    });
    $('.saveBtn').click((e) => {
        const timeBlockEle = $(e.target).closest('.time-block')
        const targetHr = timeBlockEle.data('hr');
        const timeBlock = timeBlocks.find(ele => ele.lux.hour === targetHr);
        timeBlock.eventStr = timeBlockEle.find('input').val();
        saveToStorage();
    });
}

function initializeTimeBlocksArr(){
    for(let i = 6; i < 20; i++){ //Begin/end of range set here
        timeBlocks.push({
            lux: now.set({hour: i, minute:0, second:0}),
            eventStr: ''
        });
    }
    saveToStorage();
}

function pullFromStorage(){
    timeBlocks = JSON.parse(localStorage.getItem('timeBlocks'));
    timeBlocks.forEach((e) => {
            e.lux = luxon.DateTime.fromISO(e.lux);
        });
}

function saveToStorage(){
    localStorage.setItem('timeBlocks',JSON.stringify(timeBlocks));
}

if(localStorage.getItem('timeBlocks')){
    pullFromStorage();
} else {
    initializeTimeBlocksArr();
}
renderTimeBlocks();