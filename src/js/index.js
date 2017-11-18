const ease = {
  quadraticOut: (t) => {
    return -t * (t - 2);
  },
  quarticOut: (t) => {
    return -Math.pow(t - 1, 4) + 1;
  }, //TODO: Try InOut (http://gizma.com/easing/)
}

const mathx = {
  clamp: function(x, min, max) {
    return Math.min(Math.max(x, min), max);
  },
  scale: function(x, inLow, inHigh, outLow, outHigh) {
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  }
}

// Test if we're on mobile
const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

class GooeyTransition {
  constructor(svg) {
    this.svg = $(svg);
    this.paths = $(svg).find("path");
    this.limit = 0;
    this.gap = 0.05;
  }
  getPath(easeQuad, easeQuart) {
    return `
      M 0 0
      V ${easeQuart}
      Q 12.5 ${easeQuart} 25 ${easeQuad}
      T 50 ${easeQuad}
      T 75 ${easeQuad}
      T 100 ${easeQuart}
      V 0
    `;
  }
  render(t, offset) {
    var easeQuad = mathx.scale(ease.quadraticOut(t), 1, 0, 0, 100) + offset;
    var easeQuart = mathx.scale(ease.quarticOut(t), 1, 0, 0, 100) + offset;
    var easeQuad2 = mathx.scale(ease.quadraticOut(t + this.gap), 1, 0, 0, 100) + offset;
    var easeQuart2 = mathx.scale(ease.quarticOut(t + this.gap), 1, 0, 0, 100) + offset;
    
    var svgHeight = this.svg.parent().height()+5;
    this.svg.css("height", svgHeight);

    // console.log(svgHeight);

    this.svg.attr("viewBox", `0 0 100 100`);
    
    $(this.paths[0]).attr("d", this.getPath(easeQuad, easeQuart));
    $(this.paths[1]).attr("d", this.getPath(easeQuad2, easeQuart2));
  }
}

class GooeyTransitionReverse extends GooeyTransition {
  constructor(svg) {
    super(svg);
    this.gap = -this.gap;
  }
  getPath(easeQuad, easeQuart) {
    return `
      M 0 100
      V ${easeQuart}
      Q 12.5 ${easeQuart} 25 ${easeQuad}
      T 50 ${easeQuad}
      T 75 ${easeQuad}
      T 100 ${easeQuart}
      V 100
    `;
  }
}

// const landingTransitionScale = 1.5;
const landingTransition = new GooeyTransition("#landing-transition");
const contactTransition = new GooeyTransitionReverse("#contact-transition");

$(function() {
  // statically render gooey transition
  landingTransition.render(0.72, 50);
  contactTransition.render(0.8333, 77);

  // window.print();
});