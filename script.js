async function getDashboardData(query) {
  //Chiamata Destinazione API
  const response = await fetch(
    `http://localhost:3333/destinations?search=${query}`,
  );

  //Array
  const destinationData = await response.json();

  //Nome Città
  const nameOfDestination = destinationData[0].name;

  //Country
  const countryOfDestination = destinationData[0].country;

  //Chiamata Meteo API
  const responseMeteo = await fetch(
    `http://localhost:3333/weathers?search=${query}`,
  );

  //Array
  const dataMeteo = await responseMeteo.json();

  //Temperatura
  const temperatureOfCity = dataMeteo[0].temperature;

  //Descrizione Tempo
  const weatherDescription = dataMeteo[0].weather_description;

  //Chiamata Aereoporto API
  const responseAirports = await fetch(
    `http://localhost:3333/airports?search=${query}`,
  );

  //Array
  const dataAirports = await responseAirports.json();

  //Aereoporto principale
  const principalAirport = dataAirports[0].name;

  return {
    cityName: nameOfDestination,
    cityCountry: countryOfDestination,
    cityTemperature: temperatureOfCity,
    cityWeather: weatherDescription,
    cityAirport: principalAirport,
  };
}

getDashboardData('london')
  .then((data) => {
    console.log('Dashboard Data', data);
    console.log(`${data.cityName}`);
  })
  .catch((error) => console.error(error));
