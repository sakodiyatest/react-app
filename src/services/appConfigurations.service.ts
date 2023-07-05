import { APP_CONFIGURATION_ID } from '../utils/config';
import { BASE_URL } from '../utils/constants';

const APP_CONFIGURATION_API = `configuration/${APP_CONFIGURATION_ID}/`;

export interface AppConfigurationResponse {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
}

class AppConfigurations {
  static async getAppConfigurations() {
    const response = await fetch(`${BASE_URL}/${APP_CONFIGURATION_API}`);
    if (!response.ok) {
      return Promise.reject(response);
    }
    const data = await response.json();
    return data as AppConfigurationResponse;
  }
}

export default AppConfigurations;
