import {AppError} from "./app-error";

export class ErrorData {
  error: AppError;
  blob: Blob;
  url: string;
  appStore: { [key: string]: any };
}
