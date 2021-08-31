export default class SomeApi {
  getSomeData(): Promise<SomeApiResponse> {
    return new Promise<SomeApiResponse>(resolve => {
      resolve({data: 'SOME_DATA'});
    });
  }
}

export interface SomeApiResponse {
  data: string;
}
