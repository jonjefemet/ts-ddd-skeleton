import { injectable } from "inversify";
import Http, { HttpConfig } from "../../domain/http/Http";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import InfraestructureError from "../../domain/error/InfraestructureError";
import Services, { ServicesEnum } from "src/config/Services";

@injectable()
export default class AxiosHttp implements Http {

  private clients: Map<ServicesEnum, AxiosInstance> = new Map();

  constructor () {
    for ( const service in Services ) {
      this.registerClient( ServicesEnum[service], Services[service]);
    }
  }

  private registerClient ( clientName: ServicesEnum, baseUrl: string ): void {

    if ( this.clients.has( clientName )) throw new InfraestructureError({
      code: "66dd5a3f-6771-4882-9909-b8cb7c1451a7",
      message: "Error at http client register"
    });

    this.clients.set( clientName, axios.create({
      baseURL: baseUrl
    }));

  }

  private getClient ( name: ServicesEnum ): AxiosInstance {
    if ( !this.clients.has( name )) throw new InfraestructureError({
      code: "63db2f20-1ee7-4c75-b84d-39faf49dac34",
      message: "Client Not registered"
    });

    return this.clients.get( name );
  }

  async get<T> ( service: keyof typeof ServicesEnum, endpoint: string, config: HttpConfig = {}): Promise<T> {
    return ( await this.getClient( ServicesEnum[service]).get<T>( endpoint, config as AxiosRequestConfig )).data;
  }

  async post<T, U> ( service: keyof typeof ServicesEnum, endpoint: string, data: U, config: HttpConfig = {}): Promise<T> {
    return ( await this.getClient( ServicesEnum[service]).post<T>( endpoint, data, config as AxiosRequestConfig )).data;
  }

  async put<T, U> ( service: keyof typeof ServicesEnum, endpoint: string, data: U, config: HttpConfig = {}): Promise<T> {
    return ( await this.getClient( ServicesEnum[service]).put<T>( endpoint, data, config as AxiosRequestConfig )).data;
  }

  async patch<T, U> ( service: keyof typeof ServicesEnum, endpoint: string, data: U, config: HttpConfig = {}): Promise<T> {
    return ( await this.getClient( ServicesEnum[service]).patch<T>( endpoint, data, config as AxiosRequestConfig )).data;
  }

  async delete<T> ( service: keyof typeof ServicesEnum, endpoint: string, config: HttpConfig = {}): Promise<T> {
    return ( await this.getClient( ServicesEnum[service]).delete<T>( endpoint, config as AxiosRequestConfig )).data;
  }

}