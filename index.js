//Using JQuery 3.4.1 and Luxon 1.26.0

const now = luxon.DateTime.now();

$('#currentDay').text(`Today is ${now.toLocaleString({
    weekday: 'long',
    month: 'long',
    day: '2-digit'
})}`);

const timeBlocks = [];
for(let i = 6; i < 20; i++){ //Begin/end of range set here
    timeBlocks.push({
        lux: now.set({hour: i, minute:0, second:0})
    });
}

function renderTimeBlocks(){
    const runTime = luxon.DateTime.now();
    $('#time-blocks').empty();
    for(let timeBlock of timeBlocks){
        $('#time-blocks').append(`
<div class="input-group time-block" id='${timeBlock.lux.hour}-time-block'>
    <div class="input-group-prepend">
        <span class="input-group-text">${timeBlock.lux.toLocaleString(luxon.DateTime.TIME_SIMPLE)}</span>
    </div>
    <input type="text" class="form-control ${timeBlock.lux > runTime ? 'future' : timeBlock.lux.plus({hours:1}) > runTime ? 'present' : 'past'}" placeholder="No event this hour, click to add event.">
    <div class="input-group-append">
    <button class="btn btn-primary" type="button">SAVE</button>
    </div>
</div>`)
    }
}

renderTimeBlocks();