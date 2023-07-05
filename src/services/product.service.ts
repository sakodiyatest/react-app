import { type ProductData } from '../redux/slices/editProductSlice';
import { BASE_URL } from '../utils/constants';

const PRODUCT_DETAIL_API = 'product';

interface UserDetail {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  position: string;
}

interface CompanyAddress {
  country: {
    name: string;
  };
  city: {
    name: string;
  };
  street: string;
  house: string;
  zipCode: string;
  longitude: string;
  latitude: string;
}

export interface CompanyDetails {
  name: string;
  logo: string;
  address: CompanyAddress;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  picture: string;
  user: UserDetail;
  video: string;
  company: CompanyDetails;
  businessModels: [
    {
      id: number;
      name: string;
    },
  ];
  trl: {
    name: string;
  };
  categories: [
    {
      id: number;
      name: string;
    },
  ];
  investmentEffort: string;
}

class Product {
  static async getProductDetails(productId: string) {
    const response = await fetch(
      `${BASE_URL}/${PRODUCT_DETAIL_API}/${productId}`,
    );
    if (!response.ok) {
      return Promise.reject(response);
    }
    const data = await response.json();
    return data as ProductDetailResponse;
  }

  static async updateProductDetails(productData: ProductData) {
    const { productId, ...rest } = productData;
    const response = await fetch(
      `${BASE_URL}/${PRODUCT_DETAIL_API}/${productId}`,
      {
        body: JSON.stringify(rest),
        method: 'PUT',
      },
    );

    if (!response.ok) {
      return Promise.reject(response);
    }
    const data = await response.json();
    return data as ProductDetailResponse;
  }
}

export default Product;
