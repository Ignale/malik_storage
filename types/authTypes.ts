
export type actObj = {
  objName: string,
    prevValuse?: string | number,
    newValue?: string | number,
}
export type actHistory = {
  actionDate: string,
  actionType: string, //change, delete
  sku: string, // item's SKU
  actionArr: actObj[], // price, quantity, defectQuantity
  changeMaker: {
      role: string 
      uid: string,
      email: string,
      name: string,
      sirname: string,
  }
}

export interface authTypes {
  credentials: {
    email: string,
    password: string
  }
  values: {
    email: string, 
    password: string,
    firstName?: string,
    secondName?: string;
  }
  signUpCredentials: { 
    email: string, 
    password: string,
    firstName?: string,
    secondName?: string;
  }
  adress: {
    shortName: string,
    country: string,
    city: string, 
    state: string,
    index: number, 
    street: string,
    house: string,
    flat: string
  }
  user: {
    role: string 
    uid: string,
    email: string,
    name: string,
    sirname: string,
    history?: actHistory[],
  }
}
export  interface user {
    role: string 
    uid: string,
    email: string,
    name: string,
    sirname: string,
    notifications: {
    type: ''|'error'|'success'|'info',
    status: string, 
    message: string,
  },
    adress?: authTypes['adress'] | authTypes['adress'][]
  }
