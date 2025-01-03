import * as FileSaver from 'file-saver';

export class DownloadUtil {

  static downloadFile(blob: Blob, fileName: string) {
    FileSaver.saveAs(blob, fileName);
  }
}
