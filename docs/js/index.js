"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ease = {
  quadraticOut: function quadraticOut(t) {
    return -t * (t - 2);
  },
  quarticOut: function quarticOut(t) {
    return -Math.pow(t - 1, 4) + 1;
  } };

var mathx = {
  clamp: function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
  },
  scale: function scale(x, inLow, inHigh, outLow, outHigh) {
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  }
};

// Test if we're on mobile
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var GooeyTransition = function () {
  function GooeyTransition(svg) {
    _classCallCheck(this, GooeyTransition);

    this.svg = $(svg);
    this.paths = $(svg).find("path");
    this.limit = 0;
    this.gap = 0.05;
  }

  _createClass(GooeyTransition, [{
    key: "getPath",
    value: function getPath(easeQuad, easeQuart) {
      easeQuad += 27.5;
      easeQuart += 27.5;
      return "\n      M 0 0\n      V " + easeQuart + "\n      Q 12.5 " + easeQuart + " 25 " + easeQuad + "\n      T 50 " + easeQuad + "\n      T 75 " + easeQuad + "\n      T 100 " + easeQuart + "\n      V 0\n    ";
    }
  }, {
    key: "render",
    value: function render(t) {
      var easeQuad = mathx.scale(ease.quadraticOut(t), 1, 0, 0, 100);
      var easeQuart = mathx.scale(ease.quarticOut(t), 1, 0, 0, 100);
      var easeQuad2 = mathx.scale(ease.quadraticOut(t + this.gap), 1, 0, 0, 100);
      var easeQuart2 = mathx.scale(ease.quarticOut(t + this.gap), 1, 0, 0, 100);

      var svgHeight = this.svg.parent().height() + 5;
      this.svg.css("height", svgHeight);

      // console.log(svgHeight);

      this.svg.attr("viewBox", "0 0 100 100");

      $(this.paths[0]).attr("d", this.getPath(easeQuad, easeQuart));
      $(this.paths[1]).attr("d", this.getPath(easeQuad2, easeQuart2));
    }
  }]);

  return GooeyTransition;
}();

var GooeyTransitionReverse = function (_GooeyTransition) {
  _inherits(GooeyTransitionReverse, _GooeyTransition);

  function GooeyTransitionReverse(svg) {
    _classCallCheck(this, GooeyTransitionReverse);

    var _this = _possibleConstructorReturn(this, (GooeyTransitionReverse.__proto__ || Object.getPrototypeOf(GooeyTransitionReverse)).call(this, svg));

    _this.gap = -_this.gap;
    return _this;
  }

  _createClass(GooeyTransitionReverse, [{
    key: "getPath",
    value: function getPath(easeQuad, easeQuart) {
      easeQuad += 78.5;
      easeQuart += 78.5;
      return "\n      M 0 100\n      V " + easeQuart + "\n      Q 12.5 " + easeQuart + " 25 " + easeQuad + "\n      T 50 " + easeQuad + "\n      T 75 " + easeQuad + "\n      T 100 " + easeQuart + "\n      V 100\n    ";
    }
  }]);

  return GooeyTransitionReverse;
}(GooeyTransition);

// const landingTransitionScale = 1.5;


var landingTransition = new GooeyTransition("#landing-transition");
var contactTransition = new GooeyTransitionReverse("#contact-transition");

$(function () {
  // statically render gooey transition
  landingTransition.render(0.72);
  contactTransition.render(0.833);

  // window.print();
});