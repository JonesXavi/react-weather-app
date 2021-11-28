import { useState } from 'react';
import axios from 'axios';

import { getCurrentDay, getUpcomingDays, getCurrentDayDetailed} from '../Helper';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://jbx-cors-anywhere.herokuapp.com/';
const REQUEST_URL = `${CROSS_DOMAIN}${BASE_URL}`;

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const header = {
        "Access-Control-Allow-Origin": "*"
    };

    const getWoeid = async location => {
        let queryObject = { query: location };

        if(location.lat && location.long) {
            queryObject = { lattlong: `${location.lat},${location.long}` };
        }

        const { data } = await axios(`${REQUEST_URL}/search`, { params: queryObject }, {headers: header});

        if (!data || data.length === 0) {
            setError('There is no such location');
            setLoading(false);
            return;
        }

        return data[0];
    };

    const getForecastData = async woeid => {
        const { data } = await axios(`${REQUEST_URL}/${woeid}`, {headers: header});

        if (!data || data.length === 0) {
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        return data;
    };

    const gatherForecastData = data => {
        const currentDay = getCurrentDay(data.consolidated_weather[0], data.title, data);
        const currentDayDetails = getCurrentDayDetailed(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDays(data.consolidated_weather);

        setForecast({ currentDay, currentDayDetails, upcomingDays });
        setLoading(false);
    };

    const loadLocation = async location => {
        setLoading(true);
        setError(false);

        const response = await getWoeid(location);
        if (!response?.woeid) return;

        const data = await getForecastData(response.woeid);
        if (!data) return;
        console.log(data);
        gatherForecastData(data);
    };

    return {
        isError,
        isLoading,
        forecast,
        loadLocation
    };
};

export default useForecast;
