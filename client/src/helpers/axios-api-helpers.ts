import { TokenService } from "@/utils/axios";



export function setAdminToken(token: string): void {
  TokenService.setToken(token);
}

export function getAdminToken(): string | null | void {
  TokenService.getToken();
}

export function removeAdminToken(): void {
  TokenService.removeToken();
}
export function logoutAdmin(): void {
  removeAdminToken();
  window.location.href = "/signin";
}