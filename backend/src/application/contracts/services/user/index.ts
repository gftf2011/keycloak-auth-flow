export type IntrospectionInput = {
  access_token: string;
};

export type MeOutput = any;

export type MeInput = {
  access_token: string;
};

export type IntrospectionOutput = any;

export interface UserService {
  introspection: (input: IntrospectionInput) => Promise<IntrospectionOutput>;
  me: (input: MeInput) => Promise<MeOutput>;
}
