import { Key } from "react";
import React from 'react'

export declare interface AppProps {
  children?: React.ReactNode | JSX.Element | JSX.Element[] ;
  childrenElement?: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>;
}
export interface Variation {
  id: Key;
  name: string;
  stockQuantity: number | null;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | never;
  price: string;
  manageStock: string | never;
  databaseId: string;
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }

}
export interface products {
  products?: {
    nodes: productWithVariation[]
  } 
}
export interface productWithVariation {
  id: Key;
  name: string;
  productId: string;
  variations:{
    nodes:Variation[]
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
type Offer ={
  id: number
  externalId: string
  quantity: number
}

export type OfferToUpdate = {
  productId?: Key,
  variationId?: string,
  retailId?: number, 
  count : number | null
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
      }}
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
  key?: 'product_description' | 'product_care' | 'product_measurements' | 'model_measurements' | 'shipping',
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

export type WooProductAttributes= {
  pa_cvet: WooProductAttribute[],
  pa_size: WooProductAttribute[],
}

export type WooProductAttribute= {
  databaseId: number,
  name: string,
  id: Key
}
