export type EditProductParams = {
  productId: string;
};

export type EditProductForm = {
  name: string;
  description: string;
  video: string;
  productId?: string;
  trl: string;
  investmentEffort: string;
  categories: string;
  businessModels: string;
};
