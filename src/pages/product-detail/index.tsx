import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import DOMPurify from 'isomorphic-dompurify';

import type { ProductParams } from './types';
import { getProductDetailFetch } from '../../redux/slices/productSlice';
import { EDIT_PRODUCT_PATH } from '../../routes/routesPath';

import { getModifiedVideoUrl } from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../utils/redux';

import {
  IconBriefcase,
  IconChevronRight,
  IconClock,
  IconCog,
  IconCurrencyDollar,
  IconHome,
} from '../../ui-kit/IconComponent';
import Loading from '../../ui-kit/Loading/Loading';
import UserProfile from '../../ui-kit/UserProfile/UserProfile';

import { useOnMount } from '../../hooks/useOnMount';

const ProductDetail: React.FC = () => {
  const param = useParams<ProductParams>();
  const productState = useAppSelector(state => state.product);
  const appConfigState = useAppSelector(state => state.appConfig);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useOnMount(() => {
    if (param.productId) {
      dispatch(getProductDetailFetch(param.productId));
    }
  });

  if (productState.isLoading) {
    return <Loading />;
  }

  if (productState.error) {
    return <h2>{productState.error}</h2>;
  }

  if (!productState.productDetail) {
    return <h2>No such product is found</h2>;
  }

  const {
    name,
    description,
    video,
    company,
    picture,
    user,
    businessModels,
    trl,
    categories,
    investmentEffort,
  } = productState.productDetail;

  return (
    <div>
      {/* bread crumbs */}
      <div className="flex flex-wrap items-center justify-between mb-5 text-primary-color">
        <div className="flex items-center font-semibold text-[#6b7280] mb-4 lg:mb-0">
          <IconHome className="w-5 h-5" strokeWidth={2} />
          <IconChevronRight className="w-4 h-4 mx-2" />

          <span>Product</span>

          <IconChevronRight className="w-4 h-4 mx-2" />
          <h4 className="w-[calc(100vw-210px)] md:w-[calc(100vw-490px)] lg:w-[calc(100vw-550px)] xl:w-auto truncate">
            {name}
          </h4>
        </div>
        <button
          type="button"
          onClick={() =>
            navigate(
              generatePath(EDIT_PRODUCT_PATH, {
                productId: param.productId ?? null,
              }),
            )
          }
          className="bg-primary-color py-2 px-4 text-white rounded-lg hover:bg-primary-color/[0.9] text-sm"
        >
          Edit
        </button>
      </div>
      <div className="lg:flex border-2 border-[#e5e7eb] bg-white rounded-md mb-5">
        {/* banner box */}
        <div className="flex-1">
          <div className="relative">
            <img
              src={picture}
              alt="banner"
              className="w-full h-auto rounded-md rounded-bl-none lg:rounded-tr-none rounded-br-none"
            />
          </div>
          <div className="p-6">
            <h5 className="text-lg font-semibold text-[#374151] mb-3">
              {name}
            </h5>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            />
          </div>
        </div>
        {/* right sidebar */}
        <UserProfile
          companyData={company}
          firstName={user.firstName}
          lastName={user.lastName}
          position={user.position}
          profilePicture={user.profilePicture}
          hasUserSection={appConfigState.appConfig?.hasUserSection}
        />
      </div>
      {/* video section */}
      <div className="flex border-2 border-[#e5e7eb] bg-white rounded-md mb-5">
        {/* banner box */}
        <div className="flex-1 p-6">
          <h5 className="text-lg font-semibold text-[#374151] mb-6">Video</h5>
          <iframe
            title="Video"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            width="800"
            height="380"
            className="max-w-2xl w-full mx-auto"
            src={getModifiedVideoUrl(video)}
          ></iframe>
        </div>
      </div>
      {/* footer section */}
      <div className="flex border-2 border-[#e5e7eb] bg-white rounded-md mb-5">
        {/* banner box */}
        <div className="flex-1 px-6 pt-6">
          <h5 className="text-lg font-semibold text-[#374151] mb-6">
            Offer details
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 flex-wrap">
            {/* footer label part 1 */}
            <div className="flex gap-2 sm:mb-3 md:mb-0 lg:mb-3">
              <div className="flex-0">
                <IconCog className="w-6 h-6 text-[#7b828e]" />
              </div>
              <div className="flex-1">
                <span className="text-[#7b828e] mb-2 block">Technology</span>
                <ul className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <li className="mb-3" key={category.id}>
                      <span className="bg-[#e5e7eb] text-[#6b7280] block text-sm pb-1 px-4 rounded-full">
                        {category.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* footer label part 2 */}
            <div className="flex gap-2 sm:mb-3 md:mb-0 lg:mb-3">
              <div className="flex-0">
                <IconBriefcase className="w-6 h-6 text-[#7b828e]" />
              </div>
              <div className="flex-1">
                <span className="text-[#7b828e] mb-2 block">
                  Business Model
                </span>
                <ul className="flex flex-wrap gap-2">
                  {businessModels.map(model => (
                    <li className="mb-3" key={model.id}>
                      <span className="bg-[#e5e7eb] text-[#6b7280] block text-sm pb-1 px-4 rounded-full">
                        {model.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* footer label part 3 */}
            <div className="flex gap-2">
              <div className="flex-0">
                <IconClock className="w-6 h-6 text-[#7b828e]" />
              </div>
              <div className="flex-1">
                <span className="text-[#7b828e] mb-2 block">URL</span>
                <ul className="flex flex-wrap gap-2">
                  <li className="mb-3">
                    <span className="bg-[#e5e7eb] text-[#6b7280] block text-sm pb-1 px-4 rounded-full">
                      {trl.name}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* footer label part 4 */}
            <div className="flex gap-2">
              <div className="flex-0">
                <IconCurrencyDollar className="w-6 h-6 text-[#7b828e]" />
              </div>
              <div className="flex-1">
                <span className="text-[#7b828e] mb-2 block">Costs</span>
                <ul className="flex flex-wrap gap-2">
                  <li className="mb-3">
                    <span className="bg-[#e5e7eb] text-[#6b7280] block text-sm pb-1 px-4 rounded-full">
                      {investmentEffort}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
