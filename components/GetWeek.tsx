function convertUTCDateToLocalDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}

function dates(current: Date) {
  var week = new Array();

  // console.log('current', current);
  // console.log('getDay', current.getUTCDay())

  if (current.getDay() === 0) {
    current.setDate(current.getDate() - 6);
  } else {
    current.setDate(current.getDate() - current.getDay() + 1);
  }

  // console.log('current2', current);

  for (var i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return week;
}

export default function GetWeek(dateValue) {
  const date = new Date(dateValue);
  const week = dates(date);

  // console.log(week);

  // var result = [];

  // for (var i=0;i < 7; i++) {
  //   var temp = week[i].toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});

  //   result.push(temp);
  // }

  // return result;

  return week;
}
