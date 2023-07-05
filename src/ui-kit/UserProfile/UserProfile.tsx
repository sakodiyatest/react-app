import React from 'react';
import type { UserProfileProps } from './UserProfile.props';
import { IconMapPin } from '../IconComponent';

const UserProfile: React.FC<UserProfileProps> = props => {
  const {
    companyData,
    profilePicture,
    firstName,
    lastName,
    position,
    hasUserSection = false,
  } = props;
  return (
    <div className="flex-0 w-full lg:max-w-[380px] p-5 border-[#e5e7eb] lg:border-l-2">
      <div className="mb-5 text-default-font-color">Offered By</div>
      <img
        src={companyData.logo}
        alt="Logo"
        className="w-[230px] h-auto mb-4"
      />

      {hasUserSection && (
        <div className="flex items-center mb-8">
          <div className="flex-0 me-3">
            <img
              src={profilePicture}
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover object-top"
            />
          </div>
          <div className="flex-1 text-default-font-color">
            <h5 className="text-md font-semibold leading-8 text-default-font-color">
              {firstName} {lastName}
            </h5>
            <div className="text-[15px] text-[#7b828e]">{position}</div>
          </div>
        </div>
      )}
      {/* Address section */}
      <div>
        <div className="flex text-[#7b828e]">
          <IconMapPin className="w-5 h-5 me-2 mt-1" />

          <p className="text-[15px] mb-3 max-w-[250px]">
            {companyData.address.street}, {companyData.address.city.name}-
            {companyData.address.zipCode}, {companyData.address.country.name}
          </p>
        </div>
        <div className="mapouter">
          <div className="gmap_canvas">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  title="map area"
                  width="500"
                  height="380"
                  id="gmap_canvas"
                  src={`https://maps.google.com/maps?q=${companyData.address.latitude},${companyData.address.longitude}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full min-h-[200px] h-auto"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserProfile);
