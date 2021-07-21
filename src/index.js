import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import countryInfoTemplate from './templates/country-info.hbs';
import countriesListTemplate from './templates/countries-list.hbs';
import { Notify } from 'notiflix';


const refs = {
    searchEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.searchEl.addEventListener('input', debounce(() => {
        inputValue();
    }, DEBOUNCE_DELAY),
);

function inputValue() {
    if (!refs.searchEl.value){
        refs.countryInfo.innerHTML = ' ';
        refs.countryList.innerHTML = ' ';
        return;
    }
    
    fetchCountries(refs.searchEl.value)
    .then(value => {
        refs.countryInfo.innerHTML = ' ';
        refs.countryList.innerHTML = ' ';

        if (value.length === 1) {
            refs.countryInfo.innerHTML = countryInfoTemplate(value);
        }
        else if (value.length >= 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
        }
        else if (value.length > 1) {
            refs.countryList.innerHTML = countriesListTemplate(value);
        }
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'))
}

