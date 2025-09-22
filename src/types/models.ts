export type Account = { id: string; name: string; balance: number; currency: 'GBP'|'EUR' };
export type Payment = { id: string; fromId: string; toId: string; amount: number; currency: 'GBP'|'EUR'; createdAt: string };

/** Uniform API error envelope to keep client handling consistent across endpoints. */
export type ApiError = { error: { code: string; message: string } };
