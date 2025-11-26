const API_URL = import.meta.env.VITE_API_URL || "";

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
}

interface Item {
  id: number;
  title: string;
  description: string | null;
  owner_id: number;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("token");
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  getToken(): string | null {
    return this.token;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (this.token) {
      (config.headers as Record<string, string>)["Authorization"] =
        `Bearer ${this.token}`;
    }

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${this.baseUrl}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Login failed" }));
      throw new Error(error.detail);
    }

    const data: TokenResponse = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<User> {
    return this.request("/auth/register", {
      method: "POST",
      body: { email, username, password },
    });
  }

  async getMe(): Promise<User> {
    return this.request("/auth/me");
  }

  logout() {
    this.setToken(null);
  }

  // Items endpoints
  async getItems(): Promise<Item[]> {
    return this.request("/items");
  }

  async createItem(title: string, description?: string): Promise<Item> {
    return this.request("/items", {
      method: "POST",
      body: { title, description },
    });
  }

  async deleteItem(id: number): Promise<void> {
    return this.request(`/items/${id}`, { method: "DELETE" });
  }

  // Health check
  async health(): Promise<{ status: string }> {
    return this.request("/health");
  }
}

export const api = new ApiClient(API_URL);
export type { User, Item, TokenResponse };
