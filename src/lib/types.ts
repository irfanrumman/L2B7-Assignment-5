export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED" | "INACTIVE";
export type RentalRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";

export interface Property {
  id: string;
  landlordId: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string | null;
  featured: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRef {
  id: string;
  name: string;
  description: string;
}

export interface LandlordRef {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "LANDLORD";
}


export interface PropertyListItem extends Property {
  category: CategoryRef;
  landlord: LandlordRef;
}

export interface LandlordPropertyItem extends Property {
  category: CategoryRef;
  landlord: LandlordRef;
  reviews: Review[];
}

export interface LandlordPropertiesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: PaginationMeta;
    data: LandlordPropertyItem[];
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// GET /api/properties এর pura response shape (double-nested data)
export interface PropertiesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: PaginationMeta;
    data: PropertyListItem[];
  };
}

export interface RentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  status: RentalRequestStatus;
  moveInDate: string;
  moveOutDate: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  tenantId: string;
  propertyId: string;
  rentalRequestId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TenantUser extends BaseUser {
  role: "TENANT";
  rentalRequests: RentalRequest[];
  reviews: Review[];
}

export interface LandlordUser extends BaseUser {
  role: "LANDLORD";
  properties: Property[];
}

export interface AdminUser extends BaseUser {
  role: "ADMIN";
}

export type User = TenantUser | LandlordUser | AdminUser;

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface MeResponseData {
  user: User;
}

export type MeApiResponse = ApiResponse<MeResponseData>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Extract<UserRole, "TENANT" | "LANDLORD">;
}


export interface CreatePropertyPayload {
  title: string;
  description: string;
  location: string;
  price: number;
  categoryId: string;
  image: string;
}

export interface CreatePropertyActionState {
  success: boolean;
  message: string;
}


export interface TenantRef {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface PropertyRef {
  id: string;
  title: string;
  location: string;
}

export interface RentalRequestListItem {
  id: string;
  tenantId: string;
  propertyId: string;
  status: RentalRequestStatus;
  moveInDate: string;
  moveOutDate: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  tenant: TenantRef;
  property: PropertyRef;
}

export interface RentalRequestsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: RentalRequestListItem[];
    meta: PaginationMeta;
  };
}


export interface LandlordRentalRef {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface PropertyRentalRef {
  id: string;
  title: string;
  location: string;
  price: number;
  isAvailable: boolean;
  landlord: LandlordRentalRef;
}

// GET /api/rentals (tenant er nijer request history) endpoint er shape
export interface TenantRentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  status: RentalRequestStatus;
  moveInDate: string;
  moveOutDate: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  property: PropertyRentalRef;
}

export interface RentalsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: TenantRentalRequest[];
    meta: PaginationMeta;
  };
}

export type PaymentMethod = "CARD";
export type PaymentProvider = "STRIPE";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface PropertyPaymentRef {
  id: string;
  title: string;
  location: string;
}

export interface RentalRequestPaymentRef {
  id: string;
  tenantId: string;
  propertyId: string;
  status: RentalRequestStatus;
  moveInDate: string;
  moveOutDate: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  property: PropertyPaymentRef;
}

// GET /api/payments endpoint er shape
export interface PaymentListItem {
  id: string;
  rentalRequestId: string;
  transactionId: string;
  amount: number;
  method: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  rentalRequest: RentalRequestPaymentRef;
}

export interface PaymentsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: PaymentListItem[];
    meta: PaginationMeta;
  };
}


export interface LandlordPaymentRef {
  id: string;
  name: string;
  phone: string | null;
  email: string;
}

export interface PropertyWithLandlord {
  id: string;
  title: string;
  location: string;
  price: number;
  isAvailable: boolean;
  landlord: LandlordPaymentRef;
}

// GET /api/rentals/:id (single detail) endpoint er shape
export interface RentalRequestDetail {
  id: string;
  tenantId: string;
  propertyId: string;
  status: RentalRequestStatus;
  moveInDate: string;
  moveOutDate: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  property: PropertyWithLandlord;
  payment: PaymentListItem[];
  review: Review | null;
}

export interface RentalRequestDetailApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalRequestDetail;
}

// POST /api/payments/create endpoint er shape
export interface CreatePaymentResponseData {
  checkoutUrl: string;
  sessionId: string;
  payment: {
    id: string;
    rentalRequestId: string;
    transactionId: string;
    amount: number;
    method: PaymentMethod;
    provider: PaymentProvider;
    status: PaymentStatus;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}


export interface ConfirmPaymentResponseData {
  id: string;
  rentalRequestId: string;
  transactionId: string;
  amount: number;
  method: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}