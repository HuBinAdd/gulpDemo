// JavaScript Document

if (typeof Array.prototype.foreach != "function") {
  Array.prototype.foreach = function (fn, context) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (typeof fn === "function" && this.hasOwnProperty(k)) {
        fn.call(context, this[k], k, this);
      }
    }
  };
}

if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {      
         arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
  };
}


if (typeof Array.prototype.filter != "function") {
  Array.prototype.filter = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
       for (var k = 0, length = this.length; k < length; k++) {
          fn.call(context, this[k], k, this) && arr.push(this[k]);
       }
    }
    return arr;
  };
}


if (typeof Array.prototype.some != "function") {
  Array.prototype.some = function (fn, context) {
	var passed = false;
	if (typeof fn === "function") {
   	  for (var k = 0, length = this.length; k < length; k++) {
  		  if (passed === true) break;
  		  passed = !!fn.call(context, this[k], k, this);
  	  }
    }
	return passed;
  };
}

if (typeof Array.prototype.every != "function") {
  Array.prototype.every = function (fn, context) {
    var passed = true;
    if (typeof fn === "function") {
       for (var k = 0, length = this.length; k < length; k++) {
          if (passed === false) break;
          passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
  };
}

if (typeof Array.prototype.indexOf != "function") {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var index = -1;
    fromIndex = fromIndex * 1 || 0;

    for (var k = 0, length = this.length; k < length; k++) {
      if (k >= fromIndex && this[k] === searchElement) {
          index = k;
          break;
      }
    }
    return index;
  };
}

if (typeof Array.prototype.lastIndexOf != "function") {
  Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
    var index = -1, length = this.length;
    fromIndex = fromIndex * 1 || length - 1;

    for (var k = length - 1; k > -1; k-=1) {
        if (k <= fromIndex && this[k] === searchElement) {
            index = k;
            break;
        }
    }
    return index;
  };
}

if (typeof Array.prototype.reduce != "function") {
  Array.prototype.reduce = function (callback, initialValue ) {
     var previous = initialValue, k = 0, length = this.length;
     if (typeof initialValue === "undefined") {
        previous = this[0];
        k = 1;
     }
     
    if (typeof callback === "function") {
      for (k; k < length; k++) {
         this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  };
}

if (typeof Array.prototype.reduceRight != "function") {
  Array.prototype.reduceRight = function (callback, initialValue ) {
    var length = this.length, k = length - 1, previous = initialValue;
    if (typeof initialValue === "undefined") {
        previous = this[length - 1];
        k--;
    }
    if (typeof callback === "function") {
       for (k; k > -1; k-=1) {          
          this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
       }
    }
    return previous;
  };
}
//个人方法isNumber判断当前参数是否为number类型
if (typeof Number.prototype.isNumber != "function") {
  Number.prototype.reduceRight = function (searchElement) {
    return +searchElement === searchElement;
  };
}
//低版本浏览器添加bind方法
if (!Function.prototype.bind) { 
Function.prototype.bind = function (oThis) { 
	if (typeof this !== "function") { 
		throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); 
	} 
	var aArgs = Array.prototype.slice.call(arguments, 1), 
	fToBind = this, 
	fNOP = function () {}, 
	fBound = function () { 
		return fToBind.apply(this instanceof fNOP && oThis ? this: oThis, aArgs.concat(Array.prototype.slice.call(arguments))); 
	}; 
	fNOP.prototype = this.prototype; 
	fBound.prototype = new fNOP(); 
	return fBound; 
	}; 
}