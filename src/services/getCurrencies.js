const BASE_URL = "https://api.nbp.pl/api/exchangerates/rates/a/";

export const getCurrencies = async (currency) => {
  const url = `${BASE_URL}${currency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ERROR! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
