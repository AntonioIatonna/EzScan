import { App, FuzzySuggestModal, Modal, Notice, TFile } from "obsidian";
import { readFile, readFileSync } from 'fs';


import * as fs from 'fs';
import * as pdfjs from "pdfjs-dist";
import * as worker from "pdfjs-dist/build/pdf.worker.entry.js";


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

  async getPdfText(data: Buffer) {
      let doc = await pdfjs.getDocument({data}).promise;

      const x = (await doc.getPage(2)).getTextContent()
      console.log(x)

      let pageTexts = Array.from({length: doc.numPages}, async (v,i) => {
          return (await (await doc.getPage(i+1)).getTextContent()).items.map(token => token.str).join('');
      });
      return (await Promise.all(pageTexts)).join('\n');
  }


  async onChooseItem(file: TFile, evt: MouseEvent | KeyboardEvent) {
		// pdfjs.GlobalWorkerOptions.workerSrc = worker;

    const basePath = (this.app.vault.adapter as any).basePath


    pdfjs.GlobalWorkerOptions.workerSrc = worker;

    const filePath = basePath + "/" + file.path;

    const doc = await fs.readFileSync(filePath);

    const res = await this.getPdfText(doc);

    console.log(res);
    }
    
  }