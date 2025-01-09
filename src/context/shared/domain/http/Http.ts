type HeaderValue = string | string[] | number | boolean | null;

type CommonRequestHeadersList = "Accept" | "Content-Length" | "User-Agent" | "Content-Encoding" | "Authorization";

type ContentType = HeaderValue | "text/html" | "text/plain" | "multipart/form-data" | "application/json" | "application/x-www-form-urlencoded" | "application/octet-stream";

type Method =
    | "get" | "GET"
    | "delete" | "DELETE"
    | "head" | "HEAD"
    | "options" | "OPTIONS"
    | "post" | "POST"
    | "put" | "PUT"
    | "patch" | "PATCH"
    | "purge" | "PURGE"
    | "link" | "LINK"
  | "unlink" | "UNLINK";

type ResponseType =
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";

type MethodsHeaders = Partial<{
  [Key in Method as Lowercase<Key>]: RawHeaders | string;
} & {common: RawHeaders | string}>;

interface RawHeaders {
  [key: string]: HeaderValue;
}

type RawRequestHeaders = Partial<RawHeaders & {
  [Key in CommonRequestHeadersList]: HeaderValue;
} & {
  "Content-Type": ContentType;
}>;

export interface BasicCredentials {
  username: string;
  password: string;
}

export interface HttpConfig {
  headers?: ( RawRequestHeaders & MethodsHeaders ) | RawHeaders | string;
  responseType?: ResponseType;
  httpsAgent?: unknown;
  auth?: BasicCredentials;
}

export default interface Http {
  get: <T>( service: string, endpoint: string, config?: HttpConfig ) => Promise<T>;
  post: <U, T>( service: string, endpoint: string, data: U, config?: HttpConfig ) => Promise<T>;
  put: <U, T>( service: string, endpoint: string, data: U, config?: HttpConfig ) => Promise<T>;
  patch: <U, T>( service: string, endpoint: string, data: U, config?: HttpConfig ) => Promise<T>;
  delete: <T>( service: string, endpoint: string, config?: HttpConfig ) => Promise<T>;
}
