
import { MarkdownView, Plugin, WorkspaceLeaf } from "obsidian";

export default class CycleThroughPanes extends Plugin {

  onload() {
    console.log('loading plugin: Cycle through panes');
  }

  onunload() {
    console.log('unloading plugin: Cycle through panes');
  }
}