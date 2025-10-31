import {BaseError} from '@/utils';

export interface ResourceLoadErrorOptions {
  url: string;
  type: 'image' | 'video' | 'script';
}

export default class ResourceLoadError extends BaseError {
  readonly options: ResourceLoadErrorOptions;
  readonly name = 'ResourceLoadError';

  constructor(options: ResourceLoadErrorOptions) {
    super(`[${options.type}] ${options.url}`, { level: 'info' });
    this.options = options;
  }
}
