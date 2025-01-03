export class FileUtils {

  static readonly acceptedTypes: string = ".pdf," +
    ".udf," +
    ".doc," +
    ".docx," +
    ".xls," +
    ".xlsx," +
    ".ppt," +
    ".pptx," +
    ".vsd," +
    ".vsdx," +
    ".pages," +
    ".numbers," +
    ".key," +
    ".csv," +
    ".msg," +
    ".eml," +
    ".bmp," +
    ".gif," +
    ".jpg," +
    ".jpeg," +
    ".tif," +
    ".txt," +
    ".png," +
    ".csv," +
    ".webp," +
    ".htm," +
    ".html," +
    ".rtf," +
    ".jasper," +
    ".7z," +
    ".gz," +
    ".gzip";

  static readonly fileSize: number = 268435456;

  static isFileTypeAcceptable(file: File, acceptedTypes: string) : boolean{
    let splittedFileName = file.name.split(".").reverse();
    let splittedAcceptedTypes = acceptedTypes.split(",");
    return !!splittedAcceptedTypes.find(t => t === `.${splittedFileName[0].toLocaleLowerCase()}`);
  }
}
