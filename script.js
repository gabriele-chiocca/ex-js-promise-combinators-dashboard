async function getDashboardData(query) {
  const response = await fetch(
    `http://localhost:3333/destinations?search=${query}`,
  );

  const destinationData = response.json();

  console.log(destinationData);
}

getDashboardData('london');
