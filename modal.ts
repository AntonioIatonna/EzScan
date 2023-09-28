import { App, FuzzySuggestModal, Modal, Notice, TFile } from "obsidian";


export class PDFtoTextModal extends FuzzySuggestModal<TFile> {
  getItems(): TFile[] {
    const files = this.app.vault.getFiles();

    return files.filter(
      (element, index, array) => {
        if(element.extension == "pdf"){
          return true;
        }
        return false;
      }
    )
  }

  getItemText(file: TFile): string {
    return file.name;
  }

  onChooseItem(file: TFile, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${file.extension}`);
  }
}