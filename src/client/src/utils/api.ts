const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

async function http<T>(endpoint: string, { method = 'GET', body }: { method?: string, body?: any } = {}): Promise<T | null> {
    const token = localStorage.getItem('token') || ''

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : null,
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config)

    if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || 'Something went wrong')
    }

    return response.status === 204 ? null : response.json()
}

export const api = {
    get: <T>(endpoint: string) => http<T>(endpoint),
    post: <T>(endpoint: string, body: any) => http<T>(endpoint, { method: 'POST', body }),
    put: <T>(endpoint: string, body: any) => http<T>(endpoint, { method: 'PUT', body }),
    delete: <T>(endpoint: string) => http<T>(endpoint, { method: 'DELETE' }),
}