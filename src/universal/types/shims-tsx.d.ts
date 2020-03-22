import Vue, { VNode } from 'vue'
// import { type } from 'os';
// declare global 扩展全局变量
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
