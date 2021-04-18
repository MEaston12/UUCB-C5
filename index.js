//Using JQuery 3.4.1 and Luxon 1.26.0

$('#currentDay').text(`Today is ${luxon.DateTime.now().toLocaleString({
    weekday: 'long',
    month: 'long',
    day: '2-digit'
})}`);