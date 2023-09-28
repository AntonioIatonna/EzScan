
import { MarkdownView, Plugin, WorkspaceLeaf } from "obsidian";

import { PDFtoTextModal } from "./modal";

export default class CycleThroughPanes extends Plugin {

  onload() {
    console.log('loading plugin: Cycle through panes');
    this.addCommand({
      id: "notes-pdf",
      name: "Notes for PDF",
      callback: () => {
        new PDFtoTextModal(this.app).open();
      }
    })
  }

  onunload() {
    console.log('unloading plugin: Cycle through panes');
  }
}