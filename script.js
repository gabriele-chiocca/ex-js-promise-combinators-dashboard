async function getDashboardData(query) {
  const response = await fetch(
    `http://localhost:3333/destinations?search=${query}`,
  );

  //Array
  const destinationData = await response.json();

  //Nome Città
  const nameOfDestination = destinationData[0].name;

  //Country
  const countryOfDestination = destinationData[0].country;

  //Meteo
  const responseMeteo = await fetch(
    `http://localhost:3333/weathers?search=${query}`,
  );

  //Array
  const dataMeteo = await responseMeteo.json();

  //Temperatura
  const temperatureOfCity = dataMeteo[0].temperature;

  //Descrizione Tempo
  const weatherDescription = dataMeteo[0].weather_description;
}

getDashboardData('london');
