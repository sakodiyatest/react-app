import { BASE_URL } from '../utils/constants';

const TRL_LIST_API = 'trl';

export interface TrlListResponse {
  id: string;
  name: string;
}

class TrlList {
  static async getTrlList() {
    const response = await fetch(`${BASE_URL}/${TRL_LIST_API}`);
    if (!response.ok) {
      return Promise.reject(response);
    }
    const data = await response.json();
    return data as TrlListResponse[];
  }
}

export default TrlList;
