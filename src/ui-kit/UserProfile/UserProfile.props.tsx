import type { CompanyDetails } from '../../services/product.service';

export interface UserProfileProps {
  companyData: CompanyDetails;
  profilePicture: string;
  firstName: string;
  lastName: string;
  position: string;
  hasUserSection?: boolean;
}
