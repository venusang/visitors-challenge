import config from '../config/environment';
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  headers = { 'X-Api-Key': config.myApiKey };
  host = "https://mini-visitors-service.herokuapp.com/api/";
}

