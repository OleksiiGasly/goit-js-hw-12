const fetchCountries = searchQuery => {

    return fetch (`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });        
};

export default fetchCountries;