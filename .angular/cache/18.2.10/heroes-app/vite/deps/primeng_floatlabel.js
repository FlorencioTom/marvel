import {
  SharedModule
} from "./chunk-AQ4PTQJY.js";
import {
  RouterModule
} from "./chunk-M2NUOS5W.js";
import "./chunk-3TC7O5T7.js";
import "./chunk-32PQHR52.js";
import {
  CommonModule
} from "./chunk-3GPHMYWF.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-2IRPN5DT.js";
import "./chunk-66JPAEYR.js";
import "./chunk-3OV72XIM.js";

// node_modules/primeng/fesm2022/primeng-floatlabel.mjs
var _c0 = ["*"];
var FloatLabel = class _FloatLabel {
  static ɵfac = function FloatLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FloatLabel)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _FloatLabel,
    selectors: [["p-floatLabel"]],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 0,
    consts: [[1, "p-float-label"]],
    template: function FloatLabel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "span", 0);
        ɵɵprojection(1);
        ɵɵelementEnd();
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatLabel, [{
    type: Component,
    args: [{
      selector: "p-floatLabel",
      template: `
        <span class="p-float-label">
            <ng-content></ng-content>
        </span>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None
    }]
  }], null, null);
})();
var FloatLabelModule = class _FloatLabelModule {
  static ɵfac = function FloatLabelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FloatLabelModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FloatLabelModule,
    declarations: [FloatLabel],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [FloatLabel, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, SharedModule, RouterModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatLabelModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule, RouterModule],
      exports: [FloatLabel, SharedModule],
      declarations: [FloatLabel]
    }]
  }], null, null);
})();
export {
  FloatLabel,
  FloatLabelModule
};
//# sourceMappingURL=primeng_floatlabel.js.map
