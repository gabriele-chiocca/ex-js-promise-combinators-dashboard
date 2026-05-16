async function getDashboardData(query) {
  //Chiamata Destinazione API

  //Promise
  const [responseDestination, responseMeteo, responseAirports] =
    await Promise.all([
      fetch(`http://localhost:3333/destinations?search=${query}`),
      fetch(`http://localhost:3333/weathers?search=${query}`),
      fetch(`http://localhost:3333/airports?search=${query}`),
    ]);

  //Risposte Array
  const [destinationData, dataMeteo, dataAirports] = await Promise.all([
    responseDestination.json(),
    responseMeteo.json(),
    responseAirports.json(),
  ]);

  return {
    cityName: destinationData[0].name,
    cityCountry: destinationData[0].country,
    cityTemperature: dataMeteo[0].temperature,
    cityWeather: dataMeteo[0].weather_description,
    cityAirport: dataAirports[0].name,
  };
}

getDashboardData('london')
  .then((data) => {
    console.log('Dashboard Data', data);
    console.log(`${data.cityName}`);
  })
  .catch((error) => console.error(error));
