import { Key } from "react";
import React from 'react'

export declare interface AppProps {
  children?: React.ReactNode | JSX.Element | JSX.Element[];
  childrenElement?: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

export type obejctToExport = {
  'Название': string,
  'Артикул': string,
  'Количество в CRM': number | null
}[]

export type localProduct = {
  productId: number,
  variations: { variationId: number, sku: string | null, price: string }[]
}
export type localVariation = { id: number, sku: string, price: string }

export type row = [
  string, string, string, string?
]
export type rows = row[]
export type customerToCombine = { resultCustomer: { id: number }, customers: { id: number }[] }
export interface Variation {
  id: Key;
  name: string;
  stockQuantity: number | null;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | never;
  price: string;
  sku: string;
  manageStock: string | never;
  databaseId: string;
  metaData: wooMeta[]
  defectQuantity?: number
  retailQuantity?: number
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }

}

export interface retailProduct {
  active: boolean,
  article: string,
  description: string,
  externalId: string,
  groups: {
    id: number,
    externalId: string
  }[],
  id: number,
  manufactorer: string,
  markable: boolean,
  maxPrice: number,
  minPrice: number,
  name: number,
  unit: {
    code: 'pc',
    name: string,
    sym: string,
    vatRate: string
  },
  quantity: number,
  updatedAt: Date,
  url: string,
  offers: {
    active: boolean,
    externalId: string,
    xmlId: string,
    id: number,
    images: string[],
    name: string,
    price: number,
    prices: {
      priceType: string,
      price: number,
      ordering: number,
      currency: 'RUB'
    }[],
    quantity: number

  }[]

}

export type pageInfo = {
  endCursor: string,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string
}

export type queryVars = {
  variables: {
    first: number | null,
    after: string | null,
    last: number | null,
    before: string | null
  }

}

export interface products {
  products?: {
    edges: {
      node: productWithVariation,
      cursor: string
    }[] | [],
    pageInfo: pageInfo
  }
}
export interface productWithVariation {
  id: Key;
  name: string;
  productId: string;
  link: string
  variations: {
    nodes: Variation[]
  }
}
export interface ReatailOffers {
  success: boolean,
  pagination: {
    limit: '50' | '100' | '150' | '200' | '250'
    totalCount: number
    currentPage: number
    totalPageCount: number
  }
  offers: Offer[]
}
type Offer = {
  id: number
  xmlId: string
  externalId: string
  quantity: number
}

export type OfferToUpdate = {
  productId?: Key,
  variationId?: string,
  retailId?: number,
  count: number | null
}

export type DefData = {
  databaseId: Key
  fullQuantity: number
  defectQuantity: number
}
export interface WooProductVariation {
  regular_price: string;
  id: Key;
  parent_id?: number;
  stock_quantity: number | null;
  manage_stock: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder' | 'pending' | 'draft'
  attributes: wooAttribute[]
  image: wooImage
  weight: string
  dimensions: {
    length: string,
    width: string,
    height: string
  };
  sku: string;

}
export type mediaItems = {
  mediaItems: {
    nodes: mediaItem[]
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string,
      startCursor: string,
      hasPreviousPage: boolean
    }
  }
}
export type mediaItem = {
  id: Key,
  databaseId: number,
  mediaItemUrl: string,
  sourceUrl: string,
}
export type wooImage = {
  id?: number,
  src: string,
  alt_text: string,
  description?: string,
}
type wooCategory = {
  id: number
}
type wooAttribute = {
  id: 7 | 6,
  name?: string,
  slug?: string,
  visible?: boolean,
  variation?: boolean,
  option?: string
}
type wooProductAttribute = {
  id: 7 | 6,
  name?: string,
  slug?: string,
  visible?: boolean,
  position?: number,
  variation?: boolean,
  options: string[]
}
type wooMeta = {
  key?: 'product_description' | 'product_care' | 'product_measurements' | 'model_measurements' | 'shipping' | 'defect_quantity'
  value: string,
}

export type FileImg = {
  objectURL?: string,
  lastModified?: number,
  lastModifiedDate?: Date,
  name?: string,
  size?: number,
  type?: string,
  webkitRelativePath?: string,
}

export interface WooProduct {
  id?: Key;
  name: string;
  variations: WooProductVariation[] | [];
  description?: string;
  short_description?: string;
  images: wooImage[];
  status?: 'draft' | 'publish' | 'pending' | 'private' | 'trash ';
  categories: wooCategory[];
  type: 'variable' | 'simple';
  manage_stock: boolean;
  stock_quantity: number | null;
  on_sale?: boolean;
  sku: string;
  sale_price?: number;
  price?: number;
  regular_price?: number;
  stock_status: 'instock' | 'outofstock' | 'onbackorder' | 'pending' | 'draft'
  backorders: 'no' | 'notify' | 'yes',
  backorders_allowed: boolean,
  weight: string,
  date_on_sale_from?: string | null,
  date_on_sale_to?: string | null,
  meta_data: wooMeta[]
  attributes: wooProductAttribute[] | []
  default_attributes: wooAttribute[] | []
  lang: 'ru'
  dimensions: {
    length: string,
    width: string,
    height: string,
  },

}
export type UploadData = {
  id: number,
  src: string,
  alt_text: string,
}

export type WooProductCategory = WooProductAttribute[]

export type WooProductAttributes = {
  pa_cvet: WooProductAttribute[],
  pa_size: WooProductAttribute[],
}

export type WooProductAttribute = {
  databaseId: number,
  name: string,
  id: Key
}


export type Sertificate = {
  amount?: number
  code?: string
  date?: string
  giver?: string
  reciever?: string
  manager?: string
  status?: 'used' | 'active' | ''
}