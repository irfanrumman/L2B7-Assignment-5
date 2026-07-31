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
}

export interface LandlordRef {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

// GET /api/properties (list) endpoint এর shape —
// category ar landlord join kora thake (nested object hisebe)
export interface PropertyListItem extends Property {
  category: CategoryRef;
  landlord: LandlordRef;
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