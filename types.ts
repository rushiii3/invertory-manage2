export type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
  date: Date;
};

export type Register = {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmpassword: string;
};

export type Login = {
  email: string;
  password: string;
};
export type UserHistory = {
  email: string;
  status: boolean;
  message: string;
  date: Date;
};

export type UserStore = {
  users: User[];
  currentUser: User | null;
  userHistory: UserHistory[];
  initializeHistory: () => void;
  initializeUsers: () => void;
  addUser: (data: Register) => Promise<boolean>;
  loginUser: (data: Login) => Promise<boolean | undefined>;
  logoutUser: () => void;
  getCurrentUser: () => void;
  addHistory: (
    email: string,
    status: boolean,
    type: string,
    title: string,
    method: string
  ) => void;
};

export type Product = {
  primary_image: string;
  title: string;
  description: string;
  quantity: string;
  weight: string;
  dimensions: string;
  list_images: string[] | undefined;
  email: string | undefined;
  category: string | null;
  id: string | null;
};

export type ProductStore = {
  Products: Product[] | [];
  userProducts: Product[] | [];
  initializeProducts: () => void;
  getUserProducts: (user: string) => void;
  addProduct: (data: Omit<Product, "date">) => Promise<boolean>;
  deleteProduct: (id: string, email: string) => Promise<boolean>;
  getSingleProduct: (id: string) => Promise<Product | undefined>;
  updateProduct: (data: Omit<Product, "date">) => Promise<boolean>;
};

export type Category = {
  // date: Date ;
  description: string;
  id: string | null;
  image: string;
  title: string;
};
export type CategoryStore = {
  category: Category[] | [];
  initializeCategory: () => void;
  addCategory: (data: Omit<Category,"date">) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  getSingleCategory: (id: string) => Promise<Category | undefined>;
  updateCategory: (data: Omit<Category,"date">) => Promise<boolean>;
};

export type UpdateData = {
    data: Product | Category | undefined;
    loading: boolean;
  };
  
