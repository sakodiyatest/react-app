import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import JoditEditor from 'jodit-react';
import DOMPurify from 'isomorphic-dompurify';

import { getProductDetailFetch } from '../../redux/slices/productSlice';
import { updateProductDetail } from '../../redux/slices/editProductSlice';
import { getTrlListFetch } from '../../redux/slices/trlListSlice';

import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { ERRORS } from '../../utils/messages';

import UserProfile from '../../ui-kit/UserProfile/UserProfile';
import Loading from '../../ui-kit/Loading/Loading';
import {
  IconBriefcase,
  IconChevronRight,
  IconClock,
  IconCog,
  IconCurrencyDollar,
  IconHome,
  IconLoading,
} from '../../ui-kit/IconComponent';

import type { EditProductForm, EditProductParams } from './types';
import { useOnMount } from '../../hooks/useOnMount';
import { isValidDescriptionField } from '../../utils/helpers';

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(ERRORS.FIELD_REQUIRED),
  description: Yup.string().trim().required(ERRORS.FIELD_REQUIRED),
  video: Yup.string()
    .trim()
    .required(ERRORS.FIELD_REQUIRED)
    .url(ERRORS.INVALID_URL),
  categories: Yup.string().trim().required(ERRORS.FIELD_REQUIRED),
  businessModels: Yup.string().trim().required(ERRORS.FIELD_REQUIRED),
  investmentEffort: Yup.string().trim().required(ERRORS.FIELD_REQUIRED),
});

const EditProductDetail: React.FC = () => {
  const param = useParams<EditProductParams>();
  const editor = useRef(null);

  const productState = useAppSelector(state => state.product);
  const appConfigState = useAppSelector(state => state.appConfig);
  const trlState = useAppSelector(state => state.trlList);
  const editProductState = useAppSelector(state => state.editProduct);

  const dispatch = useAppDispatch();

  useOnMount(() => {
    if (param.productId) {
      dispatch(getProductDetailFetch(param.productId));
      dispatch(getTrlListFetch());
    }
  });

  const handleSubmit = (
    values: EditProductForm,
    helpers: FormikHelpers<EditProductForm>,
  ) => {
    if (!isValidDescriptionField(values.description)) {
      helpers.setFieldError('description', ERRORS.FIELD_REQUIRED);
      helpers.setSubmitting(false);
      return;
    }

    const formattedBusinessModel = values.businessModels
      .split(', ')
      .map(model => {
        const findModel = productState.productDetail?.businessModels.find(
          item => item.name.toLocaleLowerCase() === model.toLowerCase(),
        );
        return {
          id: findModel != null ? findModel.id : undefined,
          name: model,
        };
      });

    const formattedCategories = values.categories.split(', ').map(category => {
      const findModel = productState.productDetail?.categories.find(
        item => item.name.toLocaleLowerCase() === category.toLowerCase(),
      );

      return {
        id: findModel != null ? findModel.id : undefined,
        name: category,
      };
    });

    dispatch(
      updateProductDetail({
        ...values,
        businessModels: formattedBusinessModel,
        categories: formattedCategories,
      }),
    );
  };

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
    trl,
    investmentEffort,
    categories,
    businessModels,
  } = productState.productDetail;

  const initialValues: EditProductForm = {
    name,
    description,
    video,
    productId: param.productId,
    investmentEffort,
    categories: categories.map(item => item.name).join(', '),
    businessModels: businessModels.map(item => item.name).join(', '),
    trl: trl.name,
  };

  return (
    <>
      {/* bread crumbs */}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          submitForm,
          errors,
          touched,
        }) => (
          <form className="w-full">
            <div className="flex flex-wrap items-center justify-between mb-5">
              <div className="flex items-center font-semibold text-[#6b7280] mb-4 lg:mb-0">
                <IconHome className="w-5 h-5" strokeWidth={2} />
                <IconChevronRight className="w-4 h-4 mx-2" />

                <span>Product Edit</span>

                <IconChevronRight className="w-4 h-4 mx-2" />
                <h4 className="w-[calc(100vw-210px)] md:w-[calc(100vw-490px)] lg:w-[calc(100vw-550px)] xl:w-auto truncate">
                  {name}
                </h4>
              </div>
              <button
                onClick={submitForm}
                type="button"
                disabled={editProductState.isLoading}
                className="bg-primary-color min-h-[40px] px-4 text-white rounded-lg hover:opacity-90 text-sm flex items-center"
              >
                {editProductState.isLoading && (
                  <IconLoading
                    className='class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"'
                    strokeWidth={4}
                  />
                )}
                <span
                  className={`block ${
                    editProductState.isLoading ? 'ms-2' : ''
                  }`}
                >
                  Save
                </span>
              </button>
            </div>
            <div className="lg:flex border-2 border-[#e5e7eb] bg-white rounded-md mb-5 w-full">
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
                  <label className="block mb-2">
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      value={values.name}
                      onChange={handleChange}
                      className="mt-1 block font-semibold w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                  </label>
                  {touched.name && errors.name && (
                    <span className="mb-6 block text-red-800 text-xs">
                      {errors.name}
                    </span>
                  )}
                  <label className="block">
                    <JoditEditor
                      ref={editor}
                      value={DOMPurify.sanitize(values.description)}
                      config={{
                        readonly: false,
                      }}
                      onBlur={async value => {
                        void setFieldValue(
                          'description',
                          DOMPurify.sanitize(value),
                        );
                      }}
                    />
                  </label>
                  {touched.description && errors.description && (
                    <span className="mt-2 block text-red-800 text-xs">
                      {errors.description}
                    </span>
                  )}
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
                <h5 className="text-lg font-semibold text-default-font-color mb-3">
                  Video
                </h5>
                <label className="block">
                  <input
                    type="text"
                    placeholder="Add a youtube or video link"
                    autoComplete="off"
                    name="video"
                    value={values.video}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  />
                </label>
                {touched.video && errors.video && (
                  <span className="mt-4 block text-red-800 text-xs">
                    {errors.video}
                  </span>
                )}
              </div>
            </div>
            {/* footer section */}
            <div className="flex border-2 border-[#e5e7eb] bg-white rounded-md mb-5">
              {/* banner box */}
              <div className="flex-1 px-6 py-6">
                <h5 className="text-lg font-semibold text-default-font-color mb-3">
                  Offer details
                </h5>

                <div>
                  <div className="flex gap-2">
                    <IconCog className="w-6 h-6 text-[#7b828e]" />
                    <span className="text-[#7b828e] mb-2 block">
                      Technology
                    </span>
                  </div>
                  <label className="block">
                    <input
                      type="text"
                      placeholder="Add technology"
                      autoComplete="off"
                      name="categories"
                      value={values.categories}
                      onChange={async event =>
                        setFieldValue('categories', event.currentTarget.value)
                      }
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                  </label>
                  {touched.categories && errors.categories && (
                    <span className="mt-4 block text-red-800 text-xs">
                      {errors.categories}
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex gap-2">
                    <IconBriefcase className="w-6 h-6 text-[#7b828e]" />
                    <span className="text-[#7b828e] mb-2 block">
                      Business Models
                    </span>
                  </div>
                  <label className="block">
                    <input
                      type="text"
                      placeholder="Add business models"
                      autoComplete="off"
                      name="businessModels"
                      value={values.businessModels}
                      onChange={async event =>
                        setFieldValue(
                          'businessModels',
                          event.currentTarget.value,
                        )
                      }
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                  </label>
                  {touched.businessModels && errors.businessModels && (
                    <span className="mt-4 block text-red-800 text-xs">
                      {errors.businessModels}
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex gap-2">
                    <IconClock className="w-6 h-6 text-[#7b828e]" />

                    <span className="text-[#7b828e] mb-2 block">URL</span>
                  </div>
                  <select
                    name="trl"
                    value={values.trl}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  >
                    {trlState.trlList?.map(trl => (
                      <option value={trl.name} key={trl.id}>
                        {trl.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <div className="flex gap-2">
                    <IconCurrencyDollar className="w-6 h-6 text-[#7b828e]" />

                    <span className="text-[#7b828e] mb-2 block">Costs</span>
                  </div>
                  <label className="block">
                    <input
                      type="text"
                      placeholder="Add cost"
                      autoComplete="off"
                      name="investmentEffort"
                      value={values.investmentEffort}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                  </label>
                  {touched.investmentEffort && errors.investmentEffort && (
                    <span className="mt-4 block text-red-800 text-xs">
                      {errors.investmentEffort}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditProductDetail;
