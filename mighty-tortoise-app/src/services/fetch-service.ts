// create a class to use fetch

export class FetchService {
  public url: string;
  constructor(url: string) {
    this.url = url;
  }

  getData = async () => {
    try {
      const response = await fetch(this.url);
      return response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
}
