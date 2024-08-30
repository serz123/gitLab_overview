/**
 * Fetches data from the specified URL using the fetch API.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<object[]>} - A promise that resolves to the fetched data as an array of objects.
 * @throws {Error} - If an HTTP error occurs during the fetch request.
 */
export async function fetchData (url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error, status = ${response.status}`)
  }

  return response.json()
}
