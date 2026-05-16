async function getDashboardData(query) {
  //Chiamata Destinazione API

  let object;

  //Promise

  const [responseDestination, responseMeteo, responseAirports] =
    await Promise.all([
      fetch(`http://localhost:3333/destinations?search=${query}`),
      fetch(`http://localhost:3333/weathers?search=${query}`),
      fetch(`http://localhost:3333/airports?search=${query}`),
    ]);

  //Risposte Array

  try {
    const [destinationData, dataMeteo, dataAirports] = await Promise.all([
      responseDestination.json(),
      responseMeteo.json(),
      responseAirports.json(),
    ]);

    object = {
      cityName: destinationData[0] ? destinationData[0].name : null,
      cityCountry: destinationData[0] ? destinationData[0].country : null,
      cityTemperature: dataMeteo[0] ? dataMeteo[0].temperature : null,
      cityWeather: dataMeteo[0] ? dataMeteo[0].weather_description : null,
      cityAirport: dataAirports[0] ? dataAirports[0].name : null,
    };
  } catch (error) {
    console.log(object);
    console.error(error);
  }

  //   const [destinationData, dataMeteo, dataAirports] = await Promise.all([
  //     responseDestination.json(),
  //     responseMeteo.json(),
  //     responseAirports.json(),
  //   ]);

  return {
    object,
  };
}

getDashboardData('vienna')
  .then((data) => {
    console.log('Dashboard Data', data);

    if (data.object.cityTemperature === null) {
      console.log(
        `La città che hai cercato è ${data.object.cityName}, si trova in ${data.object.cityCountry}.\n` +
          `L'aereoporto principale è ${data.object.cityAirport}`,
      );
    } else {
      console.log(
        `La città che hai cercato è ${data.object.cityName}, si trova in ${data.object.cityCountry}.\n` +
          `Oggi la temperatura è di ${data.object.cityTemperature} gradi, ed il tempo è ${data.object.cityWeather}.\n` +
          `L'aereoporto principale è ${data.object.cityAirport}`,
      );
    }
  })
  .catch((error) => console.error(error));
