export interface Gist {
  public: boolean;
}

export type Authentication = 'authenticated' | 'unauthenticated';

export interface CreateGistRequest {
  description: string;
  files: Record<
    string,
    {
      content: string;
    }
  >;
  public: boolean;
}

export interface UpdateGistRequest {
  description: string;
  files: Record<
    string,
    {
      content: string;
    }
  >;
}
