import { Container, Row, Col } from 'react-bootstrap';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import './WeatherCard.css';

const imgUrlBase = 'https://www.metaweather.com/static/';

const CurrentDay = ({ weekday, date, currentTime, location, temperature, weatherIcon, weatherDescription }) => (
  <div className="d-flex">
    <div className="cardInner d-flex flex-column justify-content-between pt-3 pb-2 pl-2 ">
      <div>
          <LocationOnIcon />
          <h3 className="ml-2">{location}</h3>
          <h3 className="font-weight-bold mb-1">{weekday}</h3>
          <p className="mb-0">{date}</p>
          <p className="mb-0">{currentTime}</p>
      </div>
      <div>
          <img width="45" src={weatherIcon} alt="" />
          <h2 className="font-weight-bold mb-1">
              <span>{temperature}</span>°C
          </h2>
          <h5 className="font-weight-lighter">{weatherDescription}</h5>
      </div>
    </div>
  </div>
);

const CurrentDayDescriptionItem = ({ name, value, unit }) => (
  <div className="d-flex justify-content-between">
    <p className="mb-0 font-weight-bolder text-uppercase">{name}</p>
    <p className="mb-0">
        {value} {unit}
    </p>
  </div>
);

const CurrentDayDescription = ({ forecast }) => (
  <div className="mt-4 mt-md-2">
    <div className="d-flex flex-column mb-2">
        {forecast.map(item => (
            <CurrentDayDescriptionItem {...item} key={item.name} />
        ))}
    </div>
  </div>
);

const UpcomingDaysForecastItem = ({ weekday, temperature, imgUrl }) => (
  <li className="weekday d-flex flex-column justify-content-center align-items-center p-2">
      <img className="mb-2" width="30" src={`${imgUrlBase}img/weather/${imgUrl}.svg`} alt="" />
      <span className="mb-2">{weekday}</span>
      <span className="font-weight-bold">{temperature}&deg;</span>
  </li>
);

const UpcomingDaysForecast = ({ days }) => (
  <ul className="weekList d-flex justify-content-between p-0">
      {days.map(day => (
          <UpcomingDaysForecastItem {...day} key={day.weekday} />
      ))}
  </ul>
);

const WeatherCard = ({ forecast }) => (
  <div className='common-card wcard'>
    <Container>
      <Row>
          <Col xs={12} md={4}>
            <CurrentDay {...forecast.currentDay} />
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
            <CurrentDayDescription forecast={forecast.currentDayDetails} />
            <UpcomingDaysForecast days={forecast.upcomingDays} />
          </Col>
      </Row>
    </Container>
  </div>
);

export default WeatherCard;
