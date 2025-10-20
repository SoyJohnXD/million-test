import { ApiResponse } from '@/types/api';

type NextFetchOptions = {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const isServer = typeof window === 'undefined';
const API_BASE_URL = isServer
  ? process.env.INTERNAL_API_BASE_URL || 'http://backend:8080/api'
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit & NextFetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData: ApiResponse<unknown> | null = null;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        console.error('Error parsing error response JSON:', jsonError);
      }
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData?.message || response.statusText
        }`
      );
    }

    const data: ApiResponse<T> = await response.json();

    if (!data.success || data.content === undefined || data.content === null) {
      throw new Error(`API returned an error: ${data.message}`);
    }

    return data.content;
  } catch (error) {
    console.error('API Fetch Error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ${endpoint}: ${error.message}`);
    }
    throw new Error(`An unknown error occurred while fetching ${endpoint}`);
  }
}
