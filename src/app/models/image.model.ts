export interface Image {
  createdAt: number;
  url: string;
  description: string;
  color: string;
  style: string;
}

export interface OpenAIResponse {
  created: number;
  data: ImageResponse[];
}

export interface ImageResponse {
  url: string;
}

export interface ImagesState {
  images: Image[];
  error: any;
  loading: boolean;
  generating: boolean;
}
