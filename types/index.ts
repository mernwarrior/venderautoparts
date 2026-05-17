export interface Product {
  id: string;
  category: string;
  subCategory: string;
  description: string;
  title: string;
  stockId: string;
  image: {
    url: string;
    name: string;
  };
  brandTitle: string;
  urlSlug: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}