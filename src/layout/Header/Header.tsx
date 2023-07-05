import React, { useState } from 'react';
import { Link, Outlet, generatePath } from 'react-router-dom';

import { useAppSelector } from '../../utils/redux';
import { PRODUCT_ID } from '../../utils/constants';

import { HOME_PATH, PRODUCT_PATH } from '../../routes/routesPath';
import {
  IconHamburger,
  IconHome,
  IconOrganisation,
} from '../../ui-kit/IconComponent';

const Header: React.FC = () => {
  const appConfigState = useAppSelector(state => state.appConfig);
  const [showMobilePopOver, setShowMobilePopOver] = useState<boolean>(false);

  const popOverClass = showMobilePopOver ? '' : 'hidden';

  const closePopOver = () => {
    setShowMobilePopOver(false);
  };

  return (
    <div className={showMobilePopOver ? 'h-screen overflow-hidden' : ''}>
      <header className={`min-h-[60px] flex items-center bg-primary-color`}>
        <div className="container mx-auto max-w-[1440px] px-3 md:px-5 flex justify-between">
          <img
            src={appConfigState.appConfig?.logo}
            alt="Logo"
            className="max-w-[150px] w-full fit-contain max-h-[50px] filter brightness-0 invert"
          />
          <button
            className="md:hidden"
            onClick={() => setShowMobilePopOver(prevState => !prevState)}
          >
            <IconHamburger width={24} height={24} color="white" />
          </button>
        </div>
      </header>

      <div className="wrapper">
        <div className="container mx-auto max-w-[1440px] px-3 md:px-5">
          <div className="flex">
            {/* left sidebar */}
            <div
              className={`bg-[#f9fafb] flex-0 w-full max-w-[310px] px-3 py-7 fixed right-0 top-16 bottom-0 shadow-xl md:shadow-none z-20 ${popOverClass} md:block md:static`}
            >
              <div className="flex items-center mb-4">
                <div className="flex-0 me-3">
                  <img
                    src="/assets/profile-pic.jpg"
                    alt="Logo"
                    className="w-16 h-16 rounded-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 text-default-font-color">
                  <h5 className="text-lg font-semibold leading-5">
                    Seven Pietsch
                  </h5>
                  <div className="text-[15px]">Innoloft GmbH</div>
                </div>
              </div>
              <ul className="[&>*:not(:last-child)]:mb-2">
                <li>
                  <Link
                    to={HOME_PATH}
                    onClick={closePopOver}
                    className="
                      p-2 text-default-font-color focus-visible:outline-none flex items-center rounded [&.active]:bg-slate-200 hover:bg-slate-200"
                  >
                    <IconHome className="w-5 h-5 me-3" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={generatePath(PRODUCT_PATH, { productId: PRODUCT_ID })}
                    onClick={closePopOver}
                    className="p-2 text-default-font-color focus-visible:outline-none flex items-center rounded [&.active]:bg-slate-200 hover:bg-slate-200"
                  >
                    <IconOrganisation className="w-5 h-5 me-3" />
                    Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Middle container */}
            <main className="flex-1 md:px-3 pt-7 w-full">
              <Outlet />
            </main>
            {/* middle content end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
