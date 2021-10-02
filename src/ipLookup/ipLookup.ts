import * as api from "./api";

export type Logger = (result: api.ApiResponse) => void;

interface IpLookupProps {
  logger: Logger;
  onError(error: Error): void;
}

/* Looks up IP and logs result */
export default async function ipLookup(
  ip: string,
  { logger, onError }: IpLookupProps
): Promise<void> {
  try {
    const result = await api.ipLookup(ip);
    logger(result);
  } catch (error) {
    onError(error as Error);
  }
}
