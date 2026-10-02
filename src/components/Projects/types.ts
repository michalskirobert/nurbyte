export type Project = {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  image: string | null;
  tech: string[];
  url: string | null;
  locked?: boolean;
  details?: string;
  actionLabel?: string;
  external?: boolean;
  secondaryUrl?: string;
  secondaryActionLabel?: string;
  secondaryExternal?: boolean;
};
