import moment from 'moment';

export const getCurrentDay = (data, title, fullData) => ({
  weekday: moment(data.applicable_date).format('dddd'),
  date: moment(data.applicable_date).format('MMMM Do'),
  location: title,
  temperature: Math.round(data.the_temp),
  weatherIcon: `https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`,
  weatherDescription: data.weather_state_name,
  currentTime: getCurrentTime(fullData.time)
});

const getWeekday = date => moment(date).format('dddd').substring(0, 3);

export const getUpcomingDays = data =>
  data.slice(1).map(day => ({
    imgUrl: day.weather_state_abbr,
    temperature: Math.round(day.max_temp),
    weekday: getWeekday(day.applicable_date),
  }));

export const getCurrentDayDetailed = data => [
  {
    name: 'max temp',
    value: Math.round(data.max_temp),
    unit: '°C',
  },
  {
    name: 'min temp',
    value: Math.round(data.min_temp),
    unit: '°C',
  },
  {
    name: 'predictability',
    value: data.predictability,
    unit: '%',
  },
  {
    name: 'humidity',
    value: data.humidity,
    unit: '%',
  },
  {
    name: 'wind',
    value: Math.round(data.wind_speed),
    unit: 'km/h',
  }
];

function getCurrentTime(time) {
  let offset = '';

  if(time.indexOf('+') !== -1) {
    offset = `+${time.split('+')[1]}`;
  } else {
    offset = `-${time.split('-')[3]}`;
  }

  return (moment(time).utc().utcOffset(offset).format("h:mm a"));
}
