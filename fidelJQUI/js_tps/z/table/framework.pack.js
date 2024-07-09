var Prototype={Version:"1.6.0",Browser:{IE:!!(window.attachEvent&&!window.opera),Opera:!!window.opera,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/)},BrowserFeatures:{XPath:!!document.evaluate,ElementExtensions:!!window.HTMLElement,SpecificElementExtensions:document.createElement("div").__proto__&&document.createElement("div").__proto__!==document.createElement("form").__proto__},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(A){return A
}};
if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false
}if(Prototype.Browser.WebKit){Prototype.BrowserFeatures.XPath=false
}var Class={create:function(){var E=null,D=$A(arguments);
if(Object.isFunction(D[0])){E=D.shift()
}function A(){this.initialize.apply(this,arguments)
}Object.extend(A,Class.Methods);
A.superclass=E;
A.subclasses=[];
if(E){var B=function(){};
B.prototype=E.prototype;
A.prototype=new B;
E.subclasses.push(A)
}for(var C=0;
C<D.length;
C++){A.addMethods(D[C])
}if(!A.prototype.initialize){A.prototype.initialize=Prototype.emptyFunction
}A.prototype.constructor=A;
return A
}};
Class.Methods={addMethods:function(G){var C=this.superclass&&this.superclass.prototype;
var B=Object.keys(G);
if(!Object.keys({toString:true}).length){B.push("toString","valueOf")
}for(var A=0,D=B.length;
A<D;
A++){var F=B[A],E=G[F];
if(C&&Object.isFunction(E)&&E.argumentNames().first()=="$super"){var H=E,E=Object.extend((function(I){return function(){return C[I].apply(this,arguments)
}
})(F).wrap(H),{valueOf:function(){return H
},toString:function(){return H.toString()
}})
}this.prototype[F]=E
}return this
}};
var Abstract={};
Object.extend=function(A,C){for(var B in C){A[B]=C[B]
}return A
};
Object.extend(Object,{inspect:function(A){try{if(A===undefined){return"undefined"
}if(A===null){return"null"
}return A.inspect?A.inspect():A.toString()
}catch(B){if(B instanceof RangeError){return"..."
}throw B
}},toJSON:function(A){var C=typeof A;
switch(C){case"undefined":case"function":case"unknown":return ;
case"boolean":return A.toString()
}if(A===null){return"null"
}if(A.toJSON){return A.toJSON()
}if(Object.isElement(A)){return 
}var B=[];
for(var E in A){var D=Object.toJSON(A[E]);
if(D!==undefined){B.push(E.toJSON()+": "+D)
}}return"{"+B.join(", ")+"}"
},toQueryString:function(A){return $H(A).toQueryString()
},toHTML:function(A){return A&&A.toHTML?A.toHTML():String.interpret(A)
},keys:function(A){var B=[];
for(var C in A){B.push(C)
}return B
},values:function(B){var A=[];
for(var C in B){A.push(B[C])
}return A
},clone:function(A){return Object.extend({},A)
},isElement:function(A){return A&&A.nodeType==1
},isArray:function(A){return A&&A.constructor===Array
},isHash:function(A){return A instanceof Hash
},isFunction:function(A){return typeof A=="function"
},isString:function(A){return typeof A=="string"
},isNumber:function(A){return typeof A=="number"
},isUndefined:function(A){return typeof A=="undefined"
}});
Object.extend(Function.prototype,{argumentNames:function(){var A=this.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",").invoke("strip");
return A.length==1&&!A[0]?[]:A
},bind:function(){if(arguments.length<2&&arguments[0]===undefined){return this
}var A=this,C=$A(arguments),B=C.shift();
return function(){return A.apply(B,C.concat($A(arguments)))
}
},bindAsEventListener:function(){var A=this,C=$A(arguments),B=C.shift();
return function(D){return A.apply(B,[D||window.event].concat(C))
}
},curry:function(){if(!arguments.length){return this
}var A=this,B=$A(arguments);
return function(){return A.apply(this,B.concat($A(arguments)))
}
},delay:function(){var A=this,B=$A(arguments),C=B.shift()*1000;
return window.setTimeout(function(){return A.apply(A,B)
},C)
},wrap:function(B){var A=this;
return function(){return B.apply(this,[A.bind(this)].concat($A(arguments)))
}
},methodize:function(){if(this._methodized){return this._methodized
}var A=this;
return this._methodized=function(){return A.apply(null,[this].concat($A(arguments)))
}
}});
Function.prototype.defer=Function.prototype.delay.curry(0.01);
Date.prototype.toJSON=function(){return'"'+this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+'Z"'
};
var Try={these:function(){var C;
for(var B=0,D=arguments.length;
B<D;
B++){var A=arguments[B];
try{C=A();
break
}catch(E){}}return C
}};
RegExp.prototype.match=RegExp.prototype.test;
RegExp.escape=function(A){return String(A).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")
};
var PeriodicalExecuter=Class.create({initialize:function(B,A){this.callback=B;
this.frequency=A;
this.currentlyExecuting=false;
this.registerCallback()
},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000)
},execute:function(){this.callback(this)
},stop:function(){if(!this.timer){return 
}clearInterval(this.timer);
this.timer=null
},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;
this.execute()
}finally{this.currentlyExecuting=false
}}}});
Object.extend(String,{interpret:function(A){return A==null?"":String(A)
},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});
Object.extend(String.prototype,{gsub:function(E,C){var A="",D=this,B;
C=arguments.callee.prepareReplacement(C);
while(D.length>0){if(B=D.match(E)){A+=D.slice(0,B.index);
A+=String.interpret(C(B));
D=D.slice(B.index+B[0].length)
}else{A+=D,D=""
}}return A
},sub:function(C,A,B){A=this.gsub.prepareReplacement(A);
B=B===undefined?1:B;
return this.gsub(C,function(D){if(--B<0){return D[0]
}return A(D)
})
},scan:function(B,A){this.gsub(B,A);
return String(this)
},truncate:function(B,A){B=B||30;
A=A===undefined?"...":A;
return this.length>B?this.slice(0,B-A.length)+A:String(this)
},strip:function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")
},stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"")
},stripScripts:function(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")
},extractScripts:function(){var B=new RegExp(Prototype.ScriptFragment,"img");
var A=new RegExp(Prototype.ScriptFragment,"im");
return(this.match(B)||[]).map(function(D){var C=(D.match(A)||["",""])[1];
C=C.replace(/</,"&lt;").replace(/\s*&lt;!--[^\r\n]*/,"");
return C
})
},evalScripts:function(){return this.extractScripts().map(function(script){return eval(script)
})
},escapeHTML:function(){var A=arguments.callee;
A.text.data=this;
return A.div.innerHTML
},unescapeHTML:function(){var A=new Element("div");
A.innerHTML=this.stripTags();
return A.childNodes[0]?(A.childNodes.length>1?$A(A.childNodes).inject("",function(B,C){return B+C.nodeValue
}):A.childNodes[0].nodeValue):""
},toQueryParams:function(B){var A=this.strip().match(/([^?#]*)(#.*)?$/);
if(!A){return{}
}return A[1].split(B||"&").inject({},function(E,F){if((F=F.split("="))[0]){var C=decodeURIComponent(F.shift());
var D=F.length>1?F.join("="):F[0];
if(D!=undefined){D=decodeURIComponent(D)
}if(C in E){if(!Object.isArray(E[C])){E[C]=[E[C]]
}E[C].push(D)
}else{E[C]=D
}}return E
})
},toArray:function(){return this.split("")
},succ:function(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)
},times:function(A){return A<1?"":new Array(A+1).join(this)
},camelize:function(){var D=this.split("-"),A=D.length;
if(A==1){return D[0]
}var C=this.charAt(0)=="-"?D[0].charAt(0).toUpperCase()+D[0].substring(1):D[0];
for(var B=1;
B<A;
B++){C+=D[B].charAt(0).toUpperCase()+D[B].substring(1)
}return C
},capitalize:function(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()
},underscore:function(){return this.gsub(/::/,"/").gsub(/([A-Z]+)([A-Z][a-z])/,"#{1}_#{2}").gsub(/([a-z\d])([A-Z])/,"#{1}_#{2}").gsub(/-/,"_").toLowerCase()
},dasherize:function(){return this.gsub(/_/,"-")
},inspect:function(B){var A=this.gsub(/[\x00-\x1f\\]/,function(C){var D=String.specialChar[C[0]];
return D?D:"\\u00"+C[0].charCodeAt().toPaddedString(2,16)
});
if(B){return'"'+A.replace(/"/g,'\\"')+'"'
}return"'"+A.replace(/'/g,"\\'")+"'"
},toJSON:function(){return this.inspect(true)
},unfilterJSON:function(A){return this.sub(A||Prototype.JSONFilter,"#{1}")
},isJSON:function(){var A=this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");
return(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(A)
},evalJSON:function(sanitize){var json=this.unfilterJSON();
try{if(!sanitize||json.isJSON()){return eval("("+json+")")
}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect())
},include:function(A){return this.indexOf(A)>-1
},startsWith:function(A){return this.indexOf(A)===0
},endsWith:function(A){var B=this.length-A.length;
return B>=0&&this.lastIndexOf(A)===B
},empty:function(){return this==""
},blank:function(){return/^\s*$/.test(this)
},interpolate:function(A,B){return new Template(this,B).evaluate(A)
}});
if(Prototype.Browser.WebKit||Prototype.Browser.IE){Object.extend(String.prototype,{escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
},unescapeHTML:function(){return this.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
}})
}String.prototype.gsub.prepareReplacement=function(B){if(Object.isFunction(B)){return B
}var A=new Template(B);
return function(C){return A.evaluate(C)
}
};
String.prototype.parseQuery=String.prototype.toQueryParams;
Object.extend(String.prototype.escapeHTML,{div:document.createElement("div"),text:document.createTextNode("")});
with(String.prototype.escapeHTML){div.appendChild(text)
}var Template=Class.create({initialize:function(A,B){this.template=A.toString();
this.pattern=B||Template.Pattern
},evaluate:function(A){if(Object.isFunction(A.toTemplateReplacements)){A=A.toTemplateReplacements()
}return this.template.gsub(this.pattern,function(D){if(A==null){return""
}var F=D[1]||"";
if(F=="\\"){return D[2]
}var B=A,G=D[3];
var E=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/,D=E.exec(G);
if(D==null){return F
}while(D!=null){var C=D[1].startsWith("[")?D[2].gsub("\\\\]","]"):D[1];
B=B[C];
if(null==B||""==D[3]){break
}G=G.substring("["==D[3]?D[1].length:D[0].length);
D=E.exec(G)
}return F+String.interpret(B)
}.bind(this))
}});
Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;
var $break={};
var Enumerable={each:function(C,B){var A=0;
C=C.bind(B);
try{this._each(function(E){C(E,A++)
})
}catch(D){if(D!=$break){throw D
}}return this
},eachSlice:function(D,C,B){C=C?C.bind(B):Prototype.K;
var A=-D,E=[],F=this.toArray();
while((A+=D)<F.length){E.push(F.slice(A,A+D))
}return E.collect(C,B)
},all:function(C,B){C=C?C.bind(B):Prototype.K;
var A=true;
this.each(function(E,D){A=A&&!!C(E,D);
if(!A){throw $break
}});
return A
},any:function(C,B){C=C?C.bind(B):Prototype.K;
var A=false;
this.each(function(E,D){if(A=!!C(E,D)){throw $break
}});
return A
},collect:function(C,B){C=C?C.bind(B):Prototype.K;
var A=[];
this.each(function(E,D){A.push(C(E,D))
});
return A
},detect:function(C,B){C=C.bind(B);
var A;
this.each(function(E,D){if(C(E,D)){A=E;
throw $break
}});
return A
},findAll:function(C,B){C=C.bind(B);
var A=[];
this.each(function(E,D){if(C(E,D)){A.push(E)
}});
return A
},grep:function(D,C,B){C=C?C.bind(B):Prototype.K;
var A=[];
if(Object.isString(D)){D=new RegExp(D)
}this.each(function(F,E){if(D.match(F)){A.push(C(F,E))
}});
return A
},include:function(A){if(Object.isFunction(this.indexOf)){if(this.indexOf(A)!=-1){return true
}}var B=false;
this.each(function(C){if(C==A){B=true;
throw $break
}});
return B
},inGroupsOf:function(B,A){A=A===undefined?null:A;
return this.eachSlice(B,function(C){while(C.length<B){C.push(A)
}return C
})
},inject:function(A,C,B){C=C.bind(B);
this.each(function(E,D){A=C(A,E,D)
});
return A
},invoke:function(B){var A=$A(arguments).slice(1);
return this.map(function(C){return C[B].apply(C,A)
})
},max:function(C,B){C=C?C.bind(B):Prototype.K;
var A;
this.each(function(E,D){E=C(E,D);
if(A==undefined||E>=A){A=E
}});
return A
},min:function(C,B){C=C?C.bind(B):Prototype.K;
var A;
this.each(function(E,D){E=C(E,D);
if(A==undefined||E<A){A=E
}});
return A
},partition:function(D,B){D=D?D.bind(B):Prototype.K;
var C=[],A=[];
this.each(function(F,E){(D(F,E)?C:A).push(F)
});
return[C,A]
},pluck:function(B){var A=[];
this.each(function(C){A.push(C[B])
});
return A
},reject:function(C,B){C=C.bind(B);
var A=[];
this.each(function(E,D){if(!C(E,D)){A.push(E)
}});
return A
},sortBy:function(B,A){B=B.bind(A);
return this.map(function(D,C){return{value:D,criteria:B(D,C)}
}).sort(function(F,E){var D=F.criteria,C=E.criteria;
return D<C?-1:D>C?1:0
}).pluck("value")
},toArray:function(){return this.map()
},zip:function(){var B=Prototype.K,A=$A(arguments);
if(Object.isFunction(A.last())){B=A.pop()
}var C=[this].concat(A).map($A);
return this.map(function(E,D){return B(C.pluck(D))
})
},size:function(){return this.toArray().length
},inspect:function(){return"#<Enumerable:"+this.toArray().inspect()+">"
}};
Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,filter:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray,every:Enumerable.all,some:Enumerable.any});
function $A(C){if(!C){return[]
}if(C.toArray){return C.toArray()
}var B=C.length,A=new Array(B);
while(B--){A[B]=C[B]
}return A
}if(Prototype.Browser.WebKit){function $A(C){if(!C){return[]
}if(!(Object.isFunction(C)&&C=="[object NodeList]")&&C.toArray){return C.toArray()
}var B=C.length,A=new Array(B);
while(B--){A[B]=C[B]
}return A
}}Array.from=$A;
Object.extend(Array.prototype,Enumerable);
if(!Array.prototype._reverse){Array.prototype._reverse=Array.prototype.reverse
}Object.extend(Array.prototype,{_each:function(B){for(var A=0,C=this.length;
A<C;
A++){B(this[A])
}},clear:function(){this.length=0;
return this
},first:function(){return this[0]
},last:function(){return this[this.length-1]
},compact:function(){return this.select(function(A){return A!=null
})
},flatten:function(){return this.inject([],function(B,A){return B.concat(Object.isArray(A)?A.flatten():[A])
})
},without:function(){var A=$A(arguments);
return this.select(function(B){return !A.include(B)
})
},reverse:function(A){return(A!==false?this:this.toArray())._reverse()
},reduce:function(){return this.length>1?this:this[0]
},uniq:function(A){return this.inject([],function(D,C,B){if(0==B||(A?D.last()!=C:!D.include(C))){D.push(C)
}return D
})
},intersect:function(A){return this.uniq().findAll(function(B){return A.detect(function(C){return B===C
})
})
},clone:function(){return[].concat(this)
},size:function(){return this.length
},inspect:function(){return"["+this.map(Object.inspect).join(", ")+"]"
},toJSON:function(){var A=[];
this.each(function(B){var C=Object.toJSON(B);
if(C!==undefined){A.push(C)
}});
return"["+A.join(", ")+"]"
}});
if(Object.isFunction(Array.prototype.forEach)){Array.prototype._each=Array.prototype.forEach
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(C,A){A||(A=0);
var B=this.length;
if(A<0){A=B+A
}for(;
A<B;
A++){if(this[A]===C){return A
}}return -1
}
}if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(B,A){A=isNaN(A)?this.length:(A<0?this.length+A:A)+1;
var C=this.slice(0,A).reverse().indexOf(B);
return(C<0)?C:A-C-1
}
}Array.prototype.toArray=Array.prototype.clone;
function $w(A){if(!Object.isString(A)){return[]
}A=A.strip();
return A?A.split(/\s+/):[]
}if(Prototype.Browser.Opera){Array.prototype.concat=function(){var E=[];
for(var B=0,C=this.length;
B<C;
B++){E.push(this[B])
}for(var B=0,C=arguments.length;
B<C;
B++){if(Object.isArray(arguments[B])){for(var A=0,D=arguments[B].length;
A<D;
A++){E.push(arguments[B][A])
}}else{E.push(arguments[B])
}}return E
}
}Object.extend(Number.prototype,{toColorPart:function(){return this.toPaddedString(2,16)
},succ:function(){return this+1
},times:function(A){$R(0,this,true).each(A);
return this
},toPaddedString:function(C,B){var A=this.toString(B||10);
return"0".times(C-A.length)+A
},toJSON:function(){return isFinite(this)?this.toString():"null"
}});
$w("abs round ceil floor").each(function(A){Number.prototype[A]=Math[A].methodize()
});
function $H(A){return new Hash(A)
}var Hash=Class.create(Enumerable,(function(){if(function(){var C=0,E=function(F){this.key=F
};
E.prototype.key="foo";
for(var D in new E("bar")){C++
}return C>1
}()){function B(E){var C=[];
for(var D in this._object){var F=this._object[D];
if(C.include(D)){continue
}C.push(D);
var G=[D,F];
G.key=D;
G.value=F;
E(G)
}}}else{function B(D){for(var C in this._object){var E=this._object[C],F=[C,E];
F.key=C;
F.value=E;
D(F)
}}}function A(C,D){if(Object.isUndefined(D)){return C
}return C+"="+encodeURIComponent(String.interpret(D))
}return{initialize:function(C){this._object=Object.isHash(C)?C.toObject():Object.clone(C)
},_each:B,set:function(C,D){return this._object[C]=D
},get:function(C){return this._object[C]
},unset:function(C){var D=this._object[C];
delete this._object[C];
return D
},toObject:function(){return Object.clone(this._object)
},keys:function(){return this.pluck("key")
},values:function(){return this.pluck("value")
},index:function(D){var C=this.detect(function(E){return E.value===D
});
return C&&C.key
},merge:function(C){return this.clone().update(C)
},update:function(C){return new Hash(C).inject(this,function(D,E){D.set(E.key,E.value);
return D
})
},toQueryString:function(){return this.map(function(E){var D=encodeURIComponent(E.key),C=E.value;
if(C&&typeof C=="object"){if(Object.isArray(C)){return C.map(A.curry(D)).join("&")
}}return A(D,C)
}).join("&")
},inspect:function(){return"#<Hash:{"+this.map(function(C){return C.map(Object.inspect).join(": ")
}).join(", ")+"}>"
},toJSON:function(){return Object.toJSON(this.toObject())
},clone:function(){return new Hash(this)
}}
})());
Hash.prototype.toTemplateReplacements=Hash.prototype.toObject;
Hash.from=$H;
var ObjectRange=Class.create(Enumerable,{initialize:function(C,A,B){this.start=C;
this.end=A;
this.exclusive=B
},_each:function(A){var B=this.start;
while(this.include(B)){A(B);
B=B.succ()
}},include:function(A){if(A<this.start){return false
}if(this.exclusive){return A<this.end
}return A<=this.end
}});
var $R=function(C,A,B){return new ObjectRange(C,A,B)
};
var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
})||false
},activeRequestCount:0};
Ajax.Responders={responders:[],_each:function(A){this.responders._each(A)
},register:function(A){if(!this.include(A)){this.responders.push(A)
}},unregister:function(A){this.responders=this.responders.without(A)
},dispatch:function(D,B,C,A){this.each(function(E){if(Object.isFunction(E[D])){try{E[D].apply(E,[B,C,A])
}catch(F){}}})
}};
Object.extend(Ajax.Responders,Enumerable);
Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++
},onComplete:function(){Ajax.activeRequestCount--
}});
Ajax.Base=Class.create({initialize:function(A){this.options={method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",evalJSON:true,evalJS:true};
Object.extend(this.options,A||{});
this.options.method=this.options.method.toLowerCase();
if(Object.isString(this.options.parameters)){this.options.parameters=this.options.parameters.toQueryParams()
}}});
Ajax.Request=Class.create(Ajax.Base,{_complete:false,initialize:function($super,B,A){$super(A);
this.transport=Ajax.getTransport();
this.request(B)
},request:function(B){this.url=B;
this.method=this.options.method;
var D=Object.clone(this.options.parameters);
if(!["get","post"].include(this.method)){D["_method"]=this.method;
this.method="post"
}this.parameters=D;
if(D=Object.toQueryString(D)){if(this.method=="get"){this.url+=(this.url.include("?")?"&":"?")+D
}else{if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){D+="&_="
}}}try{var A=new Ajax.Response(this);
if(this.options.onCreate){this.options.onCreate(A)
}Ajax.Responders.dispatch("onCreate",this,A);
this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);
if(this.options.asynchronous){this.respondToReadyState.bind(this).defer(1)
}this.transport.onreadystatechange=this.onStateChange.bind(this);
this.setRequestHeaders();
this.body=this.method=="post"?(this.options.postBody||D):null;
this.transport.send(this.body);
if(!this.options.asynchronous&&this.transport.overrideMimeType){this.onStateChange()
}}catch(C){this.dispatchException(C)
}},onStateChange:function(){var A=this.transport.readyState;
if(A>1&&!((A==4)&&this._complete)){this.respondToReadyState(this.transport.readyState)
}},setRequestHeaders:function(){var E={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,"Accept":"text/javascript, text/html, application/xml, text/xml, */*"};
if(this.method=="post"){E["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:"");
if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){E["Connection"]="close"
}}if(typeof this.options.requestHeaders=="object"){var C=this.options.requestHeaders;
if(Object.isFunction(C.push)){for(var B=0,D=C.length;
B<D;
B+=2){E[C[B]]=C[B+1]
}}else{$H(C).each(function(F){E[F.key]=F.value
})
}}for(var A in E){this.transport.setRequestHeader(A,E[A])
}},success:function(){var A=this.getStatus();
return !A||(A>=200&&A<300)
},getStatus:function(){try{return this.transport.status||0
}catch(A){return 0
}},respondToReadyState:function(A){var C=Ajax.Request.Events[A],B=new Ajax.Response(this);
if(C=="Complete"){try{this._complete=true;
(this.options["on"+B.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(B,B.headerJSON)
}catch(D){this.dispatchException(D)
}var E=B.getHeader("Content-type");
if(this.options.evalJS=="force"||(this.options.evalJS&&E&&E.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))){this.evalResponse()
}}try{(this.options["on"+C]||Prototype.emptyFunction)(B,B.headerJSON);
Ajax.Responders.dispatch("on"+C,this,B,B.headerJSON)
}catch(D){this.dispatchException(D)
}if(C=="Complete"){this.transport.onreadystatechange=Prototype.emptyFunction
}},getHeader:function(A){try{return this.transport.getResponseHeader(A)
}catch(B){return null
}},evalResponse:function(){try{return eval((this.transport.responseText||"").unfilterJSON())
}catch(e){this.dispatchException(e)
}},dispatchException:function(A){(this.options.onException||Prototype.emptyFunction)(this,A);
Ajax.Responders.dispatch("onException",this,A)
}});
Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Response=Class.create({initialize:function(C){this.request=C;
var D=this.transport=C.transport,A=this.readyState=D.readyState;
if((A>2&&!Prototype.Browser.IE)||A==4){this.status=this.getStatus();
this.statusText=this.getStatusText();
this.responseText=String.interpret(D.responseText);
this.headerJSON=this._getHeaderJSON()
}if(A==4){var B=D.responseXML;
this.responseXML=B===undefined?null:B;
this.responseJSON=this._getResponseJSON()
}},status:0,statusText:"",getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||""
}catch(A){return""
}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders()
}catch(A){return null
}},getResponseHeader:function(A){return this.transport.getResponseHeader(A)
},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders()
},_getHeaderJSON:function(){var A=this.getHeader("X-JSON");
if(!A){return null
}A=decodeURIComponent(escape(A));
try{return A.evalJSON(this.request.options.sanitizeJSON)
}catch(B){this.request.dispatchException(B)
}},_getResponseJSON:function(){var A=this.request.options;
if(!A.evalJSON||(A.evalJSON!="force"&&!(this.getHeader("Content-type")||"").include("application/json"))){return null
}try{return this.transport.responseText.evalJSON(A.sanitizeJSON)
}catch(B){this.request.dispatchException(B)
}}});
Ajax.Updater=Class.create(Ajax.Request,{initialize:function($super,A,C,B){this.container={success:(A.success||A),failure:(A.failure||(A.success?null:A))};
B=B||{};
var D=B.onComplete;
B.onComplete=(function(E,F){this.updateContent(E.responseText);
if(Object.isFunction(D)){D(E,F)
}}).bind(this);
$super(C,B)
},updateContent:function(D){var C=this.container[this.success()?"success":"failure"],A=this.options;
if(!A.evalScripts){D=D.stripScripts()
}if(C=$(C)){if(A.insertion){if(Object.isString(A.insertion)){var B={};
B[A.insertion]=D;
C.insert(B)
}else{A.insertion(C,D)
}}else{C.update(D)
}}if(this.success()){if(this.onComplete){this.onComplete.bind(this).defer()
}}}});
Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($super,A,C,B){$super(B);
this.onComplete=this.options.onComplete;
this.frequency=(this.options.frequency||2);
this.decay=(this.options.decay||1);
this.updater={};
this.container=A;
this.url=C;
this.start()
},start:function(){this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent()
},stop:function(){this.updater.options.onComplete=undefined;
clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments)
},updateComplete:function(A){if(this.options.decay){this.decay=(A.responseText==this.lastText?this.decay*this.options.decay:1);
this.lastText=A.responseText
}this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency)
},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)
}});
function $(B){if(arguments.length>1){for(var A=0,D=[],C=arguments.length;
A<C;
A++){D.push($(arguments[A]))
}return D
}if(Object.isString(B)){B=document.getElementById(B)
}return Element.extend(B)
}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(F,A){var C=[];
var E=document.evaluate(F,$(A)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var B=0,D=E.snapshotLength;
B<D;
B++){C.push(Element.extend(E.snapshotItem(B)))
}return C
}
}if(!window.Node){var Node={}
}if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12})
}(function(){var A=this.Element;
this.Element=function(D,C){C=C||{};
D=D.toLowerCase();
var B=Element.cache;
if(Prototype.Browser.IE&&C.name){D="<"+D+' name="'+C.name+'">';
delete C.name;
return Element.writeAttribute(document.createElement(D),C)
}if(!B[D]){B[D]=Element.extend(document.createElement(D))
}return Element.writeAttribute(B[D].cloneNode(false),C)
};
Object.extend(this.Element,A||{})
}).call(window);
Element.cache={};
Element.Methods={visible:function(A){return $(A).style.display!="none"
},toggle:function(A){A=$(A);
Element[Element.visible(A)?"hide":"show"](A);
return A
},hide:function(A){$(A).style.display="none";
return A
},show:function(A){$(A).style.display="";
return A
},remove:function(A){A=$(A);
A.parentNode.removeChild(A);
return A
},update:function(A,B){A=$(A);
if(B&&B.toElement){B=B.toElement()
}if(Object.isElement(B)){return A.update().insert(B)
}B=Object.toHTML(B);
A.innerHTML=B.stripScripts();
B.evalScripts.bind(B).defer();
return A
},replace:function(B,C){B=$(B);
if(C&&C.toElement){C=C.toElement()
}else{if(!Object.isElement(C)){C=Object.toHTML(C);
var A=B.ownerDocument.createRange();
A.selectNode(B);
C.evalScripts.bind(C).defer();
C=A.createContextualFragment(C.stripScripts())
}}B.parentNode.replaceChild(C,B);
return B
},insert:function(C,E){C=$(C);
if(Object.isString(E)||Object.isNumber(E)||Object.isElement(E)||(E&&(E.toElement||E.toHTML))){E={bottom:E}
}var D,B,A;
for(position in E){D=E[position];
position=position.toLowerCase();
B=Element._insertionTranslations[position];
if(D&&D.toElement){D=D.toElement()
}if(Object.isElement(D)){B.insert(C,D);
continue
}D=Object.toHTML(D);
A=C.ownerDocument.createRange();
B.initializeRange(C,A);
B.insert(C,A.createContextualFragment(D.stripScripts()));
D.evalScripts.bind(D).defer()
}return C
},wrap:function(B,C,A){B=$(B);
if(Object.isElement(C)){$(C).writeAttribute(A||{})
}else{if(Object.isString(C)){C=new Element(C,A)
}else{C=new Element("div",C)
}}if(B.parentNode){B.parentNode.replaceChild(C,B)
}C.appendChild(B);
return C
},inspect:function(B){B=$(B);
var A="<"+B.tagName.toLowerCase();
$H({"id":"id","className":"class"}).each(function(F){var E=F.first(),C=F.last();
var D=(B[E]||"").toString();
if(D){A+=" "+C+"="+D.inspect(true)
}});
return A+">"
},recursivelyCollect:function(A,C){A=$(A);
var B=[];
while(A=A[C]){if(A.nodeType==1){B.push(Element.extend(A))
}}return B
},ancestors:function(A){return $(A).recursivelyCollect("parentNode")
},descendants:function(A){return $A($(A).getElementsByTagName("*")).each(Element.extend)
},firstDescendant:function(A){A=$(A).firstChild;
while(A&&A.nodeType!=1){A=A.nextSibling
}return $(A)
},immediateDescendants:function(A){if(!(A=$(A).firstChild)){return[]
}while(A&&A.nodeType!=1){A=A.nextSibling
}if(A){return[A].concat($(A).nextSiblings())
}return[]
},previousSiblings:function(A){return $(A).recursivelyCollect("previousSibling")
},nextSiblings:function(A){return $(A).recursivelyCollect("nextSibling")
},siblings:function(A){A=$(A);
return A.previousSiblings().reverse().concat(A.nextSiblings())
},match:function(B,A){if(Object.isString(A)){A=new Selector(A)
}return A.match($(B))
},up:function(B,D,A){B=$(B);
if(arguments.length==1){return $(B.parentNode)
}var C=B.ancestors();
return D?Selector.findElement(C,D,A):C[A||0]
},down:function(B,C,A){B=$(B);
if(arguments.length==1){return B.firstDescendant()
}var D=B.descendants();
return C?Selector.findElement(D,C,A):D[A||0]
},previous:function(B,D,A){B=$(B);
if(arguments.length==1){return $(Selector.handlers.previousElementSibling(B))
}var C=B.previousSiblings();
return D?Selector.findElement(C,D,A):C[A||0]
},next:function(C,D,B){C=$(C);
if(arguments.length==1){return $(Selector.handlers.nextElementSibling(C))
}var A=C.nextSiblings();
return D?Selector.findElement(A,D,B):A[B||0]
},select:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B,A)
},adjacent:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B.parentNode,A).without(B)
},identify:function(B){B=$(B);
var C=B.readAttribute("id"),A=arguments.callee;
if(C){return C
}do{C="anonymous_element_"+A.counter++
}while($(C));
B.writeAttribute("id",C);
return C
},readAttribute:function(C,A){C=$(C);
if(Prototype.Browser.IE){var B=Element._attributeTranslations.read;
if(B.values[A]){return B.values[A](C,A)
}if(B.names[A]){A=B.names[A]
}if(A.include(":")){return(!C.attributes||!C.attributes[A])?null:C.attributes[A].value
}}return C.getAttribute(A)
},writeAttribute:function(E,C,F){E=$(E);
var B={},D=Element._attributeTranslations.write;
if(typeof C=="object"){B=C
}else{B[C]=F===undefined?true:F
}for(var A in B){var C=D.names[A]||A,F=B[A];
if(D.values[A]){C=D.values[A](E,F)
}if(F===false||F===null){E.removeAttribute(C)
}else{if(F===true){E.setAttribute(C,C)
}else{E.setAttribute(C,F)
}}}return E
},getHeight:function(A){return $(A).getDimensions().height
},getWidth:function(A){return $(A).getDimensions().width
},classNames:function(A){return new Element.ClassNames(A)
},hasClassName:function(A,B){if(!(A=$(A))){return 
}var C=A.className;
return(C.length>0&&(C==B||new RegExp("(^|\\s)"+B+"(\\s|$)").test(C)))
},addClassName:function(A,B){if(!(A=$(A))){return 
}if(!A.hasClassName(B)){A.className+=(A.className?" ":"")+B
}return A
},removeClassName:function(A,B){if(!(A=$(A))){return 
}A.className=A.className.replace(new RegExp("(^|\\s+)"+B+"(\\s+|$)")," ").strip();
return A
},toggleClassName:function(A,B){if(!(A=$(A))){return 
}return A[A.hasClassName(B)?"removeClassName":"addClassName"](B)
},cleanWhitespace:function(B){B=$(B);
var C=B.firstChild;
while(C){var A=C.nextSibling;
if(C.nodeType==3&&!/\S/.test(C.nodeValue)){B.removeChild(C)
}C=A
}return B
},empty:function(A){return $(A).innerHTML.blank()
},descendantOf:function(D,C){D=$(D),C=$(C);
if(D.compareDocumentPosition){return(D.compareDocumentPosition(C)&8)===8
}if(D.sourceIndex&&!Prototype.Browser.Opera){var E=D.sourceIndex,B=C.sourceIndex,A=C.nextSibling;
if(!A){do{C=C.parentNode
}while(!(A=C.nextSibling)&&C.parentNode)
}if(A){return(E>B&&E<A.sourceIndex)
}}while(D=D.parentNode){if(D==C){return true
}}return false
},scrollTo:function(A){A=$(A);
var B=A.cumulativeOffset();
window.scrollTo(B[0],B[1]);
return A
},getStyle:function(B,C){B=$(B);
C=C=="float"?"cssFloat":C.camelize();
var D=B.style[C];
if(!D){var A=document.defaultView.getComputedStyle(B,null);
D=A?A[C]:null
}if(C=="opacity"){return D?parseFloat(D):1
}return D=="auto"?null:D
},getOpacity:function(A){return $(A).getStyle("opacity")
},setStyle:function(B,C){B=$(B);
var E=B.style,A;
if(Object.isString(C)){B.style.cssText+=";"+C;
return C.include("opacity")?B.setOpacity(C.match(/opacity:\s*(\d?\.?\d*)/)[1]):B
}for(var D in C){if(D=="opacity"){B.setOpacity(C[D])
}else{E[(D=="float"||D=="cssFloat")?(E.styleFloat===undefined?"cssFloat":"styleFloat"):D]=C[D]
}}return B
},setOpacity:function(A,B){A=$(A);
A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;
return A
},getDimensions:function(C){C=$(C);
var G=$(C).getStyle("display");
if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;
var F=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="block";
var H=C.clientWidth;
var E=C.clientHeight;
B.display=A;
B.position=D;
B.visibility=F;
return{width:H,height:E}
},makePositioned:function(A){A=$(A);
var B=Element.getStyle(A,"position");
if(B=="static"||!B){A._madePositioned=true;
A.style.position="relative";
if(window.opera){A.style.top=0;
A.style.left=0
}}return A
},undoPositioned:function(A){A=$(A);
if(A._madePositioned){A._madePositioned=undefined;
A.style.position=A.style.top=A.style.left=A.style.bottom=A.style.right=""
}return A
},makeClipping:function(A){A=$(A);
if(A._overflow){return A
}A._overflow=Element.getStyle(A,"overflow")||"auto";
if(A._overflow!=="hidden"){A.style.overflow="hidden"
}return A
},undoClipping:function(A){A=$(A);
if(!A._overflow){return A
}A.style.overflow=A._overflow=="auto"?"":A._overflow;
A._overflow=null;
return A
},cumulativeOffset:function(B){var A=0,C=0;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
B=B.offsetParent
}while(B);
return Element._returnOffset(C,A)
},positionedOffset:function(B){var A=0,D=0;
do{A+=B.offsetTop||0;
D+=B.offsetLeft||0;
B=B.offsetParent;
if(B){if(B.tagName=="BODY"){break
}var C=Element.getStyle(B,"position");
if(C=="relative"||C=="absolute"){break
}}}while(B);
return Element._returnOffset(D,A)
},absolutize:function(B){B=$(B);
if(B.getStyle("position")=="absolute"){return 
}var D=B.positionedOffset();
var F=D[1];
var E=D[0];
var C=B.clientWidth;
var A=B.clientHeight;
B._originalLeft=E-parseFloat(B.style.left||0);
B._originalTop=F-parseFloat(B.style.top||0);
B._originalWidth=B.style.width;
B._originalHeight=B.style.height;
B.style.position="absolute";
B.style.top=F+"px";
B.style.left=E+"px";
B.style.width=C+"px";
B.style.height=A+"px";
return B
},relativize:function(A){A=$(A);
if(A.getStyle("position")=="relative"){return 
}A.style.position="relative";
var C=parseFloat(A.style.top||0)-(A._originalTop||0);
var B=parseFloat(A.style.left||0)-(A._originalLeft||0);
A.style.top=C+"px";
A.style.left=B+"px";
A.style.height=A._originalHeight;
A.style.width=A._originalWidth;
return A
},cumulativeScrollOffset:function(B){var A=0,C=0;
do{A+=B.scrollTop||0;
C+=B.scrollLeft||0;
B=B.parentNode
}while(B);
return Element._returnOffset(C,A)
},getOffsetParent:function(A){if(A.offsetParent){return $(A.offsetParent)
}if(A==document.body){return $(A)
}while((A=A.parentNode)&&A!=document.body){if(Element.getStyle(A,"position")!="static"){return $(A)
}}return $(document.body)
},viewportOffset:function(D){var A=0,C=0;
var B=D;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
if(B.offsetParent==document.body&&Element.getStyle(B,"position")=="absolute"){break
}}while(B=B.offsetParent);
B=D;
do{if(!Prototype.Browser.Opera||B.tagName=="BODY"){A-=B.scrollTop||0;
C-=B.scrollLeft||0
}}while(B=B.parentNode);
return Element._returnOffset(C,A)
},clonePosition:function(B,D){var A=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});
D=$(D);
var E=D.viewportOffset();
B=$(B);
var F=[0,0];
var C=null;
if(Element.getStyle(B,"position")=="absolute"){C=B.getOffsetParent();
F=C.viewportOffset()
}if(C==document.body){F[0]-=document.body.offsetLeft;
F[1]-=document.body.offsetTop
}if(A.setLeft){B.style.left=(E[0]-F[0]+A.offsetLeft)+"px"
}if(A.setTop){B.style.top=(E[1]-F[1]+A.offsetTop)+"px"
}if(A.setWidth){B.style.width=D.offsetWidth+"px"
}if(A.setHeight){B.style.height=D.offsetHeight+"px"
}return B
}};
Element.Methods.identify.counter=1;
Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});
Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}};
if(!document.createRange||Prototype.Browser.Opera){Element.Methods.insert=function(E,G){E=$(E);
if(Object.isString(G)||Object.isNumber(G)||Object.isElement(G)||(G&&(G.toElement||G.toHTML))){G={bottom:G}
}var D=Element._insertionTranslations,F,B,H,C;
for(B in G){F=G[B];
B=B.toLowerCase();
H=D[B];
if(F&&F.toElement){F=F.toElement()
}if(Object.isElement(F)){H.insert(E,F);
continue
}F=Object.toHTML(F);
C=((B=="before"||B=="after")?E.parentNode:E).tagName.toUpperCase();
if(D.tags[C]){var A=Element._getContentFromAnonymousElement(C,F.stripScripts());
if(B=="top"||B=="after"){A.reverse()
}A.each(H.insert.curry(E))
}else{E.insertAdjacentHTML(H.adjacency,F.stripScripts())
}F.evalScripts.bind(F).defer()
}return E
}
}if(Prototype.Browser.Opera){Element.Methods._getStyle=Element.Methods.getStyle;
Element.Methods.getStyle=function(A,B){switch(B){case"left":case"top":case"right":case"bottom":if(Element._getStyle(A,"position")=="static"){return null
}default:return Element._getStyle(A,B)
}};
Element.Methods._readAttribute=Element.Methods.readAttribute;
Element.Methods.readAttribute=function(A,B){if(B=="title"){return A.title
}return Element._readAttribute(A,B)
}
}else{if(Prototype.Browser.IE){$w("positionedOffset getOffsetParent viewportOffset").each(function(A){Element.Methods[A]=Element.Methods[A].wrap(function(D,C){C=$(C);
var B=C.getStyle("position");
if(B!="static"){return D(C)
}C.setStyle({position:"relative"});
var E=D(C);
C.setStyle({position:B});
return E
})
});
Element.Methods.getStyle=function(A,B){A=$(A);
B=(B=="float"||B=="cssFloat")?"styleFloat":B.camelize();
var C=A.style[B];
if(!C&&A.currentStyle){C=A.currentStyle[B]
}if(B=="opacity"){if(C=(A.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){if(C[1]){return parseFloat(C[1])/100
}}return 1
}if(C=="auto"){if((B=="width"||B=="height")&&(A.getStyle("display")!="none")){return A["offset"+B.capitalize()]+"px"
}return null
}return C
};
Element.Methods.setOpacity=function(B,E){function F(G){return G.replace(/alpha\([^\)]*\)/gi,"")
}B=$(B);
var A=B.currentStyle;
if((A&&!A.hasLayout)||(!A&&B.style.zoom=="normal")){B.style.zoom=1
}var D=B.getStyle("filter"),C=B.style;
if(E==1||E===""){(D=F(D))?C.filter=D:C.removeAttribute("filter");
return B
}else{if(E<0.00001){E=0
}}C.filter=F(D)+"alpha(opacity="+(E*100)+")";
return B
};
Element._attributeTranslations={read:{names:{"class":"className","for":"htmlFor"},values:{_getAttr:function(A,B){return A.getAttribute(B,2)
},_getAttrNode:function(A,C){var B=A.getAttributeNode(C);
return B?B.value:""
},_getEv:function(A,B){var B=A.getAttribute(B);
return B?B.toString().slice(23,-2):null
},_flag:function(A,B){return $(A).hasAttribute(B)?B:null
},style:function(A){return A.style.cssText.toLowerCase()
},title:function(A){return A.title
}}}};
Element._attributeTranslations.write={names:Object.clone(Element._attributeTranslations.read.names),values:{checked:function(A,B){A.checked=!!B
},style:function(A,B){A.style.cssText=B?B:""
}}};
Element._attributeTranslations.has={};
$w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc").each(function(A){Element._attributeTranslations.write.names[A.toLowerCase()]=A;
Element._attributeTranslations.has[A.toLowerCase()]=A
});
(function(A){Object.extend(A,{href:A._getAttr,src:A._getAttr,type:A._getAttr,action:A._getAttrNode,disabled:A._flag,checked:A._flag,readonly:A._flag,multiple:A._flag,onload:A._getEv,onunload:A._getEv,onclick:A._getEv,ondblclick:A._getEv,onmousedown:A._getEv,onmouseup:A._getEv,onmouseover:A._getEv,onmousemove:A._getEv,onmouseout:A._getEv,onfocus:A._getEv,onblur:A._getEv,onkeypress:A._getEv,onkeydown:A._getEv,onkeyup:A._getEv,onsubmit:A._getEv,onreset:A._getEv,onselect:A._getEv,onchange:A._getEv})
})(Element._attributeTranslations.read.values)
}else{if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1)?0.999999:(B==="")?"":(B<0.00001)?0:B;
return A
}
}else{if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;
if(B==1){if(A.tagName=="IMG"&&A.width){A.width++;
A.width--
}else{try{var D=document.createTextNode(" ");
A.appendChild(D);
A.removeChild(D)
}catch(C){}}}return A
};
Element.Methods.cumulativeOffset=function(B){var A=0,C=0;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
if(B.offsetParent==document.body){if(Element.getStyle(B,"position")=="absolute"){break
}}B=B.offsetParent
}while(B);
return Element._returnOffset(C,A)
}
}}}}if(Prototype.Browser.IE||Prototype.Browser.Opera){Element.Methods.update=function(B,C){B=$(B);
if(C&&C.toElement){C=C.toElement()
}if(Object.isElement(C)){return B.update().insert(C)
}C=Object.toHTML(C);
var A=B.tagName.toUpperCase();
if(A in Element._insertionTranslations.tags){$A(B.childNodes).each(function(D){B.removeChild(D)
});
Element._getContentFromAnonymousElement(A,C.stripScripts()).each(function(D){B.appendChild(D)
})
}else{B.innerHTML=C.stripScripts()
}C.evalScripts.bind(C).defer();
return B
}
}if(document.createElement("div").outerHTML){Element.Methods.replace=function(C,E){C=$(C);
if(E&&E.toElement){E=E.toElement()
}if(Object.isElement(E)){C.parentNode.replaceChild(E,C);
return C
}E=Object.toHTML(E);
var D=C.parentNode,B=D.tagName.toUpperCase();
if(Element._insertionTranslations.tags[B]){var F=C.next();
var A=Element._getContentFromAnonymousElement(B,E.stripScripts());
D.removeChild(C);
if(F){A.each(function(G){D.insertBefore(G,F)
})
}else{A.each(function(G){D.appendChild(G)
})
}}else{C.outerHTML=E.stripScripts()
}E.evalScripts.bind(E).defer();
return C
}
}Element._returnOffset=function(B,C){var A=[B,C];
A.left=B;
A.top=C;
return A
};
Element._getContentFromAnonymousElement=function(C,B){var D=new Element("div"),A=Element._insertionTranslations.tags[C];
D.innerHTML=A[0]+B+A[1];
A[2].times(function(){D=D.firstChild
});
return $A(D.childNodes)
};
Element._insertionTranslations={before:{adjacency:"beforeBegin",insert:function(A,B){A.parentNode.insertBefore(B,A)
},initializeRange:function(B,A){A.setStartBefore(B)
}},top:{adjacency:"afterBegin",insert:function(A,B){A.insertBefore(B,A.firstChild)
},initializeRange:function(B,A){A.selectNodeContents(B);
A.collapse(true)
}},bottom:{adjacency:"beforeEnd",insert:function(A,B){A.appendChild(B)
}},after:{adjacency:"afterEnd",insert:function(A,B){A.parentNode.insertBefore(B,A.nextSibling)
},initializeRange:function(B,A){A.setStartAfter(B)
}},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};
(function(){this.bottom.initializeRange=this.top.initializeRange;
Object.extend(this.tags,{THEAD:this.tags.TBODY,TFOOT:this.tags.TBODY,TH:this.tags.TD})
}).call(Element._insertionTranslations);
Element.Methods.Simulated={hasAttribute:function(A,C){C=Element._attributeTranslations.has[C]||C;
var B=$(A).getAttributeNode(C);
return B&&B.specified
}};
Element.Methods.ByTag={};
Object.extend(Element,Element.Methods);
if(!Prototype.BrowserFeatures.ElementExtensions&&document.createElement("div").__proto__){window.HTMLElement={};
window.HTMLElement.prototype=document.createElement("div").__proto__;
Prototype.BrowserFeatures.ElementExtensions=true
}Element.extend=(function(){if(Prototype.BrowserFeatures.SpecificElementExtensions){return Prototype.K
}var A={},B=Element.Methods.ByTag;
var C=Object.extend(function(F){if(!F||F._extendedByPrototype||F.nodeType!=1||F==window){return F
}var D=Object.clone(A),E=F.tagName,H,G;
if(B[E]){Object.extend(D,B[E])
}for(H in D){G=D[H];
if(Object.isFunction(G)&&!(H in F)){F[H]=G.methodize()
}}F._extendedByPrototype=Prototype.emptyFunction;
return F
},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(A,Element.Methods);
Object.extend(A,Element.Methods.Simulated)
}}});
C.refresh();
return C
})();
Element.hasAttribute=function(A,B){if(A.hasAttribute){return A.hasAttribute(B)
}return Element.Methods.Simulated.hasAttribute(A,B)
};
Element.addMethods=function(C){var I=Prototype.BrowserFeatures,D=Element.Methods.ByTag;
if(!C){Object.extend(Form,Form.Methods);
Object.extend(Form.Element,Form.Element.Methods);
Object.extend(Element.Methods.ByTag,{"FORM":Object.clone(Form.Methods),"INPUT":Object.clone(Form.Element.Methods),"SELECT":Object.clone(Form.Element.Methods),"TEXTAREA":Object.clone(Form.Element.Methods)})
}if(arguments.length==2){var B=C;
C=arguments[1]
}if(!B){Object.extend(Element.Methods,C||{})
}else{if(Object.isArray(B)){B.each(H)
}else{H(B)
}}function H(F){F=F.toUpperCase();
if(!Element.Methods.ByTag[F]){Element.Methods.ByTag[F]={}
}Object.extend(Element.Methods.ByTag[F],C)
}function A(L,K,F){F=F||false;
for(var N in L){var M=L[N];
if(!Object.isFunction(M)){continue
}if(!F||!(N in K)){K[N]=M.methodize()
}}}function E(L){var F;
var K={"OPTGROUP":"OptGroup","TEXTAREA":"TextArea","P":"Paragraph","FIELDSET":"FieldSet","UL":"UList","OL":"OList","DL":"DList","DIR":"Directory","H1":"Heading","H2":"Heading","H3":"Heading","H4":"Heading","H5":"Heading","H6":"Heading","Q":"Quote","INS":"Mod","DEL":"Mod","A":"Anchor","IMG":"Image","CAPTION":"TableCaption","COL":"TableCol","COLGROUP":"TableCol","THEAD":"TableSection","TFOOT":"TableSection","TBODY":"TableSection","TR":"TableRow","TH":"TableCell","TD":"TableCell","FRAMESET":"FrameSet","IFRAME":"IFrame"};
if(K[L]){F="HTML"+K[L]+"Element"
}if(window[F]){return window[F]
}F="HTML"+L+"Element";
if(window[F]){return window[F]
}F="HTML"+L.capitalize()+"Element";
if(window[F]){return window[F]
}window[F]={};
window[F].prototype=document.createElement(L).__proto__;
return window[F]
}if(I.ElementExtensions){A(Element.Methods,HTMLElement.prototype);
A(Element.Methods.Simulated,HTMLElement.prototype,true)
}if(I.SpecificElementExtensions){for(var J in Element.Methods.ByTag){var G=E(J);
if(Object.isUndefined(G)){continue
}A(D[J],G.prototype)
}}Object.extend(Element,Element.Methods);
delete Element.ByTag;
if(Element.extend.refresh){Element.extend.refresh()
}Element.cache={}
};
document.viewport={getDimensions:function(){var A={};
$w("width height").each(function(C){var B=C.capitalize();
A[C]=self["inner"+B]||(document.documentElement["client"+B]||document.body["client"+B])
});
return A
},getWidth:function(){return this.getDimensions().width
},getHeight:function(){return this.getDimensions().height
},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)
}};
var Selector=Class.create({initialize:function(A){this.expression=A.strip();
this.compileMatcher()
},compileMatcher:function(){if(Prototype.BrowserFeatures.XPath&&!(/(\[[\w-]*?:|:checked)/).test(this.expression)){return this.compileXPathMatcher()
}var e=this.expression,ps=Selector.patterns,h=Selector.handlers,c=Selector.criteria,le,p,m;
if(Selector._cache[e]){this.matcher=Selector._cache[e];
return 
}this.matcher=["this.matcher = function(root) {","var r = root, h = Selector.handlers, c = false, n;"];
while(e&&le!=e&&(/\S/).test(e)){le=e;
for(var i in ps){p=ps[i];
if(m=e.match(p)){this.matcher.push(Object.isFunction(c[i])?c[i](m):new Template(c[i]).evaluate(m));
e=e.replace(m[0],"");
break
}}}this.matcher.push("return h.unique(n);\n}");
eval(this.matcher.join("\n"));
Selector._cache[this.expression]=this.matcher
},compileXPathMatcher:function(){var E=this.expression,F=Selector.patterns,B=Selector.xpath,D,A;
if(Selector._cache[E]){this.xpath=Selector._cache[E];
return 
}this.matcher=[".//*"];
while(E&&D!=E&&(/\S/).test(E)){D=E;
for(var C in F){if(A=E.match(F[C])){this.matcher.push(Object.isFunction(B[C])?B[C](A):new Template(B[C]).evaluate(A));
E=E.replace(A[0],"");
break
}}}this.xpath=this.matcher.join("");
Selector._cache[this.expression]=this.xpath
},findElements:function(A){A=A||document;
if(this.xpath){return document._getElementsByXPath(this.xpath,A)
}return this.matcher(A)
},match:function(H){this.tokens=[];
var L=this.expression,A=Selector.patterns,E=Selector.assertions;
var B,D,F;
while(L&&B!==L&&(/\S/).test(L)){B=L;
for(var I in A){D=A[I];
if(F=L.match(D)){if(E[I]){this.tokens.push([I,Object.clone(F)]);
L=L.replace(F[0],"")
}else{return this.findElements(document).include(H)
}}}}var K=true,C,J;
for(var I=0,G;
G=this.tokens[I];
I++){C=G[0],J=G[1];
if(!Selector.assertions[C](H,J)){K=false;
break
}}return K
},toString:function(){return this.expression
},inspect:function(){return"#<Selector:"+this.expression.inspect()+">"
}});
Object.extend(Selector,{_cache:{},xpath:{descendant:"//*",child:"/*",adjacent:"/following-sibling::*[1]",laterSibling:"/following-sibling::*",tagName:function(A){if(A[1]=="*"){return""
}return"[local-name()='"+A[1].toLowerCase()+"' or local-name()='"+A[1].toUpperCase()+"']"
},className:"[contains(concat(' ', @class, ' '), ' #{1} ')]",id:"[@id='#{1}']",attrPresence:"[@#{1}]",attr:function(A){A[3]=A[5]||A[6];
return new Template(Selector.xpath.operators[A[2]]).evaluate(A)
},pseudo:function(A){var B=Selector.xpath.pseudos[A[1]];
if(!B){return""
}if(Object.isFunction(B)){return B(A)
}return new Template(Selector.xpath.pseudos[A[1]]).evaluate(A)
},operators:{"=":"[@#{1}='#{3}']","!=":"[@#{1}!='#{3}']","^=":"[starts-with(@#{1}, '#{3}')]","$=":"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']","*=":"[contains(@#{1}, '#{3}')]","~=":"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]","|=":"[contains(concat('-', @#{1}, '-'), '-#{3}-')]"},pseudos:{"first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","only-child":"[not(preceding-sibling::* or following-sibling::*)]","empty":"[count(*) = 0 and (count(text()) = 0 or translate(text(), ' \t\r\n', '') = '')]","checked":"[@checked]","disabled":"[@disabled]","enabled":"[not(@disabled)]","not":function(B){var H=B[6],G=Selector.patterns,A=Selector.xpath,E,B,C;
var F=[];
while(H&&E!=H&&(/\S/).test(H)){E=H;
for(var D in G){if(B=H.match(G[D])){C=Object.isFunction(A[D])?A[D](B):new Template(A[D]).evaluate(B);
F.push("("+C.substring(1,C.length-1)+")");
H=H.replace(B[0],"");
break
}}}return"[not("+F.join(" and ")+")]"
},"nth-child":function(A){return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ",A)
},"nth-last-child":function(A){return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ",A)
},"nth-of-type":function(A){return Selector.xpath.pseudos.nth("position() ",A)
},"nth-last-of-type":function(A){return Selector.xpath.pseudos.nth("(last() + 1 - position()) ",A)
},"first-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-of-type"](A)
},"last-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-last-of-type"](A)
},"only-of-type":function(A){var B=Selector.xpath.pseudos;
return B["first-of-type"](A)+B["last-of-type"](A)
},nth:function(E,C){var F,G=C[6],B;
if(G=="even"){G="2n+0"
}if(G=="odd"){G="2n+1"
}if(F=G.match(/^(\d+)$/)){return"["+E+"= "+F[1]+"]"
}if(F=G.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(F[1]=="-"){F[1]=-1
}var D=F[1]?Number(F[1]):1;
var A=F[2]?Number(F[2]):0;
B="[((#{fragment} - #{b}) mod #{a} = 0) and ((#{fragment} - #{b}) div #{a} >= 0)]";
return new Template(B).evaluate({fragment:E,a:D,b:A})
}}}},criteria:{tagName:'n = h.tagName(n, r, "#{1}", c);   c = false;',className:'n = h.className(n, r, "#{1}", c); c = false;',id:'n = h.id(n, r, "#{1}", c);        c = false;',attrPresence:'n = h.attrPresence(n, r, "#{1}"); c = false;',attr:function(A){A[3]=(A[5]||A[6]);
return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}"); c = false;').evaluate(A)
},pseudo:function(A){if(A[6]){A[6]=A[6].replace(/"/g,'\\"')
}return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(A)
},descendant:'c = "descendant";',child:'c = "child";',adjacent:'c = "adjacent";',laterSibling:'c = "laterSibling";'},patterns:{laterSibling:/^\s*~\s*/,child:/^\s*>\s*/,adjacent:/^\s*\+\s*/,descendant:/^\s/,tagName:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/,pseudo:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s)|(?=:))/,attrPresence:/^\[([\w]+)\]/,attr:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/},assertions:{tagName:function(A,B){return B[1].toUpperCase()==A.tagName.toUpperCase()
},className:function(A,B){return Element.hasClassName(A,B[1])
},id:function(A,B){return A.id===B[1]
},attrPresence:function(A,B){return Element.hasAttribute(A,B[1])
},attr:function(B,C){var A=Element.readAttribute(B,C[1]);
return Selector.operators[C[2]](A,C[3])
}},handlers:{concat:function(B,A){for(var C=0,D;
D=A[C];
C++){B.push(D)
}return B
},mark:function(A){for(var B=0,C;
C=A[B];
B++){C._counted=true
}return A
},unmark:function(A){for(var B=0,C;
C=A[B];
B++){C._counted=undefined
}return A
},index:function(A,D,G){A._counted=true;
if(D){for(var B=A.childNodes,E=B.length-1,C=1;
E>=0;
E--){var F=B[E];
if(F.nodeType==1&&(!G||F._counted)){F.nodeIndex=C++
}}}else{for(var E=0,C=1,B=A.childNodes;
F=B[E];
E++){if(F.nodeType==1&&(!G||F._counted)){F.nodeIndex=C++
}}}},unique:function(B){if(B.length==0){return B
}var D=[],E;
for(var C=0,A=B.length;
C<A;
C++){if(!(E=B[C])._counted){E._counted=true;
D.push(Element.extend(E))
}}return Selector.handlers.unmark(D)
},descendant:function(A){var D=Selector.handlers;
for(var C=0,B=[],E;
E=A[C];
C++){D.concat(B,E.getElementsByTagName("*"))
}return B
},child:function(A){var F=Selector.handlers;
for(var E=0,D=[],G;
G=A[E];
E++){for(var B=0,C=[],H;
H=G.childNodes[B];
B++){if(H.nodeType==1&&H.tagName!="!"){D.push(H)
}}}return D
},adjacent:function(A){for(var C=0,B=[],E;
E=A[C];
C++){var D=this.nextElementSibling(E);
if(D){B.push(D)
}}return B
},laterSibling:function(A){var D=Selector.handlers;
for(var C=0,B=[],E;
E=A[C];
C++){D.concat(B,Element.nextSiblings(E))
}return B
},nextElementSibling:function(A){while(A=A.nextSibling){if(A.nodeType==1){return A
}}return null
},previousElementSibling:function(A){while(A=A.previousSibling){if(A.nodeType==1){return A
}}return null
},tagName:function(B,A,E,H){E=E.toUpperCase();
var D=[],F=Selector.handlers;
if(B){if(H){if(H=="descendant"){for(var C=0,G;
G=B[C];
C++){F.concat(D,G.getElementsByTagName(E))
}return D
}else{B=this[H](B)
}if(E=="*"){return B
}}for(var C=0,G;
G=B[C];
C++){if(G.tagName.toUpperCase()==E){D.push(G)
}}return D
}else{return A.getElementsByTagName(E)
}},id:function(B,A,H,F){var G=$(H),D=Selector.handlers;
if(!G){return[]
}if(!B&&A==document){return[G]
}if(B){if(F){if(F=="child"){for(var C=0,E;
E=B[C];
C++){if(G.parentNode==E){return[G]
}}}else{if(F=="descendant"){for(var C=0,E;
E=B[C];
C++){if(Element.descendantOf(G,E)){return[G]
}}}else{if(F=="adjacent"){for(var C=0,E;
E=B[C];
C++){if(Selector.handlers.previousElementSibling(G)==E){return[G]
}}}else{B=D[F](B)
}}}}for(var C=0,E;
E=B[C];
C++){if(E==G){return[G]
}}return[]
}return(G&&Element.descendantOf(G,A))?[G]:[]
},className:function(B,A,C,D){if(B&&D){B=this[D](B)
}return Selector.handlers.byClassName(B,A,C)
},byClassName:function(C,B,F){if(!C){C=Selector.handlers.descendant([B])
}var H=" "+F+" ";
for(var E=0,D=[],G,A;
G=C[E];
E++){A=G.className;
if(A.length==0){continue
}if(A==F||(" "+A+" ").include(H)){D.push(G)
}}return D
},attrPresence:function(C,B,A){if(!C){C=B.getElementsByTagName("*")
}var E=[];
for(var D=0,F;
F=C[D];
D++){if(Element.hasAttribute(F,A)){E.push(F)
}}return E
},attr:function(A,H,G,I,B){if(!A){A=H.getElementsByTagName("*")
}var J=Selector.operators[B],D=[];
for(var E=0,C;
C=A[E];
E++){var F=Element.readAttribute(C,G);
if(F===null){continue
}if(J(F,I)){D.push(C)
}}return D
},pseudo:function(B,C,E,A,D){if(B&&D){B=this[D](B)
}if(!B){B=A.getElementsByTagName("*")
}return Selector.pseudos[C](B,E,A)
}},pseudos:{"first-child":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(Selector.handlers.previousElementSibling(E)){continue
}C.push(E)
}return C
},"last-child":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(Selector.handlers.nextElementSibling(E)){continue
}C.push(E)
}return C
},"only-child":function(B,G,A){var E=Selector.handlers;
for(var D=0,C=[],F;
F=B[D];
D++){if(!E.previousElementSibling(F)&&!E.nextElementSibling(F)){C.push(F)
}}return C
},"nth-child":function(B,C,A){return Selector.pseudos.nth(B,C,A)
},"nth-last-child":function(B,C,A){return Selector.pseudos.nth(B,C,A,true)
},"nth-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,false,true)
},"nth-last-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,true,true)
},"first-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,false,true)
},"last-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,true,true)
},"only-of-type":function(B,D,A){var C=Selector.pseudos;
return C["last-of-type"](C["first-of-type"](B,D,A),D,A)
},getIndices:function(B,A,C){if(B==0){return A>0?[A]:[]
}return $R(1,C).inject([],function(D,E){if(0==(E-A)%B&&(E-A)/B>=0){D.push(E)
}return D
})
},nth:function(A,L,N,K,C){if(A.length==0){return[]
}if(L=="even"){L="2n+0"
}if(L=="odd"){L="2n+1"
}var J=Selector.handlers,I=[],B=[],E;
J.mark(A);
for(var H=0,D;
D=A[H];
H++){if(!D.parentNode._counted){J.index(D.parentNode,K,C);
B.push(D.parentNode)
}}if(L.match(/^\d+$/)){L=Number(L);
for(var H=0,D;
D=A[H];
H++){if(D.nodeIndex==L){I.push(D)
}}}else{if(E=L.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(E[1]=="-"){E[1]=-1
}var O=E[1]?Number(E[1]):1;
var M=E[2]?Number(E[2]):0;
var P=Selector.pseudos.getIndices(O,M,A.length);
for(var H=0,D,F=P.length;
D=A[H];
H++){for(var G=0;
G<F;
G++){if(D.nodeIndex==P[G]){I.push(D)
}}}}}J.unmark(A);
J.unmark(B);
return I
},"empty":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.tagName=="!"||(E.firstChild&&!E.innerHTML.match(/^\s*$/))){continue
}C.push(E)
}return C
},"not":function(A,D,I){var G=Selector.handlers,J,C;
var H=new Selector(D).findElements(I);
G.mark(H);
for(var F=0,E=[],B;
B=A[F];
F++){if(!B._counted){E.push(B)
}}G.unmark(H);
return E
},"enabled":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(!E.disabled){C.push(E)
}}return C
},"disabled":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.disabled){C.push(E)
}}return C
},"checked":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.checked){C.push(E)
}}return C
}},operators:{"=":function(B,A){return B==A
},"!=":function(B,A){return B!=A
},"^=":function(B,A){return B.startsWith(A)
},"$=":function(B,A){return B.endsWith(A)
},"*=":function(B,A){return B.include(A)
},"~=":function(B,A){return(" "+B+" ").include(" "+A+" ")
},"|=":function(B,A){return("-"+B.toUpperCase()+"-").include("-"+A.toUpperCase()+"-")
}},matchElements:function(F,G){var E=new Selector(G).findElements(),D=Selector.handlers;
D.mark(E);
for(var C=0,B=[],A;
A=F[C];
C++){if(A._counted){B.push(A)
}}D.unmark(E);
return B
},findElement:function(B,C,A){if(Object.isNumber(C)){A=C;
C=false
}return Selector.matchElements(B,C||"*")[A||0]
},findChildElements:function(E,G){var H=G.join(","),G=[];
H.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/,function(I){G.push(I[1].strip())
});
var D=[],F=Selector.handlers;
for(var C=0,B=G.length,A;
C<B;
C++){A=new Selector(G[C].strip());
F.concat(D,A.findElements(E))
}return(B>1)?F.unique(D):D
}});
function $$(){return Selector.findChildElements(document,$A(arguments))
}var Form={reset:function(A){$(A).reset();
return A
},serializeElements:function(G,B){if(typeof B!="object"){B={hash:!!B}
}else{if(B.hash===undefined){B.hash=true
}}var C,F,A=false,E=B.submit;
var D=G.inject({},function(H,I){if(!I.disabled&&I.name){C=I.name;
F=$(I).getValue();
if(F!=null&&(I.type!="submit"||(!A&&E!==false&&(!E||C==E)&&(A=true)))){if(C in H){if(!Object.isArray(H[C])){H[C]=[H[C]]
}H[C].push(F)
}else{H[C]=F
}}}return H
});
return B.hash?D:Object.toQueryString(D)
}};
Form.Methods={serialize:function(B,A){return Form.serializeElements(Form.getElements(B),A)
},getElements:function(A){return $A($(A).getElementsByTagName("*")).inject([],function(B,C){if(Form.Element.Serializers[C.tagName.toLowerCase()]){B.push(Element.extend(C))
}return B
})
},getInputs:function(G,C,D){G=$(G);
var A=G.getElementsByTagName("input");
if(!C&&!D){return $A(A).map(Element.extend)
}for(var E=0,H=[],F=A.length;
E<F;
E++){var B=A[E];
if((C&&B.type!=C)||(D&&B.name!=D)){continue
}H.push(Element.extend(B))
}return H
},disable:function(A){A=$(A);
Form.getElements(A).invoke("disable");
return A
},enable:function(A){A=$(A);
Form.getElements(A).invoke("enable");
return A
},findFirstElement:function(B){var C=$(B).getElements().findAll(function(D){return"hidden"!=D.type&&!D.disabled
});
var A=C.findAll(function(D){return D.hasAttribute("tabIndex")&&D.tabIndex>=0
}).sortBy(function(D){return D.tabIndex
}).first();
return A?A:C.find(function(D){return["input","select","textarea"].include(D.tagName.toLowerCase())
})
},focusFirstElement:function(A){A=$(A);
A.findFirstElement().activate();
return A
},request:function(B,A){B=$(B),A=Object.clone(A||{});
var D=A.parameters,C=B.readAttribute("action")||"";
if(C.blank()){C=window.location.href
}A.parameters=B.serialize(true);
if(D){if(Object.isString(D)){D=D.toQueryParams()
}Object.extend(A.parameters,D)
}if(B.hasAttribute("method")&&!A.method){A.method=B.method
}return new Ajax.Request(C,A)
}};
Form.Element={focus:function(A){$(A).focus();
return A
},select:function(A){$(A).select();
return A
}};
Form.Element.Methods={serialize:function(A){A=$(A);
if(!A.disabled&&A.name){var B=A.getValue();
if(B!=undefined){var C={};
C[A.name]=B;
return Object.toQueryString(C)
}}return""
},getValue:function(A){A=$(A);
var B=A.tagName.toLowerCase();
return Form.Element.Serializers[B](A)
},setValue:function(A,B){A=$(A);
var C=A.tagName.toLowerCase();
Form.Element.Serializers[C](A,B);
return A
},clear:function(A){$(A).value="";
return A
},present:function(A){return $(A).value!=""
},activate:function(A){A=$(A);
try{A.focus();
if(A.select&&(A.tagName.toLowerCase()!="input"||!["button","reset","submit"].include(A.type))){A.select()
}}catch(B){}return A
},disable:function(A){A=$(A);
A.blur();
A.disabled=true;
return A
},enable:function(A){A=$(A);
A.disabled=false;
return A
}};
var Field=Form.Element;
var $F=Form.Element.Methods.getValue;
Form.Element.Serializers={input:function(A,B){switch(A.type.toLowerCase()){case"checkbox":case"radio":return Form.Element.Serializers.inputSelector(A,B);
default:return Form.Element.Serializers.textarea(A,B)
}},inputSelector:function(A,B){if(B===undefined){return A.checked?A.value:null
}else{A.checked=!!B
}},textarea:function(A,B){if(B===undefined){return A.value
}else{A.value=B
}},select:function(D,A){if(A===undefined){return this[D.type=="select-one"?"selectOne":"selectMany"](D)
}else{var C,F,G=!Object.isArray(A);
for(var B=0,E=D.length;
B<E;
B++){C=D.options[B];
F=this.optionValue(C);
if(G){if(F==A){C.selected=true;
return 
}}else{C.selected=A.include(F)
}}}},selectOne:function(B){var A=B.selectedIndex;
return A>=0?this.optionValue(B.options[A]):null
},selectMany:function(D){var A,E=D.length;
if(!E){return null
}for(var C=0,A=[];
C<E;
C++){var B=D.options[C];
if(B.selected){A.push(this.optionValue(B))
}}return A
},optionValue:function(A){return Element.extend(A).hasAttribute("value")?A.value:A.text
}};
Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($super,A,B,C){$super(C,B);
this.element=$(A);
this.lastValue=this.getValue()
},execute:function(){var A=this.getValue();
if(Object.isString(this.lastValue)&&Object.isString(A)?this.lastValue!=A:String(this.lastValue)!=String(A)){this.callback(this.element,A);
this.lastValue=A
}}});
Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element)
}});
Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element)
}});
Abstract.EventObserver=Class.create({initialize:function(A,B){this.element=$(A);
this.callback=B;
this.lastValue=this.getValue();
if(this.element.tagName.toLowerCase()=="form"){this.registerFormCallbacks()
}else{this.registerCallback(this.element)
}},onElementEvent:function(){var A=this.getValue();
if(this.lastValue!=A){this.callback(this.element,A);
this.lastValue=A
}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this)
},registerCallback:function(A){if(A.type){switch(A.type.toLowerCase()){case"checkbox":case"radio":Event.observe(A,"click",this.onElementEvent.bind(this));
break;
default:Event.observe(A,"change",this.onElementEvent.bind(this));
break
}}}});
Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element)
}});
Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element)
}});
if(!window.Event){var Event={}
}Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{},relatedTarget:function(B){var A;
switch(B.type){case"mouseover":A=B.fromElement;
break;
case"mouseout":A=B.toElement;
break;
default:return null
}return Element.extend(A)
}});
Event.Methods=(function(){var A;
if(Prototype.Browser.IE){var B={0:1,1:4,2:2};
A=function(D,C){return D.button==B[C]
}
}else{if(Prototype.Browser.WebKit){A=function(D,C){switch(C){case 0:return D.which==1&&!D.metaKey;
case 1:return D.which==1&&D.metaKey;
default:return false
}}
}else{A=function(D,C){return D.which?(D.which===C+1):(D.button===C)
}
}}return{isLeftClick:function(C){return A(C,0)
},isMiddleClick:function(C){return A(C,1)
},isRightClick:function(C){return A(C,2)
},element:function(D){var C=Event.extend(D).target;
return Element.extend(C.nodeType==Node.TEXT_NODE?C.parentNode:C)
},findElement:function(D,E){var C=Event.element(D);
return C.match(E)?C:C.up(E)
},pointer:function(C){return{x:C.pageX||(C.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)),y:C.pageY||(C.clientY+(document.documentElement.scrollTop||document.body.scrollTop))}
},pointerX:function(C){return Event.pointer(C).x
},pointerY:function(C){return Event.pointer(C).y
},stop:function(C){Event.extend(C);
C.preventDefault();
C.stopPropagation();
C.stopped=true
}}
})();
Event.extend=(function(){var A=Object.keys(Event.Methods).inject({},function(B,C){B[C]=Event.Methods[C].methodize();
return B
});
if(Prototype.Browser.IE){Object.extend(A,{stopPropagation:function(){this.cancelBubble=true
},preventDefault:function(){this.returnValue=false
},inspect:function(){return"[object Event]"
}});
return function(B){if(!B){return false
}if(B._extendedByPrototype){return B
}B._extendedByPrototype=Prototype.emptyFunction;
var C=Event.pointer(B);
Object.extend(B,{target:B.srcElement,relatedTarget:Event.relatedTarget(B),pageX:C.x,pageY:C.y});
return Object.extend(B,A)
}
}else{Event.prototype=Event.prototype||document.createEvent("HTMLEvents").__proto__;
Object.extend(Event.prototype,A);
return Prototype.K
}})();
Event.getDOMEventName=function(A){if(A&&A.include(":")){return"dataavailable"
}return A
};
Object.extend(Event,(function(){var C=Event.cache;
function D(H){if(H._eventID){return H._eventID
}arguments.callee.id=arguments.callee.id||1;
return H._eventID=++arguments.callee.id
}function E(H){return C[H]=C[H]||{}
}function F(J,H){var I=E(J);
return I[H]=I[H]||[]
}function A(I,H,J){var M=D(I);
var L=F(M,H);
if(L.pluck("handler").include(J)){return false
}var K=function(N){if(!Event||!Event.extend||(N.eventName&&N.eventName!=H)){return false
}Event.extend(N);
J.call(I,N)
};
K.handler=J;
L.push(K);
return K
}function B(K,H,I){var J=F(K,H);
return J.find(function(L){return L.handler==I
})
}function G(K,H,I){var J=E(K);
if(!J[H]){return false
}J[H]=J[H].without(B(K,H,I))
}return{observe:function(J,H,K){J=$(J);
var I=Event.getDOMEventName(H);
var L=A(J,H,K);
if(!L){return J
}if(J.addEventListener){J.addEventListener(I,L,false)
}else{J.attachEvent("on"+I,L)
}return J
},stopObserving:function(J,H,K){J=$(J);
var M=D(J),I=Event.getDOMEventName(H);
if(!K&&H){F(M,H).each(function(N){J.stopObserving(H,N.handler)
});
return J
}else{if(!H){Object.keys(E(M)).each(function(N){J.stopObserving(N)
});
return J
}}var L=B(M,H,K);
if(!L){return J
}if(J.removeEventListener){J.removeEventListener(I,L,false)
}else{J.detachEvent("on"+I,L)
}G(M,H,K);
return J
},fire:function(J,I,H){J=$(J);
if(J==document&&document.createEvent&&!J.dispatchEvent){J=document.documentElement
}if(document.createEvent){var K=document.createEvent("HTMLEvents");
K.initEvent("dataavailable",true,true)
}else{var K=document.createEventObject();
K.eventType="ondataavailable"
}K.eventName=I;
K.memo=H||{};
if(document.createEvent){J.dispatchEvent(K)
}else{J.fireEvent(K.eventType,K)
}return K
}}
})());
Object.extend(Event,Event.Methods);
Element.addMethods({fire:Event.fire,observe:Event.observe,stopObserving:Event.stopObserving});
Object.extend(document,{fire:Element.Methods.fire.methodize(),observe:Element.Methods.observe.methodize(),stopObserving:Element.Methods.stopObserving.methodize()});
(function(){var C,B=false;
function A(){if(B){return 
}if(C){window.clearInterval(C)
}document.fire("dom:loaded");
B=true
}if(document.addEventListener){if(Prototype.Browser.WebKit){C=window.setInterval(function(){if(/loaded|complete/.test(document.readyState)){A()
}},0);
Event.observe(window,"load",A)
}else{document.addEventListener("DOMContentLoaded",A,false)
}}else{if(document.readyState!="complete"){document.write("<script id=__onDOMContentLoaded defer src=//:><\/script>");
$("__onDOMContentLoaded").onreadystatechange=function(){if(this.readyState=="complete"){this.onreadystatechange=null;
A()
}}
}}})();
Hash.toQueryString=Object.toQueryString;
var Toggle={display:Element.toggle};
Element.Methods.childOf=Element.Methods.descendantOf;
var Insertion={Before:function(A,B){return Element.insert(A,{before:B})
},Top:function(A,B){return Element.insert(A,{top:B})
},Bottom:function(A,B){return Element.insert(A,{bottom:B})
},After:function(A,B){return Element.insert(A,{after:B})
}};
var $continue=new Error('"throw $continue" is deprecated, use "return" instead');
var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
},within:function(B,A,C){if(this.includeScrollOffsets){return this.withinIncludingScrolloffsets(B,A,C)
}this.xcomp=A;
this.ycomp=C;
this.offset=Element.cumulativeOffset(B);
return(C>=this.offset[1]&&C<this.offset[1]+B.offsetHeight&&A>=this.offset[0]&&A<this.offset[0]+B.offsetWidth)
},withinIncludingScrolloffsets:function(B,A,D){var C=Element.cumulativeScrollOffset(B);
this.xcomp=A+C[0]-this.deltaX;
this.ycomp=D+C[1]-this.deltaY;
this.offset=Element.cumulativeOffset(B);
return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+B.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+B.offsetWidth)
},overlap:function(B,A){if(!B){return 0
}if(B=="vertical"){return((this.offset[1]+A.offsetHeight)-this.ycomp)/A.offsetHeight
}if(B=="horizontal"){return((this.offset[0]+A.offsetWidth)-this.xcomp)/A.offsetWidth
}},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(A){Position.prepare();
return Element.absolutize(A)
},relativize:function(A){Position.prepare();
return Element.relativize(A)
},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(B,C,A){A=A||{};
return Element.clonePosition(C,B,A)
}};
if(!document.getElementsByClassName){document.getElementsByClassName=function(B){function A(C){return C.blank()?null:"[contains(concat(' ', @class, ' '), ' "+C+" ')]"
}B.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(C,E){E=E.toString().strip();
var D=/\s/.test(E)?$w(E).map(A).join(""):A(E);
return D?document._getElementsByXPath(".//*"+D,C):[]
}:function(E,F){F=F.toString().strip();
var G=[],H=(/\s/.test(F)?$w(F):null);
if(!H&&!F){return G
}var C=$(E).getElementsByTagName("*");
F=" "+F+" ";
for(var D=0,J,I;
J=C[D];
D++){if(J.className&&(I=" "+J.className+" ")&&(I.include(F)||(H&&H.all(function(K){return !K.toString().blank()&&I.include(" "+K+" ")
})))){G.push(Element.extend(J))
}}return G
};
return function(D,C){return $(C||document.body).getElementsByClassName(D)
}
}(Element.Methods)
}Element.ClassNames=Class.create();
Element.ClassNames.prototype={initialize:function(A){this.element=$(A)
},_each:function(A){this.element.className.split(/\s+/).select(function(B){return B.length>0
})._each(A)
},set:function(A){this.element.className=A
},add:function(A){if(this.include(A)){return 
}this.set($A(this).concat(A).join(" "))
},remove:function(A){if(!this.include(A)){return 
}this.set($A(this).without(A).join(" "))
},toString:function(){return $A(this).join(" ")
}};
Object.extend(Element.ClassNames.prototype,Enumerable);
Element.addMethods();
if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.Memory){window.RichFaces.Memory={cleaners:{},addCleaner:function(A,B){this.cleaners[A]=B
},applyCleaners:function(B){for(var A in this.cleaners){this.cleaners[A](B)
}},clean:function(E){if(E){this.applyCleaners(E);
var B=E.all;
if(B){var A=0;
var D=B.length;
for(var A=0;
A<D;
A++){this.applyCleaners(B[A])
}}else{var C=E.firstChild;
while(C){this.clean(C);
C=C.nextSibling
}}}}};
window.RichFaces.Memory.addCleaner("richfaces",function(D){var B=D.component;
if(B){var C=B["rich:destructor"];
if(C){var A=B[C];
if(A){A.call(B)
}}}});
if(window.attachEvent){window.attachEvent("onunload",function(){var A=window.RichFaces.Memory;
A.clean(document);
A.clean(window)
})
}}Function.prototype.indexOf=function(){return -1
};
Element.clearChildren=function(A){A=$(A);
while(A.firstChild){A.removeChild(A.firstChild)
}return A
};
Element.isChildOf=function(B,A){while(B&&A!=B){B=B.parentNode
}return A==B
};
if(typeof Node=="undefined"){Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12}
}Element.isUninitialized=function(A){if(A){if(A.nodeType==Node.ELEMENT_NODE){if(!A.parentNode||A.document&&A.document.readyState=="uninitialized"){return true
}else{return !Element.descendantOf(A,document.documentElement)
}return false
}}};
if(window.RichFaces&&window.RichFaces.Memory){window.RichFaces.Memory.addCleaner("prototype",function(E){var D=E._eventID;
if(D){var B=Event.cache[D];
for(var A in B){var F=B[A];
var C=Event.getDOMEventName(A);
F.each(function(G){if(E.removeEventListener){E.removeEventListener(C,G,false)
}else{E.detachEvent("on"+C,G)
}});
B[A]=null
}delete Event.cache[D]
}})
}
if(!window.A4J){window.A4J={}
}function Sarissa(){}Sarissa.VERSION="0.9.9.3";
Sarissa.PARSED_OK="Document contains no parsing errors";
Sarissa.PARSED_EMPTY="Document is empty";
Sarissa.PARSED_UNKNOWN_ERROR="Not well-formed or other error";
Sarissa.IS_ENABLED_TRANSFORM_NODE=false;
Sarissa.REMOTE_CALL_FLAG="gr.abiss.sarissa.REMOTE_CALL_FLAG";
Sarissa._sarissa_iNsCounter=0;
Sarissa._SARISSA_IEPREFIX4XSLPARAM="";
Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION=document.implementation&&true;
Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.createDocument;
Sarissa._SARISSA_HAS_DOM_FEATURE=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.hasFeature;
Sarissa._SARISSA_IS_MOZ=Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT&&Sarissa._SARISSA_HAS_DOM_FEATURE;
Sarissa._SARISSA_IS_SAFARI=navigator.userAgent.toLowerCase().indexOf("safari")!=-1||navigator.userAgent.toLowerCase().indexOf("konqueror")!=-1;
Sarissa._SARISSA_IS_SAFARI_OLD=Sarissa._SARISSA_IS_SAFARI&&(parseInt((navigator.userAgent.match(/AppleWebKit\/(\d+)/)||{})[1],10)<420);
Sarissa._SARISSA_IS_IE=document.all&&window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1;
Sarissa._SARISSA_IS_OPERA=navigator.userAgent.toLowerCase().indexOf("opera")!=-1;
if(!window.Node||!Node.ELEMENT_NODE){Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12}
}if(Sarissa._SARISSA_IS_SAFARI_OLD){HTMLHtmlElement=document.createElement("html").constructor;
Node=HTMLElement={};
HTMLElement.prototype=HTMLHtmlElement.__proto__.__proto__;
HTMLDocument=Document=document.constructor;
var x=new DOMParser();
XMLDocument=x.constructor;
Element=x.parseFromString("<Single />","text/xml").documentElement.constructor;
x=null
}if(typeof XMLDocument=="undefined"&&typeof Document!="undefined"){XMLDocument=Document
}if(Sarissa._SARISSA_IS_IE){Sarissa._SARISSA_IEPREFIX4XSLPARAM="xsl:";
var _SARISSA_DOM_PROGID="";
var _SARISSA_XMLHTTP_PROGID="";
var _SARISSA_DOM_XMLWRITER="";
Sarissa.pickRecentProgID=function(E){var D=false,G;
var F;
for(var B=0;
B<E.length&&!D;
B++){try{var A=new ActiveXObject(E[B]);
F=E[B];
D=true
}catch(C){G=C
}}if(!D){throw"Could not retrieve a valid progID of Class: "+E[E.length-1]+". (original exception: "+G+")"
}E=null;
return F
};
_SARISSA_DOM_PROGID=null;
_SARISSA_THREADEDDOM_PROGID=null;
_SARISSA_XSLTEMPLATE_PROGID=null;
_SARISSA_XMLHTTP_PROGID=null;
XMLHttpRequest=function(){if(!_SARISSA_XMLHTTP_PROGID){_SARISSA_XMLHTTP_PROGID=Sarissa.pickRecentProgID(["Msxml2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"])
}return new ActiveXObject(_SARISSA_XMLHTTP_PROGID)
};
Sarissa.getDomDocument=function(D,C){if(!_SARISSA_DOM_PROGID){_SARISSA_DOM_PROGID=Sarissa.pickRecentProgID(["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"])
}var A=new ActiveXObject(_SARISSA_DOM_PROGID);
if(C){var B="";
if(D){if(C.indexOf(":")>1){B=C.substring(0,C.indexOf(":"));
C=C.substring(C.indexOf(":")+1)
}else{B="a"+(Sarissa._sarissa_iNsCounter++)
}}if(D){A.loadXML("<"+B+":"+C+" xmlns:"+B+'="'+D+'" />')
}else{A.loadXML("<"+C+" />")
}}return A
};
Sarissa.getParseErrorText=function(A){var C=Sarissa.PARSED_OK;
if(A&&A.parseError&&A.parseError.errorCode&&A.parseError.errorCode!=0){C="XML Parsing Error: "+A.parseError.reason+"\nLocation: "+A.parseError.url+"\nLine Number "+A.parseError.line+", Column "+A.parseError.linepos+":\n"+A.parseError.srcText+"\n";
for(var B=0;
B<A.parseError.linepos;
B++){C+="-"
}C+="^\n"
}else{if(A.documentElement===null){C=Sarissa.PARSED_EMPTY
}}return C
};
Sarissa.setXpathNamespaces=function(A,B){A.setProperty("SelectionLanguage","XPath");
A.setProperty("SelectionNamespaces",B)
};
XSLTProcessor=function(){if(!_SARISSA_XSLTEMPLATE_PROGID){_SARISSA_XSLTEMPLATE_PROGID=Sarissa.pickRecentProgID(["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"])
}this.template=new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);
this.processor=null
};
XSLTProcessor.prototype.importStylesheet=function(D){if(!_SARISSA_THREADEDDOM_PROGID){_SARISSA_THREADEDDOM_PROGID=Sarissa.pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"])
}D.setProperty("SelectionLanguage","XPath");
D.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var C=new ActiveXObject(_SARISSA_THREADEDDOM_PROGID);
try{C.resolveExternals=true;
C.setProperty("AllowDocumentFunction",true)
}catch(B){}if(D.url&&D.selectSingleNode("//xsl:*[local-name() = 'import' or local-name() = 'include']")!=null){C.async=false;
C.load(D.url)
}else{C.loadXML(D.xml)
}C.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var A=C.selectSingleNode("//xsl:output");
if(A){this.outputMethod=A.getAttribute("method")
}else{delete this.outputMethod
}this.template.stylesheet=C;
this.processor=this.template.createProcessor();
this.paramsSet=[]
};
XSLTProcessor.prototype.transformToDocument=function(C){var B;
if(_SARISSA_THREADEDDOM_PROGID){this.processor.input=C;
B=new ActiveXObject(_SARISSA_DOM_PROGID);
this.processor.output=B;
this.processor.transform();
return B
}else{if(!_SARISSA_DOM_XMLWRITER){_SARISSA_DOM_XMLWRITER=Sarissa.pickRecentProgID(["Msxml2.MXXMLWriter.6.0","Msxml2.MXXMLWriter.3.0","MSXML2.MXXMLWriter","MSXML.MXXMLWriter","Microsoft.XMLDOM"])
}this.processor.input=C;
B=new ActiveXObject(_SARISSA_DOM_XMLWRITER);
this.processor.output=B;
this.processor.transform();
var A=new ActiveXObject(_SARISSA_DOM_PROGID);
A.loadXML(B.output+"");
return A
}};
XSLTProcessor.prototype.transformToFragment=function(G,D){this.processor.input=G;
this.processor.transform();
var E=this.processor.output;
var F=D.createDocumentFragment();
var B;
if(this.outputMethod=="text"){F.appendChild(D.createTextNode(E))
}else{if(D.body&&D.body.innerHTML){B=D.createElement("div");
B.innerHTML=E;
while(B.hasChildNodes()){F.appendChild(B.firstChild)
}}else{var A=new ActiveXObject(_SARISSA_DOM_PROGID);
if(E.substring(0,5)=="<?xml"){E=E.substring(E.indexOf("?>")+2)
}var C="".concat("<my>",E,"</my>");
A.loadXML(C);
B=A.documentElement;
while(B.hasChildNodes()){F.appendChild(B.firstChild)
}}}return F
};
XSLTProcessor.prototype.setParameter=function(C,A,B){B=B?B:"";
if(C){this.processor.addParameter(A,B,C)
}else{this.processor.addParameter(A,B)
}C=""+(C||"");
if(!this.paramsSet[C]){this.paramsSet[C]=[]
}this.paramsSet[C][A]=B
};
XSLTProcessor.prototype.getParameter=function(B,A){B=""+(B||"");
if(this.paramsSet[B]&&this.paramsSet[B][A]){return this.paramsSet[B][A]
}else{return null
}};
XSLTProcessor.prototype.clearParameters=function(){for(var B in this.paramsSet){for(var A in this.paramsSet[B]){if(B!=""){this.processor.addParameter(A,"",B)
}else{this.processor.addParameter(A,"")
}}}this.paramsSet=[]
}
}else{if(Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT){Sarissa.__handleLoad__=function(A){Sarissa.__setReadyState__(A,4)
};
_sarissa_XMLDocument_onload=function(){Sarissa.__handleLoad__(this)
};
Sarissa.__setReadyState__=function(A,B){A.readyState=B;
A.readystate=B;
if(A.onreadystatechange!=null&&typeof A.onreadystatechange=="function"){A.onreadystatechange()
}};
Sarissa.getDomDocument=function(C,B){var A=document.implementation.createDocument(C?C:null,B?B:null,null);
if(!A.onreadystatechange){A.onreadystatechange=null
}if(!A.readyState){A.readyState=0
}A.addEventListener("load",_sarissa_XMLDocument_onload,false);
return A
};
if(window.XMLDocument){}else{if(Sarissa._SARISSA_HAS_DOM_FEATURE&&window.Document&&!Document.prototype.load&&document.implementation.hasFeature("LS","3.0")){Sarissa.getDomDocument=function(C,B){var A=document.implementation.createDocument(C?C:null,B?B:null,null);
return A
}
}else{Sarissa.getDomDocument=function(C,B){var A=document.implementation.createDocument(C?C:null,B?B:null,null);
if(A&&(C||B)&&!A.documentElement){A.appendChild(A.createElementNS(C,B))
}return A
}
}}}}if(!window.DOMParser){if(Sarissa._SARISSA_IS_SAFARI){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(B,C){var A=new XMLHttpRequest();
A.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(B),false);
A.send(null);
return A.responseXML
}
}else{if(Sarissa.getDomDocument&&Sarissa.getDomDocument()&&Sarissa.getDomDocument(null,"bar").xml){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(A,C){var B=Sarissa.getDomDocument();
B.loadXML(A);
return B
}
}}}if((typeof (document.importNode)=="undefined")&&Sarissa._SARISSA_IS_IE){try{document.importNode=function(D,C){var B;
if(D.nodeName=="#text"){return document.createTextNode(D.data)
}else{var A=false;
if(D.nodeName=="tbody"&&D.parentNode){D=D.parentNode;
A=true
}else{if(D.nodeName=="tbody"||D.nodeName=="tr"){B=document.createElement("tr")
}else{if(D.nodeName=="td"){B=document.createElement("tr")
}else{if(D.nodeName=="option"){B=document.createElement("select")
}}}}if(!B){B=document.createElement("div")
}if(C){B.innerHTML=D.xml?D.xml:D.outerHTML
}else{B.innerHTML=D.xml?D.cloneNode(false).xml:D.cloneNode(false).outerHTML
}if(A){return B.firstChild.tBodies[0]
}else{return B.getElementsByTagName("*")[0]
}}}
}catch(e){}}if(!Sarissa.getParseErrorText){Sarissa.getParseErrorText=function(A){var C=Sarissa.PARSED_OK;
if(!A.documentElement){C=Sarissa.PARSED_EMPTY
}else{if(A.documentElement.tagName=="parsererror"){C=A.documentElement.firstChild.data;
C+="\n"+A.documentElement.firstChild.nextSibling.firstChild.data
}else{if(A.getElementsByTagName("parsererror").length>0){var B=A.getElementsByTagName("parsererror")[0];
C=Sarissa.getText(B,true)+"\n"
}else{if(A.parseError&&A.parseError.errorCode!=0){C=Sarissa.PARSED_UNKNOWN_ERROR
}}}}return C
}
}Sarissa.getText=function(G,B){var E="";
var C=G.childNodes;
for(var D=0;
D<C.length;
D++){var F=C[D];
var A=F.nodeType;
if(A==Node.TEXT_NODE||A==Node.CDATA_SECTION_NODE){E+=F.data
}else{if(B===true&&(A==Node.ELEMENT_NODE||A==Node.DOCUMENT_NODE||A==Node.DOCUMENT_FRAGMENT_NODE)){E+=Sarissa.getText(F,true)
}}}return E
};
if(!window.XMLSerializer&&Sarissa.getDomDocument&&Sarissa.getDomDocument("","foo",null).xml){XMLSerializer=function(){};
XMLSerializer.prototype.serializeToString=function(A){return A.xml
}
}Sarissa.stripTags=function(A){return A?A.replace(/<[^>]+>/g,""):A
};
Sarissa.clearChildNodes=function(A){while(A.firstChild){A.removeChild(A.firstChild)
}};
Sarissa.copyChildNodes=function(D,E,F){if(Sarissa._SARISSA_IS_SAFARI&&E.nodeType==Node.DOCUMENT_NODE){E=E.documentElement
}if((!D)||(!E)){throw"Both source and destination nodes must be provided"
}if(!F){Sarissa.clearChildNodes(E)
}var B=E.nodeType==Node.DOCUMENT_NODE?E:E.ownerDocument;
var A=D.childNodes;
var C;
if(typeof (B.importNode)!="undefined"){for(C=0;
C<A.length;
C++){E.appendChild(B.importNode(A[C],true))
}}else{for(C=0;
C<A.length;
C++){E.appendChild(A[C].cloneNode(true))
}}};
Sarissa.moveChildNodes=function(D,E,F){if((!D)||(!E)){throw"Both source and destination nodes must be provided"
}if(!F){Sarissa.clearChildNodes(E)
}var A=D.childNodes;
if(D.ownerDocument==E.ownerDocument){while(D.firstChild){E.appendChild(D.firstChild)
}}else{var B=E.nodeType==Node.DOCUMENT_NODE?E:E.ownerDocument;
var C;
if(typeof (B.importNode)!="undefined"){for(C=0;
C<A.length;
C++){E.appendChild(B.importNode(A[C],true))
}}else{for(C=0;
C<A.length;
C++){E.appendChild(A[C].cloneNode(true))
}}Sarissa.clearChildNodes(D)
}};
Sarissa.xmlize=function(E,G,D){D=D?D:"";
var F=D+"<"+G+">";
var B=false;
if(!(E instanceof Object)||E instanceof Number||E instanceof String||E instanceof Boolean||E instanceof Date){F+=Sarissa.escape(""+E);
B=true
}else{F+="\n";
var A=E instanceof Array;
for(var C in E){F+=Sarissa.xmlize(E[C],(A?'array-item key="'+C+'"':C),D+"   ")
}F+=D
}return(F+=(G.indexOf(" ")!=-1?"</array-item>\n":"</"+G+">\n"))
};
Sarissa.escape=function(A){return A.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")
};
Sarissa.unescape=function(A){return A.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")
};
Sarissa.updateCursor=function(B,A){if(B&&B.style&&B.style.cursor!=undefined){B.style.cursor=A
}};
Sarissa.updateContentFromURI=function(C,H,A,G,E){try{Sarissa.updateCursor(H,"wait");
var B=new XMLHttpRequest();
B.open("GET",C,true);
B.onreadystatechange=function(){if(B.readyState==4){try{var I=B.responseXML;
if(I&&Sarissa.getParseErrorText(I)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(B.responseXML,H,A);
G(C,H)
}else{throw Sarissa.getParseErrorText(I)
}}catch(J){if(G){G(C,H,J)
}else{throw J
}}}};
if(E){var F="Sat, 1 Jan 2000 00:00:00 GMT";
B.setRequestHeader("If-Modified-Since",F)
}B.send("")
}catch(D){Sarissa.updateCursor(H,"auto");
if(G){G(C,H,D)
}else{throw D
}}};
Sarissa.updateContentFromNode=function(E,F,A){try{Sarissa.updateCursor(F,"wait");
Sarissa.clearChildNodes(F);
var B=E.nodeType==Node.DOCUMENT_NODE?E:E.ownerDocument;
if(B.parseError&&B.parseError.errorCode!=0){var D=document.createElement("pre");
D.appendChild(document.createTextNode(Sarissa.getParseErrorText(B)));
F.appendChild(D)
}else{if(A){E=A.transformToDocument(E)
}if(F.tagName.toLowerCase()=="textarea"||F.tagName.toLowerCase()=="input"){F.value=new XMLSerializer().serializeToString(E)
}else{if(E.nodeType==Node.DOCUMENT_NODE||E.ownerDocument.documentElement==E){F.innerHTML=new XMLSerializer().serializeToString(E)
}else{F.appendChild(F.ownerDocument.importNode(E,true))
}}}}catch(C){throw C
}finally{Sarissa.updateCursor(F,"auto")
}};
Sarissa.formToQueryString=function(G){var A="";
for(var F=0;
F<G.elements.length;
F++){var E=G.elements[F];
var D=E.getAttribute("name")?E.getAttribute("name"):E.getAttribute("id");
if(D&&((!E.disabled)||E.type=="hidden")){switch(E.type){case"hidden":case"text":case"textarea":case"password":A+=D+"="+encodeURIComponent(E.value)+"&";
break;
case"select-one":A+=D+"="+encodeURIComponent(E.options[E.selectedIndex].value)+"&";
break;
case"select-multiple":for(var C=0;
C<E.length;
C++){var B=E.options[C];
if(B.selected===true){A+=D+"[]="+encodeURIComponent(B.value)+"&"
}}break;
case"checkbox":case"radio":if(E.checked){A+=D+"="+encodeURIComponent(E.value)+"&"
}break
}}}return A.substr(0,A.length-1)
};
Sarissa.updateContentFromForm=function(F,H,A,G){try{Sarissa.updateCursor(H,"wait");
var E=Sarissa.formToQueryString(F)+"&"+Sarissa.REMOTE_CALL_FLAG+"=true";
var B=new XMLHttpRequest();
var C=F.getAttribute("method")&&F.getAttribute("method").toLowerCase()=="get";
if(C){B.open("GET",F.getAttribute("action")+"?"+E,true)
}else{B.open("POST",F.getAttribute("action"),true);
B.setRequestHeader("Content-type","application/x-www-form-urlencoded");
B.setRequestHeader("Content-length",E.length);
B.setRequestHeader("Connection","close")
}B.onreadystatechange=function(){try{if(B.readyState==4){var I=B.responseXML;
if(I&&Sarissa.getParseErrorText(I)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(B.responseXML,H,A);
G(F,H)
}else{throw Sarissa.getParseErrorText(I)
}}}catch(J){if(G){G(F,H,J)
}else{throw J
}}};
B.send(C?"":E)
}catch(D){Sarissa.updateCursor(H,"auto");
if(G){G(F,H,D)
}else{throw D
}}return false
};
A4J.AJAX={};
A4J.AJAX.XMLHttpRequest=function(A){this._query=A;
this._documentElement=window.document.documentElement
};
A4J.AJAX.XMLHttpRequest.prototype={_query:null,_timeout:0,_timeoutID:null,onready:null,_parsingStatus:Sarissa.PARSED_EMPTY,_errorMessage:"XML Response object not set",_contentType:null,_onerror:function(C,A,B){if(A!=599&&C.getResponseText()){A4J.AJAX.replacePage(C)
}},onfinish:null,options:{},domEvt:null,form:null,_request:null,_aborted:false,_documentElement:null,setRequestTimeout:function(A){this._timeout=A
},send:function(){this._request=new XMLHttpRequest();
var C=this;
this._request.onreadystatechange=function(){if(window.document.documentElement!=C._documentElement){LOG.warn("Page for current request have been unloaded - abort processing");
C.abort();
return 
}if(C._aborted){return 
}LOG.debug("Reqest state : "+C._request.readyState);
if(C._request.readyState==4){LOG.debug("Reqest end with state 4");
if(C._timeoutID){window.clearTimeout(C._timeoutID)
}var F;
var D;
try{F=C._request.status;
D=C._request.statusText
}catch(E){LOG.error("request don't have status code - network problem, "+E.message);
F=599;
D="Network error"
}if(F==200){try{LOG.debug("Response  with content-type: "+C.getResponseHeader("Content-Type"));
LOG.debug("Full response content: ",C.getResponseText())
}catch(E){}if(C._request.responseXML){C._parsingStatus=Sarissa.getParseErrorText(C._request.responseXML);
if(C._parsingStatus==Sarissa.PARSED_OK&&Sarissa.setXpathNamespaces){Sarissa.setXpathNamespaces(C._request.responseXML,"xmlns='http://www.w3.org/1999/xhtml'")
}}if(C.onready){C.onready(C)
}}else{C._errorMessage="Reqest error, status : "+F+" "+D;
LOG.error(C._errorMessage);
if(typeof (C._onerror)=="function"){C._onerror(C,F,C._errorMessage)
}if(C.onfinish){C.onfinish(C)
}}C=undefined
}};
try{LOG.debug("Start XmlHttpRequest");
this._request.open("POST",this._query.getActionUrl(""),true);
var B="application/x-www-form-urlencoded; charset=UTF-8";
this._request.setRequestHeader("Content-Type",B)
}catch(A){LOG.debug("XmlHttpRequest not support setRequestHeader - use GET instead of POST");
this._request.open("GET",this._query.getActionUrl("")+"?"+this._query.getQueryString(),true)
}this._request.send(this._query.getQueryString());
if(this._timeout>0){this._timeoutID=window.setTimeout(function(){LOG.warn("request stopped due to timeout");
if(!C._aborted){A4J.AJAX.status(C.containerId,C.options.status,false);
if(typeof (A4J.AJAX.onAbort)=="function"){A4J.AJAX.onAbort(C)
}}C._aborted=true;
C._request.abort();
if(C._onerror){C._errorMessage="Request timeout";
C._onerror(C,500,C._errorMessage)
}if(C.onfinish){C.onfinish(C)
}C._request=undefined;
C=undefined
},this._timeout)
}},abort:function(){if(!this._aborted){A4J.AJAX.status(this.containerId,this.options.status,false);
if(typeof (A4J.AJAX.onAbort)=="function"){A4J.AJAX.onAbort(this)
}}this._aborted=true;
if(this._request){try{if(this._timeoutID){window.clearTimeout(this._timeoutID)
}}catch(A){LOG.warn("Exception for abort current request "+A.Message)
}}},getResponseText:function(){try{return this._request.responseText
}catch(A){return null
}},getError:function(){return this._errorMessage
},getParserStatus:function(){return this._parsingStatus
},getContentType:function(){if(!this._contentType){var B=this.getResponseHeader("Content-Type");
if(B){var A=B.indexOf(";");
if(A>=0){this._contentType=B.substring(0,A)
}else{this._contentType=B
}}else{this._contentType="text/html"
}}return this._contentType
},getResponseHeader:function(B){var A;
try{A=this._request.getResponseHeader(B);
if(A===""){A=undefined
}}catch(E){}if(!A){LOG.debug("Header "+B+" not found, search in <meta>");
if(this._parsingStatus==Sarissa.PARSED_OK){var F=this.getElementsByTagName("meta");
for(var C=0;
C<F.length;
C++){var D=F[C];
LOG.debug("Find <meta name='"+D.getAttribute("name")+"' content='"+D.getAttribute("content")+"'>");
if(D.getAttribute("name")==B){A=D.getAttribute("content");
break
}}}}return A
},getElementsByTagName:function(A,C){if(!C){C=this._request.responseXML
}LOG.debug("search for elements by name '"+A+"'  in element "+C.nodeName);
var E;
try{E=C.selectNodes('.//*[local-name()="'+A+'"]')
}catch(B){try{E=C.getElementsByTagName(A)
}catch(D){LOG.debug("getElementsByTagName found no elements, "+D.Message)
}}return E
},getElementById:function(B){var A=this._request.responseXML;
if(A){if(typeof (A.getElementById)!="undefined"){LOG.debug("call getElementById for id= "+B);
return A.getElementById(B)
}else{if(typeof (A.selectSingleNode)!="undefined"){LOG.debug("call selectSingleNode for id= "+B);
return A.selectSingleNode("//*[@id='"+B+"']")
}else{if(typeof (A.nodeFromID)!="undefined"){LOG.debug("call nodeFromID for id= "+B);
return A.nodeFromID(B)
}}}LOG.error("No functions for getElementById found ")
}else{LOG.debug("No parsed XML document in response")
}return null
},getJSON:function(id){var data;
var dataElement=this.getElementById(id);
if(dataElement){try{data=Sarissa.getText(dataElement,true);
data=window.eval("("+data+")")
}catch(e){LOG.error("Error on parsing JSON data "+e.message,data)
}}return data
},evalScripts:function(node,isLast){var newscripts=this.getElementsByTagName("script",node);
LOG.debug("Scripts in updated part count : "+newscripts.length);
if(newscripts.length>0){var _this=this;
window.setTimeout(function(){for(var i=0;
i<newscripts.length;
i++){var includeComments=!A4J.AJAX.isXhtmlScriptMode();
var newscript=A4J.AJAX.getText(newscripts[i],includeComments);
try{LOG.debug("Evaluate script replaced area in document: ",newscript);
if(window.execScript){window.execScript(newscript)
}else{window.eval(newscript)
}}catch(e){LOG.error("ERROR Evaluate script:  Error name: "+e.name+e.message?". Error message: "+e.message:"")
}}newscripts=null;
if(isLast){_this.doFinish();
_this=undefined
}},0)
}else{if(isLast){this.doFinish()
}}},updatePagePart:function(G,D){var C=this.getElementById(G);
if(!C){LOG.error("New node for ID "+G+" is not present in response");
if(D){this.doFinish()
}return 
}var A=window.document.getElementById(G);
if(A){if(window.RichFaces&&window.RichFaces.Memory){window.RichFaces.Memory.clean(A)
}var B=A.parentNode;
if(!window.opera&&A.outerHTML&&!A.tagName.match(/(tbody|thead|tfoot|tr|th|td)/i)){LOG.debug("Replace content of node by outerHTML()");
try{A.innerHTML=""
}catch(F){LOG.error("Error to clear node content by innerHTML "+F.message);
Sarissa.clearChildNodes(A)
}A.outerHTML=new XMLSerializer().serializeToString(C)
}else{var E;
Sarissa.clearChildNodes(A);
E=window.document.importNode(C,true);
LOG.debug("Replace content of node by replaceChild()");
B.replaceChild(E,A)
}if(!A4J.AJAX._scriptEvaluated){this.evalScripts(C,D)
}LOG.debug("Update part of page for Id: "+G+" successful")
}else{LOG.warn("Node for replace by response with id "+G+" not found in document");
if(!A4J.AJAX._scriptEvaluated&&D){this.doFinish()
}}if(A4J.AJAX._scriptEvaluated&&D){this.doFinish()
}},doFinish:function(){if(this.onfinish){this.onfinish(this)
}},appendNewHeadElements:function(F){var C=this._appendNewElements("script","src",null,null,["type","language","charset"]);
var E=this;
C.concat(this._appendNewElements("link","href","class",["component","user"],["type","rev","media"],{"class":"className"},function(H,G){E._copyAttribute(H,G,"rel")
}));
if(C.length==0){F();
return 
}A4J.AJAX.headElementsCounter=C.length;
var A=function(){if(this.readyState=="loaded"||this.readyState=="complete"){this.onreadystatechange=null;
this.onload=null;
F()
}};
var D=function(){this.onreadystatechange=null;
this.onload=null;
F()
};
for(var B=0;
B<C.length;
B++){C[B].onreadystatechange=A;
C[B].onload=D
}},_appendNewElements:function(W,Q,X,N,J,B,D){var E=document.getElementsByTagName("head")[0]||document.documentElement;
var C=this.getElementsByTagName(W);
var L=document.getElementsByTagName(W);
var F=(B&&B[X])||X;
var M=[];
var R={};
if(N){var P=0;
for(var O=0;
O<L.length;
O++){var G=L[O];
var S=G[F];
for(;
P<N.length&&N[P]!=S;
P++){R[N[P]]=G
}if(P==N.length){break
}}}for(var P=0;
P<C.length;
P++){var A=C[P];
var H=A.getAttribute(Q);
var K;
if(N){K=A.getAttribute(X)
}if(H){var U=false;
LOG.debug("<"+W+"> in response with src="+H);
for(var O=0;
O<L.length;
O++){if(this._noSessionHref(H)==this._noSessionHref(L[O].getAttribute(Q))){LOG.debug("Such element exist in document");
if(X){var V=L[O][F];
if((!K^!V)||(K&&V&&K!=V)){LOG.warn("Roles are different")
}}U=true;
break
}}if(!U){var T=document.createElement(W);
T.setAttribute(Q,H);
for(var O=0;
O<J.length;
O++){this._copyAttribute(A,T,J[O])
}if(K){T[F]=K
}LOG.debug("append element to document");
for(var O=0;
O<A4J.AJAX._headTransformers.length;
O++){A4J.AJAX._headTransformers[O](T)
}var I=R[K];
if(I&&I.parentNode){I.parentNode.insertBefore(T,I)
}else{E.appendChild(T)
}if(D){D(A,T)
}if(W!="link"||T.type.toLowerCase()=="text/javascript"){M.push(T)
}}}}return M
},_noSessionHref:function(A){var B=A;
if(A){var C=A.lastIndexOf(";jsessionid=");
if(C>0){B=A.substring(0,C);
var D=A.lastIndexOf("?");
if(D>C){B=B+A.substring(D)
}}}return B
},_copyAttribute:function(C,D,A){var B=C.getAttribute(A);
if(B){D.setAttribute(A,B)
}}};
A4J.AJAX._eventsQueues={};
A4J.AJAX.Listener=function(A){this.onafterajax=A
};
A4J.AJAX._listeners=[];
A4J.AJAX.AddListener=function(A){A4J.AJAX._listeners.push(A)
};
A4J.AJAX.removeListeners=function(A){A4J.AJAX._listeners=[]
};
A4J.AJAX.HeadElementTransformer=function(A){this.elt=A
};
A4J.AJAX._headTransformers=[];
A4J.AJAX.AddHeadElementTransformer=function(A){A4J.AJAX._headTransformers.push(A)
};
A4J.AJAX._pollers={};
A4J.AJAX.Poll=function(A,C,B){A4J.AJAX.StopPoll(B.pollId);
if(!B.onerror){B.onerror=function(F,D,E){if(typeof (A4J.AJAX.onError)=="function"){A4J.AJAX.onError(F,D,E)
}A4J.AJAX.Poll(A,C,B)
}
}A4J.AJAX._pollers[B.pollId]=window.setTimeout(function(){A4J.AJAX._pollers[B.pollId]=undefined;
if((typeof (B.onsubmit)=="function")&&(B.onsubmit()==false)){A4J.AJAX.Poll(A,C,B)
}else{A4J.AJAX.SubmitRequest(A,C,null,B)
}},B.pollinterval)
};
A4J.AJAX.StopPoll=function(A){if(A4J.AJAX._pollers[A]){window.clearTimeout(A4J.AJAX._pollers[A]);
A4J.AJAX._pollers[A]=undefined
}};
A4J.AJAX.Push=function(A,C,B){A4J.AJAX.StopPush(B.pushId);
B.onerror=function(){A4J.AJAX.Push(A,C,B)
};
A4J.AJAX._pollers[B.pushId]=window.setTimeout(function(){var D=new XMLHttpRequest();
D.onreadystatechange=function(){if(D.readyState==4){try{if(D.status==200){if(D.getResponseHeader("Ajax-Push-Status")=="READY"){A4J.AJAX.SubmitRequest(A,C||B.dummyForm,null,B)
}}}catch(E){}D=null;
A4J.AJAX._pollers[B.pushId]=null;
A4J.AJAX.Push(A,C,B)
}};
A4J.AJAX.SendPush(D,B)
},B.pushinterval)
};
A4J.AJAX.SendPush=function(C,B){var A=B.pushUrl||B.actionUrl;
C.open("HEAD",A,true);
C.setRequestHeader("Ajax-Push-Key",B.pushId);
if(B.timeout){C.setRequestHeader("Timeout",B.timeout)
}C.send(null)
};
A4J.AJAX.StopPush=function(A){if(A4J.AJAX._pollers[A]){window.clearTimeout(A4J.AJAX._pollers[A]);
A4J.AJAX._pollers[A]=null
}};
A4J.AJAX.CloneObject=function(C,B){var A={};
for(var D in C){if(B&&typeof (evt[prop])=="function"){continue
}A[D]=C[D]
}return A
};
A4J.AJAX.SubmitForm=function(A,D,B){var C=A4J.AJAX.CloneObject(B);
if(A4J._formInput){LOG.debug("Form submitted by button "+A4J._formInput.id);
C.control=A4J._formInput;
A4J._formInput=null;
C.submitByForm=true
}A4J.AJAX.Submit(A,D,null,C)
};
A4J.AJAX.Submit=function(E,A,H,I){var C;
H=H||window.event||null;
if(H){try{C=A4J.AJAX.CloneObject(H,false)
}catch(G){LOG.warn("Exception on clone event "+G.name+":"+G.message)
}LOG.debug("Have Event "+C+" with properties: target: "+C.target+", srcElement: "+C.srcElement+", type: "+C.type)
}if(I.eventsQueue){var D=A4J.AJAX._eventsQueues[I.eventsQueue];
if(D){var F=D.options.eventsCount||1;
D.wait=true;
D.containerId=E;
D.form=A;
D.domEvt=C;
D.options=I;
D.options.eventsCount=F+1;
if(I.ignoreDupResponses&&D.request){LOG.debug("Abort uncompleted request in queue "+I.eventsQueue);
D.request.abort();
D.request=false;
D.wait=false;
if(I.requestDelay){window.setTimeout(function(){LOG.debug("End delay waiting, make request in queue "+I.eventsQueue);
A4J.AJAX.SubmiteventsQueue(A4J.AJAX._eventsQueues[I.eventsQueue])
},I.requestDelay);
LOG.debug("Create new waiting for request in queue "+I.eventsQueue);
return 
}}else{LOG.debug("Put new event to queue "+I.eventsQueue);
return 
}}else{var B={wait:false,containerId:E,form:A,domEvt:C,options:I};
A4J.AJAX._eventsQueues[I.eventsQueue]=B;
if(I.requestDelay){window.setTimeout(function(){LOG.debug("End delay waiting, make request in queue "+I.eventsQueue);
A4J.AJAX.SubmiteventsQueue(A4J.AJAX._eventsQueues[I.eventsQueue])
},I.requestDelay);
LOG.debug("Event occurs, create waiting for request in queue "+I.eventsQueue);
return 
}}}A4J.AJAX.SubmitRequest(E,A,C,I)
};
A4J.AJAX.SubmiteventsQueue=function(A){A.wait=false;
A4J.AJAX.SubmitRequest(A.containerId,A.form,A.domEvt,A.options)
};
A4J.AJAX.SubmitRequest=function(E,H,D,I){LOG.debug("NEW AJAX REQUEST !!! with form :"+H);
var A=window.document.getElementById(H);
if((!A||A.nodeName.toUpperCase()!="FORM")&&D){var F=D.target||D.srcElement||null;
if(F){A=A4J.AJAX.locateForm(F)
}}if(!I.submitByForm&&A&&A.onsubmit){LOG.debug("Form have onsubmit function, call it");
if(A.onsubmit()==false){return false
}}var B=new A4J.Query(E,A);
B.appendFormControls(I.single,I.control);
if(I.parameters){B.appendParameters(I.parameters)
}if(I.eventsCount){B.appendParameter("AJAX:EVENTS_COUNT",I.eventsCount)
}if(I.actionUrl){B.setActionUrl(I.actionUrl)
}var G=new A4J.AJAX.XMLHttpRequest(B);
G.options=I;
G.containerId=E;
G.domEvt=D;
G.form=A;
if(I.timeout){G.setRequestTimeout(I.timeout)
}G.onready=A4J.AJAX.processResponse;
if(I.onerror){G._onerror=I.onerror
}else{if(typeof (A4J.AJAX.onError)=="function"){G._onerror=A4J.AJAX.onError
}}G.onfinish=A4J.AJAX.finishRequest;
A4J.AJAX.status(E,I.status,true);
G.send();
if(I.eventsQueue){var C=A4J.AJAX._eventsQueues[I.eventsQueue];
if(C){C.request=G
}}return false
};
A4J.AJAX.processResponseAfterUpdateHeadElements=function(C,B){for(var A=0;
A<B.length;
A++){var D=B[A];
LOG.debug("Update page part from call parameter for ID "+D);
C.updatePagePart(D,A==B.length-1)
}};
A4J.AJAX.headElementsCounter=0;
A4J.AJAX.processResponse=function(A){A4J.AJAX.TestScriptEvaluation();
var E=A.options;
var S=A.getResponseHeader("Ajax-Response");
var Q=A.getResponseHeader("Ajax-Expired");
if(Q&&typeof (A4J.AJAX.onExpired)=="function"){var I=A4J.AJAX.onExpired(window.location,Q);
if(I){window.location=I;
return 
}}if(S!="true"){LOG.warn("No ajax response header ");
var I=A.getResponseHeader("Location");
try{if(S=="redirect"&&I){window.location=I
}else{if(S=="reload"){window.location.reload(true)
}else{A4J.AJAX.replacePage(A)
}}}catch(N){LOG.error("Error redirect to new location ")
}}else{if(A.getParserStatus()==Sarissa.PARSED_OK){if(E.onbeforedomupdate){LOG.debug("Call request onbeforedomupdate function before replacing elemements");
E.onbeforedomupdate(A,A.domEvt,A.getJSON("_ajax:data"))
}var B=A.getResponseHeader("Ajax-Update-Ids");
var L;
var G=function(){if(A4J.AJAX.headElementsCounter!=0){LOG.debug("Script "+A4J.AJAX.headElementsCounter+" was loaded");
--A4J.AJAX.headElementsCounter
}if(A4J.AJAX.headElementsCounter==0){A4J.AJAX.processResponseAfterUpdateHeadElements(A,L)
}};
if(E.affected){L=E.affected;
A.appendNewHeadElements(G)
}else{if(B&&B!=""){LOG.debug("Update page by list of rendered areas from response "+B);
L=B.split(",");
A.appendNewHeadElements(G)
}else{LOG.warn("No information in response about elements to replace");
A.doFinish()
}}var P=A.getElementById("ajax-view-state");
LOG.debug("Hidden JSF state fields: "+P);
if(P!=null){var J=E.parameters["org.ajax4jsf.portlet.NAMESPACE"];
LOG.debug("Namespace for hidden view-state input fields is "+J);
var H=J?window.document.getElementById(J):window.document;
var C=H.getElementsByTagName("input");
try{var M=A.getElementsByTagName("input",P);
A4J.AJAX.replaceViewState(C,M)
}catch(N){LOG.warn("No elements 'input' in response")
}try{var M=A.getElementsByTagName("INPUT",P);
A4J.AJAX.replaceViewState(C,M)
}catch(N){LOG.warn("No elements 'INPUT' in response")
}}for(var K=0;
K<A4J.AJAX._listeners.length;
K++){var F=A4J.AJAX._listeners[K];
if(F.onafterajax){var R=A.getJSON("_ajax:data");
F.onafterajax(A,A.domEvt,R)
}}var O=A.getJSON("_A4J.AJAX.focus");
if(O){LOG.debug("focus must be set to control "+O);
var D=false;
if(A.form){D=A.form.elements[O]
}if(!D){LOG.debug("No control element "+O+" in submitted form");
D=document.getElementById(O)
}if(D){LOG.debug("Set focus to control ");
D.focus();
if(D.select){D.select()
}}else{LOG.warn("Element for set focus not found")
}}else{LOG.debug("No focus information in response")
}}else{LOG.error("Error parsing XML");
LOG.error("Parse Error: "+A.getParserStatus())
}}};
A4J.AJAX.replacePage=function(B){if(!B.getResponseText()){LOG.warn("No content in response for replace current page");
return 
}LOG.debug("replace all page content with response");
var A=Sarissa._SARISSA_IS_IE;
var C=window.document.open;
if(A){LOG.debug("setup custom document.open method");
window.document.open=function(){C.apply(this,arguments)
}
}window.setTimeout(function(){var E=false;
try{window.document.open(B.getContentType(),true);
LOG.debug("window.document has opened for writing");
E=true;
window.document.write(B.getResponseText());
LOG.debug("window.document has been writed");
window.document.close();
LOG.debug("window.document has been closed for writing");
if(A){window.location.reload(false)
}}catch(I){LOG.debug("exception during write page content "+I.Message);
if(E){window.document.close()
}var H=(new DOMParser()).parseFromString(B.getResponseText(),"text/xml");
if(Sarissa.getParseErrorText(H)==Sarissa.PARSED_OK){LOG.debug("response has parsed as DOM documnet.");
Sarissa.clearChildNodes(window.document.documentElement);
var D=H.documentElement.childNodes;
for(var F=0;
F<D.length;
F++){if(D[F].nodeType==1){LOG.debug("append new node in document");
var G=window.document.importNode(D[F],true);
window.document.documentElement.appendChild(G)
}}}else{LOG.error("Error parsing response",Sarissa.getParseErrorText(H))
}}finally{window.document.open=C
}LOG.debug("page content has been replaced")
},0)
};
A4J.AJAX.replaceViewState=function(A,E){LOG.debug("Replace value for inputs: "+A.length+" by new values: "+E.length);
if((E.length>0)&&(A.length>0)){for(var D=0;
D<E.length;
D++){var F=E[D];
LOG.debug("Input in response: "+F.getAttribute("name"));
for(var C=0;
C<A.length;
C++){var B=A[C];
if(B.name==F.getAttribute("name")){LOG.debug("Found same input on page with type: "+B.type);
B.value=F.getAttribute("value")
}}}}};
A4J.AJAX.finishRequest=function(D){var B=D.options;
var A=D.getElementById("org.ajax4jsf.oncomplete");
if(A){LOG.debug("Call request oncomplete function after processing updates");
window.setTimeout(function(){var G=D.domEvt;
var H=D.getJSON("_ajax:data");
try{var F=Sarissa.getText(A,true);
var E=new Function("request","event","data",F);
var J=null;
if(G){J=G.target?G.target:G.srcElement
}E.call(J,D,G,H)
}catch(I){LOG.error("Error evaluate oncomplete function "+I.Message)
}A4J.AJAX.status(D.containerId,B.status,false)
},0)
}else{if(B.oncomplete){LOG.debug("Call component oncomplete function after processing updates");
window.setTimeout(function(){B.oncomplete(D,D.domEvt,D.getJSON("_ajax:data"));
A4J.AJAX.status(D.containerId,B.status,false)
},0)
}else{A4J.AJAX.status(D.containerId,B.status,false)
}}if(B.eventsQueue){var C=A4J.AJAX._eventsQueues[B.eventsQueue];
if(C){if(C.wait){LOG.debug("Queue not empty, execute next request in queue "+B.eventsQueue);
A4J.AJAX.SubmiteventsQueue(C)
}else{A4J.AJAX._eventsQueues[B.eventsQueue]=false
}}}};
A4J.AJAX.getCursorPos=function(D){if(D.selectionEnd!=null){return D.selectionEnd
}var C=document.selection.createRange();
var B=C.compareEndPoints("StartToEnd",C)==0;
if(!B){C.collapse(false)
}var A=C.getBookmark();
return A.charCodeAt(2)-2
};
A4J.AJAX.locateForm=function(B){var A=B;
while(A&&A.nodeName.toLowerCase()!="form"){A=A.parentNode
}return A
};
A4J.AJAX.getElementById=function(E,B){var D=B["org.ajax4jsf.portlet.NAMESPACE"];
var A=D?window.document.getElementById(D):window.document;
var C;
if(A){C=A.getElementById(E)
}else{LOG.error("No root element for portlet namespace "+D+" on page")
}return C
};
A4J.AJAX._requestsCounts={};
A4J.AJAX.status=function(D,A,E){try{var B;
A=A||D+":status";
A4J.AJAX._requestsCounts[A]=(A4J.AJAX._requestsCounts[A]||0)+(E?1:-1);
if(A4J.AJAX._requestsCounts[A]>0){B=document.getElementById(A+".stop");
if(B){B.style.display="none"
}B=document.getElementById(A+".start");
if(B){B.style.display="";
if(typeof (B.onstart)=="function"){B.onstart()
}}}else{B=document.getElementById(A+".start");
if(B){B.style.display="none"
}B=document.getElementById(A+".stop");
if(B){B.style.display="";
if(typeof (B.onstop)=="function"){B.onstop()
}}}}catch(C){LOG.error("Exception on status change: ")
}};
A4J.Query=function(A,B){this._query={AJAXREQUEST:A};
this._oldSubmit=null;
this._form=B;
this._actionUrl=(this._form.action)?this._form.action:this._form
};
A4J.Query.prototype={_form:null,_actionUrl:null,_ext:"",_query:{},_oldSubmit:null,_pageBase:window.location.protocol+"//"+window.location.host,hidden:function(A){this._value_query(A);
if((A.name.length>4)&&(A.name.lastIndexOf("_idcl")==(A.name.length-5))){A.value=""
}else{if((A.name.length>12)&&(A.name.lastIndexOf("_link_hidden_")==(A.name.length-13))){A.value=""
}}},text:function(A){this._value_query(A)
},textarea:function(A){this._value_query(A)
},"select-one":function(A){if(A.selectedIndex!=-1){this._value_query(A)
}},password:function(A){this._value_query(A)
},file:function(A){this._value_query(A)
},radio:function(A){this._check_query(A)
},checkbox:function(A){this._check_query(A)
},"select-multiple":function(E){var B=E.name;
var A=E.options;
for(var C=0;
C<E.length;
C++){var D=A[C];
this._addOption(B,D)
}},_addOption:function(A,B){if(B.selected){if(!this._query[A]){this._query[A]=[]
}this._query[A][this._query[A].length]=B.value
}},image:function(B,A){if(A){this._value_query(B)
}},button:function(B,A){if(A){this._value_query(B)
}},submit:function(B,A){if(A){this._value_query(B)
}},link:function(B,A){if(A){this._value_query(B);
if(B.parameters){this.appendParameters(B.parameters)
}}},input:function(B,A){if(A){this.link(B,A);
if(B.control){this.appendControl(B.control,A)
}}},appendControl:function(B,A){if(this[B.type]){this[B.type](B,A)
}else{this._appendById(B.id||B)
}},appendFormControls:function(F,D){try{var C=this._form.elements;
if(C){var B=0;
for(B=0;
B<C.length;
B++){var E=C[B];
if(E==D){continue
}try{if(!F||E.type=="hidden"){this.appendControl(E,false)
}}catch(A){LOG.error("exception in building query ( append form control ) "+A)
}}}}catch(G){LOG.warn("Error with append form controls to query "+G)
}if(D){this.appendControl(D,true)
}},appendParameters:function(A){for(k in A){if(typeof Object.prototype[k]=="undefined"){LOG.debug("parameter "+k+" with value "+A[k]);
this.appendParameter(k,A[k])
}}},setActionUrl:function(A){this._actionUrl=A
},getActionUrl:function(A){var B=this._actionUrl;
var C=B.indexOf("?");
if(B.substring(0,1)=="/"){B=this._pageBase+B
}if(!A){A=this._ext
}if(C>=0){return B.substring(0,C)+A+B.substring(C)
}else{return B+A
}},getQueryString:function(){var A="";
var D;
for(var C in this._query){if(typeof Object.prototype[C]=="undefined"){D=this._query[C];
if(D instanceof Object){for(var B=0;
B<D.length;
B++){A+=this._encode(C)+"="+this._encode(D[B])+"&"
}}else{A+=this._encode(C)+"="+this._encode(D)+"&"
}}}LOG.debug("QueryString: "+A);
return A
},_appendById:function(A){this.appendParameter(this._form.id+"_link_hidden_",A)
},_value_query:function(A){if(A.name){LOG.debug("Append "+A.type+" control "+A.name+" with value ["+A.value+"] and value attribute ["+A.getAttribute("value")+"]");
if(null!=A.value){this.appendParameter(A.name,A.value)
}}else{LOG.debug("Ignored "+A.type+" no-name control with value ["+A.value+"] and value attribute ["+A.getAttribute("value")+"]")
}},_check_query:function(A){if(A.checked){this.appendParameter(A.name,A.value?A.value:"on")
}},appendParameter:function(A,B){if(!this._query[A]){this._query[A]=B;
return 
}else{if(!(this._query[A] instanceof Object)){this._query[A]=[this._query[A]]
}}this._query[A][this._query[A].length]=B
},_encode:function(A){try{return encodeURIComponent(A)
}catch(B){var C=escape(A);
return C.split("+").join("%2B")
}}};
A4J.AJAX.getText=function(G,C){var E="";
var B=G.childNodes;
for(var D=0;
D<B.length;
D++){var F=B[D];
var A=F.nodeType;
if(A==Node.TEXT_NODE||A==Node.CDATA_SECTION_NODE||(C&&A==Node.COMMENT_NODE)){E+=F.data
}else{if(A==Node.ELEMENT_NODE||A==Node.DOCUMENT_NODE||A==Node.DOCUMENT_FRAGMENT_NODE){E+=arguments.callee(F,C)
}}}return E
};
A4J.AJAX.isXhtmlScriptMode=function(){if(!this._xhtmlScriptMode){var A=document.createElement("div");
A.innerHTML="<script type='text/javascript'><!--\r\n/**/\r\n//--><\/script>";
var C=false;
var B=A.firstChild;
while(B){if(B.nodeType==Node.ELEMENT_NODE){var D=B.firstChild;
while(D){if(D.nodeType==Node.COMMENT_NODE){C=true;
break
}D=D.nextSibling
}break
}B=B.nextSibling
}if(C){this._xhtmlScriptMode=2
}else{this._xhtmlScriptMode=1
}}return this._xhtmlScriptMode>1
};
A4J.AJAX._scriptEvaluated=false;
A4J.AJAX.TestScriptEvaluation=function(){if((!document.all||window.opera)&&!A4J.AJAX._scriptTested){try{var C=Sarissa.getDomDocument();
var A=document.createElement("span");
document.body.appendChild(A);
var F="<html xmlns='http://www.w3.org/1999/xhtml'><script>A4J.AJAX._scriptEvaluated=true;<\/script></html>";
C=(new DOMParser()).parseFromString(F,"text/xml");
var B=C.getElementsByTagName("script")[0];
if(!window.opera&&A.outerHTML){A.outerHTML=new XMLSerializer().serializeToString(B)
}else{var E;
E=window.document.importNode(B,true);
document.body.replaceChild(E,A)
}}catch(D){}}A4J.AJAX._scriptTested=true
};
if(!window.LOG){window.LOG={}
}LOG.Level=function(B,C,A){this.name=B;
this.priority=C;
if(A){this.color=A
}};
LOG.OFF=new LOG.Level("off",1000);
LOG.FATAL=new LOG.Level("fatal",900,"red");
LOG.ERROR=new LOG.Level("error",800,"red");
LOG.WARN=new LOG.Level("warn",500,"yellow");
LOG.INFO=new LOG.Level("info",400,"blue");
LOG.DEBUG=new LOG.Level("debug",300,"darkblue");
LOG.ALL=new LOG.Level("all",100);
LOG.A4J_DEBUG=new LOG.Level("a4j_debug",0,"green");
LOG.LEVEL=LOG.OFF;
LOG._window=null;
LOG.transmitToServer=true;
LOG.consoleDivId="logConsole";
LOG.styles={a4j_debug:"green",debug:"darkblue",info:"blue",warn:"yellow",error:"red",fatal:"red"};
LOG.a4j_debug=function(B,A){LOG._log(B,LOG.A4J_DEBUG,A)
};
LOG.debug=function(B,A){LOG._log(B,LOG.DEBUG,A)
};
LOG.info=function(B,A){LOG._log(B,LOG.INFO,A)
};
LOG.warn=function(B,A){LOG._log(B,LOG.WARN,A)
};
LOG.error=function(B,A){LOG._log(B,LOG.ERROR,A)
};
LOG.fatal=function(B,A){LOG._log(B,LOG.FATAL,A)
};
LOG.registerPopup=function(B,C,E,A,F){if(!LOG._onkeydown){LOG._onkeydown=document.onkeydown
}var D=B.toUpperCase();
document.onkeydown=function(G){if(window.event){G=window.event
}if(String.fromCharCode(G.keyCode)==D&G.shiftKey&G.ctrlKey){LOG.LEVEL=F;
LOG.openWindow(C,"width="+E+",height="+A+",toolbar=no,scrollbars=yes,location=no,statusbar=no,menubar=no,resizable=yes,left = "+((screen.width-E)/2)+",top ="+((screen.height-A)/2))
}else{if(LOG._onkeydown){LOG._onkeydown(G)
}}}
};
LOG.clear=function(){if(LOG._window&&LOG._window.document){consoleDiv=LOG._window.document.body
}else{consoleDiv=window.document.getElementById(LOG.consoleDivId)
}consoleDiv.innerHTML='<button onclick="LOG.clear()">Clear</button><br />'
};
LOG.openWindow=function(B,C){if(LOG._window){LOG._window.focus()
}else{LOG._window=window.open("",B,C);
LOG._window.LOG=LOG;
LOG.clear();
var A=LOG;
LOG._window.onunload=function(){A._window.LOG=null;
A._window=null;
A.LEVEL=A.OFF;
A=undefined
}
}};
LOG._log=function(C,A,B){if(A.priority>=LOG.LEVEL.priority){LOG._logToConsole(C,A,B);
if(LOG.transmitToServer){LOG._logToServer(C,A)
}}};
LOG._time=function(){var D=new Date();
var A=D.getHours();
var C=D.getMinutes();
if(C<10){C="0"+C
}var E=D.getSeconds();
if(E<10){E="0"+E
}var B=D.getTime()%1000;
if(B<100){B="0"+B
}if(B<10){B="0"+B
}return A+":"+C+":"+E+","+B
};
LOG._logToConsole=function(C,B,E){var F;
var G;
if(LOG._window&&LOG._window.document){G=LOG._window.document;
F=LOG._window.document.body
}else{G=window.document;
F=window.document.getElementById(LOG.consoleDivId)
}if(F){var H=G.createElement("span");
H.style.color=B.color;
H.appendChild(G.createTextNode(B.name+"["+LOG._time()+"]: "));
var A=G.createElement("div");
var I=G.createTextNode(C);
A.appendChild(H);
A.appendChild(I);
if(E){var D=G.createElement("span");
I=G.createTextNode(E);
D.appendChild(I);
A.appendChild(D)
}F.appendChild(A)
}else{}};
LOG._logToServer=function(C,A){var B=A.name.substring(0,1)+C
};
LOG._requestCallBack=function(){};
if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.Memory){window.RichFaces.Memory={cleaners:{},addCleaner:function(A,B){this.cleaners[A]=B
},applyCleaners:function(B){for(var A in this.cleaners){this.cleaners[A](B)
}},clean:function(E){if(E){this.applyCleaners(E);
var B=E.all;
if(B){var A=0;
var D=B.length;
for(var A=0;
A<D;
A++){this.applyCleaners(B[A])
}}else{var C=E.firstChild;
while(C){this.clean(C);
C=C.nextSibling
}}}}};
window.RichFaces.Memory.addCleaner("richfaces",function(D){var B=D.component;
if(B){var C=B["rich:destructor"];
if(C){var A=B[C];
if(A){A.call(B)
}}}});
if(window.attachEvent){window.attachEvent("onunload",function(){var A=window.RichFaces.Memory;
A.clean(document);
A.clean(window)
})
}}
var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(A){A=A.toUpperCase();
var F=this.NODEMAP[A]||"div";
var B=document.createElement(F);
try{B.innerHTML="<"+A+"></"+A+">"
}catch(E){}var D=B.firstChild||null;
if(D&&(D.tagName.toUpperCase()!=A)){D=D.getElementsByTagName(A)[0]
}if(!D){D=document.createElement(A)
}if(!D){return 
}if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)||arguments[1].tagName){this._children(D,arguments[1])
}else{var C=this._attributes(arguments[1]);
if(C.length){try{B.innerHTML="<"+A+" "+C+"></"+A+">"
}catch(E){}D=B.firstChild||null;
if(!D){D=document.createElement(A);
for(attr in arguments[1]){D[attr=="class"?"className":attr]=arguments[1][attr]
}}if(D.tagName.toUpperCase()!=A){D=B.getElementsByTagName(A)[0]
}}}}if(arguments[2]){this._children(D,arguments[2])
}return D
},_text:function(A){return document.createTextNode(A)
},ATTR_MAP:{"className":"class","htmlFor":"for"},_attributes:function(A){var B=[];
for(attribute in A){B.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+A[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"')
}return B.join(" ")
},_children:function(B,A){if(A.tagName){B.appendChild(A);
return 
}if(typeof A=="object"){A.flatten().each(function(C){if(typeof C=="object"){B.appendChild(C)
}else{if(Builder._isStringOrNumber(C)){B.appendChild(Builder._text(C))
}}})
}else{if(Builder._isStringOrNumber(A)){B.appendChild(Builder._text(A))
}}},_isStringOrNumber:function(A){return(typeof A=="string"||typeof A=="number")
},build:function(B){var A=this.node("div");
$(A).update(B.strip());
return A.down()
},dump:function(B){if(typeof B!="object"&&typeof B!="function"){B=window
}var A=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);
A.each(function(C){B[C]=function(){return Builder.node.apply(Builder,[C].concat($A(arguments)))
}
})
}};
String.prototype.parseColor=function(){var A="#";
if(this.slice(0,4)=="rgb("){var C=this.slice(4,this.length-1).split(",");
var B=0;
do{A+=parseInt(C[B]).toColorPart()
}while(++B<3)
}else{if(this.slice(0,1)=="#"){if(this.length==4){for(var B=1;
B<4;
B++){A+=(this.charAt(B)+this.charAt(B)).toLowerCase()
}}if(this.length==7){A=this.toLowerCase()
}}}return(A.length==7?A:(arguments[0]||this))
};
Element.collectTextNodes=function(A){return $A($(A).childNodes).collect(function(B){return(B.nodeType==3?B.nodeValue:(B.hasChildNodes()?Element.collectTextNodes(B):""))
}).flatten().join("")
};
Element.collectTextNodesIgnoreClass=function(A,B){return $A($(A).childNodes).collect(function(C){return(C.nodeType==3?C.nodeValue:((C.hasChildNodes()&&!Element.hasClassName(C,B))?Element.collectTextNodesIgnoreClass(C,B):""))
}).flatten().join("")
};
Element.setContentZoom=function(A,B){A=$(A);
A.setStyle({fontSize:(B/100)+"em"});
if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}return A
};
Element.getInlineOpacity=function(A){return $(A).style.opacity||""
};
Element.forceRerendering=function(A){try{A=$(A);
var C=document.createTextNode(" ");
A.appendChild(C);
A.removeChild(C)
}catch(B){}};
var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(A){return(-Math.cos(A*Math.PI)/2)+0.5
},reverse:function(A){return 1-A
},flicker:function(A){var A=((-Math.cos(A*Math.PI)/4)+0.75)+Math.random()/4;
return A>1?1:A
},wobble:function(A){return(-Math.cos(A*Math.PI*(9*A))/2)+0.5
},pulse:function(B,A){A=A||5;
return(((B%(1/A))*A).round()==0?((B*A*2)-(B*A*2).floor()):1-((B*A*2)-(B*A*2).floor()))
},spring:function(A){return 1-(Math.cos(A*4.5*Math.PI)*Math.exp(-A*6))
},none:function(A){return 0
},full:function(A){return 1
}},DefaultOptions:{duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(A){var B="position:relative";
if(Prototype.Browser.IE){B+=";zoom:1"
}A=$(A);
$A(A.childNodes).each(function(C){if(C.nodeType==3){C.nodeValue.toArray().each(function(D){A.insertBefore(new Element("span",{style:B}).update(D==" "?String.fromCharCode(160):D),C)
});
Element.remove(C)
}})
},multiple:function(B,C){var E;
if(((typeof B=="object")||Object.isFunction(B))&&(B.length)){E=B
}else{E=$(B).childNodes
}var A=Object.extend({speed:0.1,delay:0},arguments[2]||{});
var D=A.delay;
$A(E).each(function(G,F){new C(G,Object.extend(A,{delay:F*A.speed+D}))
})
},PAIRS:{"slide":["SlideDown","SlideUp"],"blind":["BlindDown","BlindUp"],"appear":["Appear","Fade"]},toggle:function(B,C){B=$(B);
C=(C||"appear").toLowerCase();
var A=Object.extend({queue:{position:"end",scope:(B.id||"global"),limit:1}},arguments[2]||{});
Effect[B.visible()?Effect.PAIRS[C][1]:Effect.PAIRS[C][0]](B,A)
}};
Effect.DefaultOptions.transition=Effect.Transitions.sinoidal;
Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[];
this.interval=null
},_each:function(A){this.effects._each(A)
},add:function(B){var C=new Date().getTime();
var A=Object.isString(B.options.queue)?B.options.queue:B.options.queue.position;
switch(A){case"front":this.effects.findAll(function(D){return D.state=="idle"
}).each(function(D){D.startOn+=B.finishOn;
D.finishOn+=B.finishOn
});
break;
case"with-last":C=this.effects.pluck("startOn").max()||C;
break;
case"end":C=this.effects.pluck("finishOn").max()||C;
break
}B.startOn+=C;
B.finishOn+=C;
if(!B.options.queue.limit||(this.effects.length<B.options.queue.limit)){this.effects.push(B)
}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15)
}},remove:function(A){this.effects=this.effects.reject(function(B){return B==A
});
if(this.effects.length==0){clearInterval(this.interval);
this.interval=null
}},loop:function(){var C=new Date().getTime();
for(var B=0,A=this.effects.length;
B<A;
B++){this.effects[B]&&this.effects[B].loop(C)
}}});
Effect.Queues={instances:$H(),get:function(A){if(!Object.isString(A)){return A
}return this.instances.get(A)||this.instances.set(A,new Effect.ScopedQueue())
}};
Effect.Queue=Effect.Queues.get("global");
Effect.Base=Class.create({position:null,start:function(options){function codeForEvent(options,eventName){return((options[eventName+"Internal"]?"this.options."+eventName+"Internal(this);":"")+(options[eventName]?"this.options."+eventName+"(this);":""))
}if(options&&options.transition===false){options.transition=Effect.Transitions.linear
}this.options=Object.extend(Object.extend({},Effect.DefaultOptions),options||{});
this.currentFrame=0;
this.state="idle";
this.startOn=this.options.delay*1000;
this.finishOn=this.startOn+(this.options.duration*1000);
this.fromToDelta=this.options.to-this.options.from;
this.totalTime=this.finishOn-this.startOn;
this.totalFrames=this.options.fps*this.options.duration;
eval('this.render = function(pos){ if (this.state=="idle"){this.state="running";'+codeForEvent(this.options,"beforeSetup")+(this.setup?"this.setup();":"")+codeForEvent(this.options,"afterSetup")+'};if (this.state=="running"){pos=this.options.transition(pos)*'+this.fromToDelta+"+"+this.options.from+";this.position=pos;"+codeForEvent(this.options,"beforeUpdate")+(this.update?"this.update(pos);":"")+codeForEvent(this.options,"afterUpdate")+"}}");
this.event("beforeStart");
if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this)
}},loop:function(C){if(C>=this.startOn){if(C>=this.finishOn){this.render(1);
this.cancel();
this.event("beforeFinish");
if(this.finish){this.finish()
}this.event("afterFinish");
return 
}var B=(C-this.startOn)/this.totalTime,A=(B*this.totalFrames).round();
if(A>this.currentFrame){this.render(B);
this.currentFrame=A
}}},cancel:function(){if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).remove(this)
}this.state="finished"
},event:function(A){if(this.options[A+"Internal"]){this.options[A+"Internal"](this)
}if(this.options[A]){this.options[A](this)
}},inspect:function(){var A=$H();
for(property in this){if(!Object.isFunction(this[property])){A.set(property,this[property])
}}return"#<Effect:"+A.inspect()+",options:"+$H(this.options).inspect()+">"
}});
Effect.Parallel=Class.create(Effect.Base,{initialize:function(A){this.effects=A||[];
this.start(arguments[1])
},update:function(A){this.effects.invoke("render",A)
},finish:function(A){this.effects.each(function(B){B.render(1);
B.cancel();
B.event("beforeFinish");
if(B.finish){B.finish(A)
}B.event("afterFinish")
})
}});
Effect.Tween=Class.create(Effect.Base,{initialize:function(C,F,E){C=Object.isString(C)?$(C):C;
var B=$A(arguments),D=B.last(),A=B.length==5?B[3]:null;
this.method=Object.isFunction(D)?D.bind(C):Object.isFunction(C[D])?C[D].bind(C):function(G){C[D]=G
};
this.start(Object.extend({from:F,to:E},A||{}))
},update:function(A){this.method(A)
}});
Effect.Event=Class.create(Effect.Base,{initialize:function(){this.start(Object.extend({duration:0},arguments[0]||{}))
},update:Prototype.emptyFunction});
Effect.Opacity=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})
}var A=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});
this.start(A)
},update:function(A){this.element.setOpacity(A)
}});
Effect.Move=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});
this.start(A)
},setup:function(){this.element.makePositioned();
this.originalLeft=parseFloat(this.element.getStyle("left")||"0");
this.originalTop=parseFloat(this.element.getStyle("top")||"0");
if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;
this.options.y=this.options.y-this.originalTop
}},update:function(A){this.element.setStyle({left:(this.options.x*A+this.originalLeft).round()+"px",top:(this.options.y*A+this.originalTop).round()+"px"})
}});
Effect.MoveBy=function(B,A,C){return new Effect.Move(B,Object.extend({x:C,y:A},arguments[3]||{}))
};
Effect.Scale=Class.create(Effect.Base,{initialize:function(B,C){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:C},arguments[2]||{});
this.start(A)
},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;
this.elementPositioning=this.element.getStyle("position");
this.originalStyle={};
["top","left","width","height","fontSize"].each(function(B){this.originalStyle[B]=this.element.style[B]
}.bind(this));
this.originalTop=this.element.offsetTop;
this.originalLeft=this.element.offsetLeft;
var A=this.element.getStyle("font-size")||"100%";
["em","px","%","pt"].each(function(B){if(A.indexOf(B)>0){this.fontSize=parseFloat(A);
this.fontSizeType=B
}}.bind(this));
this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;
this.dims=null;
if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth]
}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth]
}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]
}},update:function(A){var B=(this.options.scaleFrom/100)+(this.factor*A);
if(this.options.scaleContent&&this.fontSize){this.element.setStyle({fontSize:this.fontSize*B+this.fontSizeType})
}this.setDimensions(this.dims[0]*B,this.dims[1]*B)
},finish:function(A){if(this.restoreAfterFinish){this.element.setStyle(this.originalStyle)
}},setDimensions:function(A,D){var E={};
if(this.options.scaleX){E.width=D.round()+"px"
}if(this.options.scaleY){E.height=A.round()+"px"
}if(this.options.scaleFromCenter){var C=(A-this.dims[0])/2;
var B=(D-this.dims[1])/2;
if(this.elementPositioning=="absolute"){if(this.options.scaleY){E.top=this.originalTop-C+"px"
}if(this.options.scaleX){E.left=this.originalLeft-B+"px"
}}else{if(this.options.scaleY){E.top=-C+"px"
}if(this.options.scaleX){E.left=-B+"px"
}}}this.element.setStyle(E)
}});
Effect.Highlight=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({startcolor:"#ffff99"},arguments[1]||{});
this.start(A)
},setup:function(){if(this.element.getStyle("display")=="none"){this.cancel();
return 
}this.oldStyle={};
if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=this.element.getStyle("background-image");
this.element.setStyle({backgroundImage:"none"})
}if(!this.options.endcolor){this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff")
}if(!this.options.restorecolor){this.options.restorecolor=this.element.getStyle("background-color")
}this._base=$R(0,2).map(function(A){return parseInt(this.options.startcolor.slice(A*2+1,A*2+3),16)
}.bind(this));
this._delta=$R(0,2).map(function(A){return parseInt(this.options.endcolor.slice(A*2+1,A*2+3),16)-this._base[A]
}.bind(this))
},update:function(A){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(B,C,D){return B+((this._base[D]+(this._delta[D]*A)).round().toColorPart())
}.bind(this))})
},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))
}});
Effect.ScrollTo=function(D){var C=arguments[1]||{},B=document.viewport.getScrollOffsets(),E=$(D).cumulativeOffset(),A=(window.height||document.body.scrollHeight)-document.viewport.getHeight();
if(C.offset){E[1]+=C.offset
}return new Effect.Tween(null,B.top,E[1]>A?A:E[1],C,function(F){scrollTo(B.left,F.round())
})
};
Effect.Fade=function(C){C=$(C);
var A=C.getInlineOpacity();
var B=Object.extend({from:C.getOpacity()||1,to:0,afterFinishInternal:function(D){if(D.options.to!=0){return 
}D.element.hide().setStyle({opacity:A})
}},arguments[1]||{});
return new Effect.Opacity(C,B)
};
Effect.Appear=function(B){B=$(B);
var A=Object.extend({from:(B.getStyle("display")=="none"?0:B.getOpacity()||0),to:1,afterFinishInternal:function(C){C.element.forceRerendering()
},beforeSetup:function(C){C.element.setOpacity(C.options.from).show()
}},arguments[1]||{});
return new Effect.Opacity(B,A)
};
Effect.Puff=function(B){B=$(B);
var A={opacity:B.getInlineOpacity(),position:B.getStyle("position"),top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};
return new Effect.Parallel([new Effect.Scale(B,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(C){Position.absolutize(C.effects[0].element)
},afterFinishInternal:function(C){C.effects[0].element.hide().setStyle(A)
}},arguments[1]||{}))
};
Effect.BlindUp=function(A){A=$(A);
A.makeClipping();
return new Effect.Scale(A,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(B){B.element.hide().undoClipping()
}},arguments[1]||{}))
};
Effect.BlindDown=function(B){B=$(B);
var A=B.getDimensions();
return new Effect.Scale(B,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:A.height,originalWidth:A.width},restoreAfterFinish:true,afterSetup:function(C){C.element.makeClipping().setStyle({height:"0px"}).show()
},afterFinishInternal:function(C){C.element.undoClipping()
}},arguments[1]||{}))
};
Effect.SwitchOff=function(B){B=$(B);
var A=B.getInlineOpacity();
return new Effect.Appear(B,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(C){new Effect.Scale(C.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(D){D.element.makePositioned().makeClipping()
},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned().setStyle({opacity:A})
}})
}},arguments[1]||{}))
};
Effect.DropOut=function(B){B=$(B);
var A={top:B.getStyle("top"),left:B.getStyle("left"),opacity:B.getInlineOpacity()};
return new Effect.Parallel([new Effect.Move(B,{x:0,y:100,sync:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(C){C.effects[0].element.makePositioned()
},afterFinishInternal:function(C){C.effects[0].element.hide().undoPositioned().setStyle(A)
}},arguments[1]||{}))
};
Effect.Shake=function(D){D=$(D);
var B=Object.extend({distance:20,duration:0.5},arguments[1]||{});
var E=parseFloat(B.distance);
var C=parseFloat(B.duration)/10;
var A={top:D.getStyle("top"),left:D.getStyle("left")};
return new Effect.Move(D,{x:E,y:0,duration:C,afterFinishInternal:function(F){new Effect.Move(F.element,{x:-E*2,y:0,duration:C*2,afterFinishInternal:function(G){new Effect.Move(G.element,{x:E*2,y:0,duration:C*2,afterFinishInternal:function(H){new Effect.Move(H.element,{x:-E*2,y:0,duration:C*2,afterFinishInternal:function(I){new Effect.Move(I.element,{x:E*2,y:0,duration:C*2,afterFinishInternal:function(J){new Effect.Move(J.element,{x:-E,y:0,duration:C,afterFinishInternal:function(K){K.element.undoPositioned().setStyle(A)
}})
}})
}})
}})
}})
}})
};
Effect.SlideDown=function(C){C=$(C).cleanWhitespace();
var A=C.down().getStyle("bottom");
var B=C.getDimensions();
return new Effect.Scale(C,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();
D.element.down().makePositioned();
if(window.opera){D.element.setStyle({top:""})
}D.element.makeClipping().setStyle({height:"0px"}).show()
},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})
},afterFinishInternal:function(D){D.element.undoClipping().undoPositioned();
D.element.down().undoPositioned().setStyle({bottom:A})
}},arguments[1]||{}))
};
Effect.SlideUp=function(C){C=$(C).cleanWhitespace();
var A=C.down().getStyle("bottom");
var B=C.getDimensions();
return new Effect.Scale(C,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();
D.element.down().makePositioned();
if(window.opera){D.element.setStyle({top:""})
}D.element.makeClipping().show()
},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})
},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned();
D.element.down().undoPositioned().setStyle({bottom:A})
}},arguments[1]||{}))
};
Effect.Squish=function(A){return new Effect.Scale(A,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(B){B.element.makeClipping()
},afterFinishInternal:function(B){B.element.hide().undoClipping()
}})
};
Effect.Grow=function(C){C=$(C);
var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});
var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};
var G=C.getDimensions();
var H,F;
var E,D;
switch(B.direction){case"top-left":H=F=E=D=0;
break;
case"top-right":H=G.width;
F=D=0;
E=-G.width;
break;
case"bottom-left":H=E=0;
F=G.height;
D=-G.height;
break;
case"bottom-right":H=G.width;
F=G.height;
E=-G.width;
D=-G.height;
break;
case"center":H=G.width/2;
F=G.height/2;
E=-G.width/2;
D=-G.height/2;
break
}return new Effect.Move(C,{x:H,y:F,duration:0.01,beforeSetup:function(I){I.element.hide().makeClipping().makePositioned()
},afterFinishInternal:function(I){new Effect.Parallel([new Effect.Opacity(I.element,{sync:true,to:1,from:0,transition:B.opacityTransition}),new Effect.Move(I.element,{x:E,y:D,sync:true,transition:B.moveTransition}),new Effect.Scale(I.element,100,{scaleMode:{originalHeight:G.height,originalWidth:G.width},sync:true,scaleFrom:window.opera?1:0,transition:B.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(J){J.effects[0].element.setStyle({height:"0px"}).show()
},afterFinishInternal:function(J){J.effects[0].element.undoClipping().undoPositioned().setStyle(A)
}},B))
}})
};
Effect.Shrink=function(C){C=$(C);
var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});
var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};
var F=C.getDimensions();
var E,D;
switch(B.direction){case"top-left":E=D=0;
break;
case"top-right":E=F.width;
D=0;
break;
case"bottom-left":E=0;
D=F.height;
break;
case"bottom-right":E=F.width;
D=F.height;
break;
case"center":E=F.width/2;
D=F.height/2;
break
}return new Effect.Parallel([new Effect.Opacity(C,{sync:true,to:0,from:1,transition:B.opacityTransition}),new Effect.Scale(C,window.opera?1:0,{sync:true,transition:B.scaleTransition,restoreAfterFinish:true}),new Effect.Move(C,{x:E,y:D,sync:true,transition:B.moveTransition})],Object.extend({beforeStartInternal:function(G){G.effects[0].element.makePositioned().makeClipping()
},afterFinishInternal:function(G){G.effects[0].element.hide().undoClipping().undoPositioned().setStyle(A)
}},B))
};
Effect.Pulsate=function(C){C=$(C);
var B=arguments[1]||{};
var A=C.getInlineOpacity();
var E=B.transition||Effect.Transitions.sinoidal;
var D=function(F){return E(1-Effect.Transitions.pulse(F,B.pulses))
};
D.bind(E);
return new Effect.Opacity(C,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(F){F.element.setStyle({opacity:A})
}},B),{transition:D}))
};
Effect.Fold=function(B){B=$(B);
var A={top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};
B.makeClipping();
return new Effect.Scale(B,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(C){new Effect.Scale(B,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(D){D.element.hide().undoClipping().setStyle(A)
}})
}},arguments[1]||{}))
};
Effect.Morph=Class.create(Effect.Base,{initialize:function(C){this.element=$(C);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({style:{}},arguments[1]||{});
if(!Object.isString(A.style)){this.style=$H(A.style)
}else{if(A.style.include(":")){this.style=A.style.parseStyle()
}else{this.element.addClassName(A.style);
this.style=$H(this.element.getStyles());
this.element.removeClassName(A.style);
var B=this.element.getStyles();
this.style=this.style.reject(function(D){return D.value==B[D.key]
});
A.afterFinishInternal=function(D){D.element.addClassName(D.options.style);
D.transforms.each(function(E){D.element.style[E.style]=""
})
}
}}this.start(A)
},setup:function(){function A(B){if(!B||["rgba(0, 0, 0, 0)","transparent"].include(B)){B="#ffffff"
}B=B.parseColor();
return $R(0,2).map(function(C){return parseInt(B.slice(C*2+1,C*2+3),16)
})
}this.transforms=this.style.map(function(G){var F=G[0],E=G[1],D=null;
if(E.parseColor("#zzzzzz")!="#zzzzzz"){E=E.parseColor();
D="color"
}else{if(F=="opacity"){E=parseFloat(E);
if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})
}}else{if(Element.CSS_LENGTH.test(E)){var C=E.match(/^([\+\-]?[0-9\.]+)(.*)$/);
E=parseFloat(C[1]);
D=(C.length==3)?C[2]:null
}}}var B=this.element.getStyle(F);
return{style:F.camelize(),originalValue:D=="color"?A(B):parseFloat(B||0),targetValue:D=="color"?A(E):E,unit:D}
}.bind(this)).reject(function(B){return((B.originalValue==B.targetValue)||(B.unit!="color"&&(isNaN(B.originalValue)||isNaN(B.targetValue))))
})
},update:function(A){var D={},B,C=this.transforms.length;
while(C--){D[(B=this.transforms[C]).style]=B.unit=="color"?"#"+(Math.round(B.originalValue[0]+(B.targetValue[0]-B.originalValue[0])*A)).toColorPart()+(Math.round(B.originalValue[1]+(B.targetValue[1]-B.originalValue[1])*A)).toColorPart()+(Math.round(B.originalValue[2]+(B.targetValue[2]-B.originalValue[2])*A)).toColorPart():(B.originalValue+(B.targetValue-B.originalValue)*A).toFixed(3)+(B.unit===null?"":B.unit)
}this.element.setStyle(D,true)
}});
Effect.Transform=Class.create({initialize:function(A){this.tracks=[];
this.options=arguments[1]||{};
this.addTracks(A)
},addTracks:function(A){A.each(function(B){B=$H(B);
var C=B.values().first();
this.tracks.push($H({ids:B.keys().first(),effect:Effect.Morph,options:{style:C}}))
}.bind(this));
return this
},play:function(){return new Effect.Parallel(this.tracks.map(function(A){var D=A.get("ids"),C=A.get("effect"),B=A.get("options");
var E=[$(D)||$$(D)].flatten();
return E.map(function(F){return new C(F,Object.extend({sync:true},B))
})
}).flatten(),this.options)
}});
Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.__parseStyleElement=document.createElement("div");
String.prototype.parseStyle=function(){var B,A=$H();
if(Prototype.Browser.WebKit){B=new Element("div",{style:this}).style
}else{String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>';
B=String.__parseStyleElement.childNodes[0].style
}Element.CSS_PROPERTIES.each(function(C){if(B[C]){A.set(C,B[C])
}});
if(Prototype.Browser.IE&&this.include("opacity")){A.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1])
}return A
};
if(document.defaultView&&document.defaultView.getComputedStyle){Element.getStyles=function(B){var A=document.defaultView.getComputedStyle($(B),null);
return Element.CSS_PROPERTIES.inject({},function(C,D){C[D]=A[D];
return C
})
}
}else{Element.getStyles=function(B){B=$(B);
var A=B.currentStyle,C;
C=Element.CSS_PROPERTIES.inject({},function(D,E){D[E]=A[E];
return D
});
if(!C.opacity){C.opacity=B.getOpacity()
}return C
}
}Effect.Methods={morph:function(A,B){A=$(A);
new Effect.Morph(A,Object.extend({style:B},arguments[2]||{}));
return A
},visualEffect:function(C,E,B){C=$(C);
var D=E.dasherize().camelize(),A=D.charAt(0).toUpperCase()+D.substring(1);
new Effect[A](C,B);
return C
},highlight:function(B,A){B=$(B);
new Effect.Highlight(B,A);
return B
}};
$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(A){Effect.Methods[A]=function(C,B){C=$(C);
Effect[A.charAt(0).toUpperCase()+A.substring(1)](C,B);
return C
}
});
$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(A){Effect.Methods[A]=Element[A]
});
Element.addMethods(Effect.Methods);
if(Object.isUndefined(Effect)){throw ("dragdrop.js requires including script.aculo.us' effects.js library")
}var Droppables={drops:[],remove:function(A){this.drops=this.drops.reject(function(B){return B.element==$(A)
})
},add:function(B){B=$(B);
var A=Object.extend({greedy:true,hoverclass:null,tree:false},arguments[1]||{});
if(A.containment){A._containers=[];
var C=A.containment;
if(Object.isArray(C)){C.each(function(D){A._containers.push($(D))
})
}else{A._containers.push($(C))
}}if(A.accept){A.accept=[A.accept].flatten()
}Element.makePositioned(B);
A.element=B;
this.drops.push(A)
},findDeepestChild:function(A){deepest=A[0];
for(i=1;
i<A.length;
++i){if(Element.isParent(A[i].element,deepest.element)){deepest=A[i]
}}return deepest
},isContained:function(B,A){var C;
if(A.tree){C=B.treeNode
}else{C=B.parentNode
}return A._containers.detect(function(D){return C==D
})
},isAffected:function(A,C,B){return((B.element!=C)&&((!B._containers)||this.isContained(C,B))&&((!B.accept)||(Element.classNames(C).detect(function(D){return B.accept.include(D)
})))&&Position.within(B.element,A[0],A[1]))
},deactivate:function(A){if(A.hoverclass){Element.removeClassName(A.element,A.hoverclass)
}this.last_active=null
},activate:function(A){if(A.hoverclass){Element.addClassName(A.element,A.hoverclass)
}this.last_active=A
},show:function(A,C){if(!this.drops.length){return 
}var B,D=[];
this.drops.each(function(E){if(Droppables.isAffected(A,C,E)){D.push(E)
}});
if(D.length>0){B=Droppables.findDeepestChild(D)
}if(this.last_active&&this.last_active!=B){this.deactivate(this.last_active)
}if(B){Position.within(B.element,A[0],A[1]);
if(B.onHover){B.onHover(C,B.element,Position.overlap(B.overlap,B.element))
}if(B!=this.last_active){Droppables.activate(B)
}}},fire:function(B,A){if(!this.last_active){return 
}Position.prepare();
if(this.isAffected([Event.pointerX(B),Event.pointerY(B)],A,this.last_active)){if(this.last_active.onDrop){this.last_active.onDrop(A,this.last_active.element,B);
return true
}}},reset:function(){if(this.last_active){this.deactivate(this.last_active)
}}};
var Draggables={drags:[],observers:[],register:function(A){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.updateDrag.bindAsEventListener(this);
this.eventKeypress=this.keyPress.bindAsEventListener(this);
Event.observe(document,"mouseup",this.eventMouseUp);
Event.observe(document,"mousemove",this.eventMouseMove);
Event.observe(document,"keypress",this.eventKeypress)
}this.drags.push(A)
},unregister:function(A){this.drags=this.drags.reject(function(B){return B==A
});
if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
Event.stopObserving(document,"keypress",this.eventKeypress)
}},activate:function(A){if(A.options.delay){this._timeout=setTimeout(function(){Draggables._timeout=null;
window.focus();
Draggables.activeDraggable=A
}.bind(this),A.options.delay)
}else{window.focus();
this.activeDraggable=A
}},deactivate:function(){this.activeDraggable=null
},updateDrag:function(A){if(!this.activeDraggable){return 
}var B=[Event.pointerX(A),Event.pointerY(A)];
if(this._lastPointer&&(this._lastPointer.inspect()==B.inspect())){return 
}this._lastPointer=B;
this.activeDraggable.updateDrag(A,B)
},endDrag:function(A){if(this._timeout){clearTimeout(this._timeout);
this._timeout=null
}if(!this.activeDraggable){return 
}this._lastPointer=null;
this.activeDraggable.endDrag(A);
this.activeDraggable=null
},keyPress:function(A){if(this.activeDraggable){this.activeDraggable.keyPress(A)
}},addObserver:function(A){this.observers.push(A);
this._cacheObserverCallbacks()
},removeObserver:function(A){this.observers=this.observers.reject(function(B){return B.element==A
});
this._cacheObserverCallbacks()
},notify:function(B,A,C){if(this[B+"Count"]>0){this.observers.each(function(D){if(D[B]){D[B](B,A,C)
}})
}if(A.options[B]){A.options[B](A,C)
}},_cacheObserverCallbacks:function(){["onStart","onEnd","onDrag"].each(function(A){Draggables[A+"Count"]=Draggables.observers.select(function(B){return B[A]
}).length
})
}};
var Draggable=Class.create({initialize:function(B){var C={handle:false,reverteffect:function(F,E,D){var G=Math.sqrt(Math.abs(E^2)+Math.abs(D^2))*0.02;
new Effect.Move(F,{x:-D,y:-E,duration:G,queue:{scope:"_draggable",position:"end"}})
},endeffect:function(E){var D=Object.isNumber(E._opacity)?E._opacity:1;
new Effect.Opacity(E,{duration:0.2,from:0.7,to:D,queue:{scope:"_draggable",position:"end"},afterFinish:function(){Draggable._dragging[E]=false
}})
},zindex:1000,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};
if(!arguments[1]||Object.isUndefined(arguments[1].endeffect)){Object.extend(C,{starteffect:function(D){D._opacity=Element.getOpacity(D);
Draggable._dragging[D]=true;
new Effect.Opacity(D,{duration:0.2,from:D._opacity,to:0.7})
}})
}var A=Object.extend(C,arguments[1]||{});
this.element=$(B);
if(A.handle&&Object.isString(A.handle)){this.handle=this.element.down("."+A.handle,0)
}if(!this.handle){this.handle=$(A.handle)
}if(!this.handle){this.handle=this.element
}if(A.scroll&&!A.scroll.scrollTo&&!A.scroll.outerHTML){A.scroll=$(A.scroll);
this._isScrollChild=Element.childOf(this.element,A.scroll)
}Element.makePositioned(this.element);
this.options=A;
this.dragging=false;
this.eventMouseDown=this.initDrag.bindAsEventListener(this);
Event.observe(this.handle,"mousedown",this.eventMouseDown);
Draggables.register(this)
},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);
Draggables.unregister(this)
},currentDelta:function(){return([parseInt(Element.getStyle(this.element,"left")||"0"),parseInt(Element.getStyle(this.element,"top")||"0")])
},initDrag:function(A){if(!Object.isUndefined(Draggable._dragging[this.element])&&Draggable._dragging[this.element]){return 
}if(Event.isLeftClick(A)){var C=Event.element(A);
if((tag_name=C.tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){return 
}var B=[Event.pointerX(A),Event.pointerY(A)];
var D=Position.cumulativeOffset(this.element);
this.offset=[0,1].map(function(E){return(B[E]-D[E])
});
Draggables.activate(this);
Event.stop(A)
}},startDrag:function(B){this.dragging=true;
if(!this.delta){this.delta=this.currentDelta()
}if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0);
this.element.style.zIndex=this.options.zindex
}if(this.options.ghosting){this._clone=this.element.cloneNode(true);
this.element._originallyAbsolute=(this.element.getStyle("position")=="absolute");
if(!this.element._originallyAbsolute){Position.absolutize(this.element)
}this.element.parentNode.insertBefore(this._clone,this.element)
}if(this.options.scroll){if(this.options.scroll==window){var A=this._getWindowScroll(this.options.scroll);
this.originalScrollLeft=A.left;
this.originalScrollTop=A.top
}else{this.originalScrollLeft=this.options.scroll.scrollLeft;
this.originalScrollTop=this.options.scroll.scrollTop
}}Draggables.notify("onStart",this,B);
if(this.options.starteffect){this.options.starteffect(this.element)
}},updateDrag:function(event,pointer){if(!this.dragging){this.startDrag(event)
}if(!this.options.quiet){Position.prepare();
Droppables.show(pointer,this.element)
}Draggables.notify("onDrag",this,event);
this.draw(pointer);
if(this.options.change){this.options.change(this)
}if(this.options.scroll){this.stopScrolling();
var p;
if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){p=[left,top,left+width,top+height]
}}else{p=Position.page(this.options.scroll);
p[0]+=this.options.scroll.scrollLeft+Position.deltaX;
p[1]+=this.options.scroll.scrollTop+Position.deltaY;
p.push(p[0]+this.options.scroll.offsetWidth);
p.push(p[1]+this.options.scroll.offsetHeight)
}var speed=[0,0];
if(pointer[0]<(p[0]+this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[0]+this.options.scrollSensitivity)
}if(pointer[1]<(p[1]+this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[1]+this.options.scrollSensitivity)
}if(pointer[0]>(p[2]-this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[2]-this.options.scrollSensitivity)
}if(pointer[1]>(p[3]-this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[3]-this.options.scrollSensitivity)
}this.startScrolling(speed)
}if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}Event.stop(event)
},finishDrag:function(B,E){this.dragging=false;
if(this.options.quiet){Position.prepare();
var D=[Event.pointerX(B),Event.pointerY(B)];
Droppables.show(D,this.element)
}if(this.options.ghosting){if(!this.element._originallyAbsolute){Position.relativize(this.element)
}delete this.element._originallyAbsolute;
Element.remove(this._clone);
this._clone=null
}var F=false;
if(E){F=Droppables.fire(B,this.element);
if(!F){F=false
}}if(F&&this.options.onDropped){this.options.onDropped(this.element)
}Draggables.notify("onEnd",this,B);
var A=this.options.revert;
if(A&&Object.isFunction(A)){A=A(this.element)
}var C=this.currentDelta();
if(A&&this.options.reverteffect){if(F==0||A!="failure"){this.options.reverteffect(this.element,C[1]-this.delta[1],C[0]-this.delta[0])
}}else{this.delta=C
}if(this.options.zindex){this.element.style.zIndex=this.originalZ
}if(this.options.endeffect){this.options.endeffect(this.element)
}Draggables.deactivate(this);
Droppables.reset()
},keyPress:function(A){if(A.keyCode!=Event.KEY_ESC){return 
}this.finishDrag(A,false);
Event.stop(A)
},endDrag:function(A){if(!this.dragging){return 
}this.stopScrolling();
this.finishDrag(A,true);
Event.stop(A)
},draw:function(A){var F=Position.cumulativeOffset(this.element);
if(this.options.ghosting){var C=Position.realOffset(this.element);
F[0]+=C[0]-Position.deltaX;
F[1]+=C[1]-Position.deltaY
}var E=this.currentDelta();
F[0]-=E[0];
F[1]-=E[1];
if(this.options.scroll&&(this.options.scroll!=window&&this._isScrollChild)){F[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft;
F[1]-=this.options.scroll.scrollTop-this.originalScrollTop
}var D=[0,1].map(function(G){return(A[G]-F[G]-this.offset[G])
}.bind(this));
if(this.options.snap){if(Object.isFunction(this.options.snap)){D=this.options.snap(D[0],D[1],this)
}else{if(Object.isArray(this.options.snap)){D=D.map(function(G,H){return(G/this.options.snap[H]).round()*this.options.snap[H]
}.bind(this))
}else{D=D.map(function(G){return(G/this.options.snap).round()*this.options.snap
}.bind(this))
}}}var B=this.element.style;
if((!this.options.constraint)||(this.options.constraint=="horizontal")){B.left=D[0]+"px"
}if((!this.options.constraint)||(this.options.constraint=="vertical")){B.top=D[1]+"px"
}if(B.visibility=="hidden"){B.visibility=""
}},stopScrolling:function(){if(this.scrollInterval){clearInterval(this.scrollInterval);
this.scrollInterval=null;
Draggables._lastScrollPointer=null
}},startScrolling:function(A){if(!(A[0]||A[1])){return 
}this.scrollSpeed=[A[0]*this.options.scrollSpeed,A[1]*this.options.scrollSpeed];
this.lastScrolled=new Date();
this.scrollInterval=setInterval(this.scroll.bind(this),10)
},scroll:function(){var current=new Date();
var delta=current-this.lastScrolled;
this.lastScrolled=current;
if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){if(this.scrollSpeed[0]||this.scrollSpeed[1]){var d=delta/1000;
this.options.scroll.scrollTo(left+d*this.scrollSpeed[0],top+d*this.scrollSpeed[1])
}}}else{this.options.scroll.scrollLeft+=this.scrollSpeed[0]*delta/1000;
this.options.scroll.scrollTop+=this.scrollSpeed[1]*delta/1000
}Position.prepare();
Droppables.show(Draggables._lastPointer,this.element);
Draggables.notify("onDrag",this);
if(this._isScrollChild){Draggables._lastScrollPointer=Draggables._lastScrollPointer||$A(Draggables._lastPointer);
Draggables._lastScrollPointer[0]+=this.scrollSpeed[0]*delta/1000;
Draggables._lastScrollPointer[1]+=this.scrollSpeed[1]*delta/1000;
if(Draggables._lastScrollPointer[0]<0){Draggables._lastScrollPointer[0]=0
}if(Draggables._lastScrollPointer[1]<0){Draggables._lastScrollPointer[1]=0
}this.draw(Draggables._lastScrollPointer)
}if(this.options.change){this.options.change(this)
}},_getWindowScroll:function(w){var T,L,W,H;
with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;
L=documentElement.scrollLeft
}else{if(w.document.body){T=body.scrollTop;
L=body.scrollLeft
}}if(w.innerWidth){W=w.innerWidth;
H=w.innerHeight
}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;
H=documentElement.clientHeight
}else{W=body.offsetWidth;
H=body.offsetHeight
}}}return{top:T,left:L,width:W,height:H}
}});
Draggable._dragging={};
var SortableObserver=Class.create({initialize:function(B,A){this.element=$(B);
this.observer=A;
this.lastValue=Sortable.serialize(this.element)
},onStart:function(){this.lastValue=Sortable.serialize(this.element)
},onEnd:function(){Sortable.unmark();
if(this.lastValue!=Sortable.serialize(this.element)){this.observer(this.element)
}}});
var Sortable={SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(A){while(A.tagName.toUpperCase()!="BODY"){if(A.id&&Sortable.sortables[A.id]){return A
}A=A.parentNode
}},options:function(A){A=Sortable._findRootElement($(A));
if(!A){return 
}return Sortable.sortables[A.id]
},destroy:function(A){var B=Sortable.options(A);
if(B){Draggables.removeObserver(B.element);
B.droppables.each(function(C){Droppables.remove(C)
});
B.draggables.invoke("destroy");
delete Sortable.sortables[B.element.id]
}},create:function(C){C=$(C);
var B=Object.extend({element:C,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:C,handle:false,only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});
this.destroy(C);
var A={revert:true,quiet:B.quiet,scroll:B.scroll,scrollSpeed:B.scrollSpeed,scrollSensitivity:B.scrollSensitivity,delay:B.delay,ghosting:B.ghosting,constraint:B.constraint,handle:B.handle};
if(B.starteffect){A.starteffect=B.starteffect
}if(B.reverteffect){A.reverteffect=B.reverteffect
}else{if(B.ghosting){A.reverteffect=function(F){F.style.top=0;
F.style.left=0
}
}}if(B.endeffect){A.endeffect=B.endeffect
}if(B.zindex){A.zindex=B.zindex
}var D={overlap:B.overlap,containment:B.containment,tree:B.tree,hoverclass:B.hoverclass,onHover:Sortable.onHover};
var E={onHover:Sortable.onEmptyHover,overlap:B.overlap,containment:B.containment,hoverclass:B.hoverclass};
Element.cleanWhitespace(C);
B.draggables=[];
B.droppables=[];
if(B.dropOnEmpty||B.tree){Droppables.add(C,E);
B.droppables.push(C)
}(B.elements||this.findElements(C,B)||[]).each(function(H,F){var G=B.handles?$(B.handles[F]):(B.handle?$(H).select("."+B.handle)[0]:H);
B.draggables.push(new Draggable(H,Object.extend(A,{handle:G})));
Droppables.add(H,D);
if(B.tree){H.treeNode=C
}B.droppables.push(H)
});
if(B.tree){(Sortable.findTreeElements(C,B)||[]).each(function(F){Droppables.add(F,E);
F.treeNode=C;
B.droppables.push(F)
})
}this.sortables[C.id]=B;
Draggables.addObserver(new SortableObserver(C,B.onUpdate))
},findElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.tag)
},findTreeElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.treeTag)
},onHover:function(E,D,A){if(Element.isParent(D,E)){return 
}if(A>0.33&&A<0.66&&Sortable.options(D).tree){return 
}else{if(A>0.5){Sortable.mark(D,"before");
if(D.previousSibling!=E){var B=E.parentNode;
E.style.visibility="hidden";
D.parentNode.insertBefore(E,D);
if(D.parentNode!=B){Sortable.options(B).onChange(E)
}Sortable.options(D.parentNode).onChange(E)
}}else{Sortable.mark(D,"after");
var C=D.nextSibling||null;
if(C!=E){var B=E.parentNode;
E.style.visibility="hidden";
D.parentNode.insertBefore(E,C);
if(D.parentNode!=B){Sortable.options(B).onChange(E)
}Sortable.options(D.parentNode).onChange(E)
}}}},onEmptyHover:function(E,G,H){var I=E.parentNode;
var A=Sortable.options(G);
if(!Element.isParent(G,E)){var F;
var C=Sortable.findElements(G,{tag:A.tag,only:A.only});
var B=null;
if(C){var D=Element.offsetSize(G,A.overlap)*(1-H);
for(F=0;
F<C.length;
F+=1){if(D-Element.offsetSize(C[F],A.overlap)>=0){D-=Element.offsetSize(C[F],A.overlap)
}else{if(D-(Element.offsetSize(C[F],A.overlap)/2)>=0){B=F+1<C.length?C[F+1]:null;
break
}else{B=C[F];
break
}}}}G.insertBefore(E,B);
Sortable.options(I).onChange(E);
A.onChange(E)
}},unmark:function(){if(Sortable._marker){Sortable._marker.hide()
}},mark:function(B,A){var D=Sortable.options(B.parentNode);
if(D&&!D.ghosting){return 
}if(!Sortable._marker){Sortable._marker=($("dropmarker")||Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});
document.getElementsByTagName("body").item(0).appendChild(Sortable._marker)
}var C=Position.cumulativeOffset(B);
Sortable._marker.setStyle({left:C[0]+"px",top:C[1]+"px"});
if(A=="after"){if(D.overlap=="horizontal"){Sortable._marker.setStyle({left:(C[0]+B.clientWidth)+"px"})
}else{Sortable._marker.setStyle({top:(C[1]+B.clientHeight)+"px"})
}}Sortable._marker.show()
},_tree:function(E,B,F){var D=Sortable.findElements(E,B)||[];
for(var C=0;
C<D.length;
++C){var A=D[C].id.match(B.format);
if(!A){continue
}var G={id:encodeURIComponent(A?A[1]:null),element:E,parent:F,children:[],position:F.children.length,container:$(D[C]).down(B.treeTag)};
if(G.container){this._tree(G.container,B,G)
}F.children.push(G)
}return F
},tree:function(D){D=$(D);
var C=this.options(D);
var B=Object.extend({tag:C.tag,treeTag:C.treeTag,only:C.only,name:D.id,format:C.format},arguments[1]||{});
var A={id:null,parent:null,children:[],container:D,position:0};
return Sortable._tree(D,B,A)
},_constructIndex:function(B){var A="";
do{if(B.id){A="["+B.position+"]"+A
}}while((B=B.parent)!=null);
return A
},sequence:function(B){B=$(B);
var A=Object.extend(this.options(B),arguments[1]||{});
return $(this.findElements(B,A)||[]).map(function(C){return C.id.match(A.format)?C.id.match(A.format)[1]:""
})
},setSequence:function(B,C){B=$(B);
var A=Object.extend(this.options(B),arguments[2]||{});
var D={};
this.findElements(B,A).each(function(E){if(E.id.match(A.format)){D[E.id.match(A.format)[1]]=[E,E.parentNode]
}E.parentNode.removeChild(E)
});
C.each(function(E){var F=D[E];
if(F){F[1].appendChild(F[0]);
delete D[E]
}})
},serialize:function(C){C=$(C);
var B=Object.extend(Sortable.options(C),arguments[1]||{});
var A=encodeURIComponent((arguments[1]&&arguments[1].name)?arguments[1].name:C.id);
if(B.tree){return Sortable.tree(C,arguments[1]).children.map(function(D){return[A+Sortable._constructIndex(D)+"[id]="+encodeURIComponent(D.id)].concat(D.children.map(arguments.callee))
}).flatten().join("&")
}else{return Sortable.sequence(C,arguments[1]).map(function(D){return A+"[]="+encodeURIComponent(D)
}).join("&")
}}};
Element.isParent=function(B,A){if(!B.parentNode||B==A){return false
}if(B.parentNode==A){return true
}return Element.isParent(B.parentNode,A)
};
Element.findChildren=function(D,B,A,C){if(!D.hasChildNodes()){return null
}C=C.toUpperCase();
if(B){B=[B].flatten()
}var E=[];
$A(D.childNodes).each(function(G){if(G.tagName&&G.tagName.toUpperCase()==C&&(!B||(Element.classNames(G).detect(function(H){return B.include(H)
})))){E.push(G)
}if(A){var F=Element.findChildren(G,B,A,C);
if(F){E.push(F)
}}});
return(E.length>0?E.flatten():[])
};
Element.offsetSize=function(A,B){return A["offset"+((B=="vertical"||B=="height")?"Height":"Width")]
};
if(typeof Effect=="undefined"){throw ("controls.js requires including script.aculo.us' effects.js library")
}var Autocompleter={};
Autocompleter.Base=Class.create({baseInitialize:function(B,C,A){B=$(B);
this.element=B;
this.update=$(C);
this.hasFocus=false;
this.changed=false;
this.active=false;
this.index=0;
this.entryCount=0;
this.oldElementValue=this.element.value;
if(this.setOptions){this.setOptions(A)
}else{this.options=A||{}
}this.options.paramName=this.options.paramName||this.element.name;
this.options.tokens=this.options.tokens||[];
this.options.frequency=this.options.frequency||0.4;
this.options.minChars=this.options.minChars||1;
this.options.onShow=this.options.onShow||function(D,E){if(!E.style.position||E.style.position=="absolute"){E.style.position="absolute";
Position.clone(D,E,{setHeight:false,offsetTop:D.offsetHeight})
}Effect.Appear(E,{duration:0.15})
};
this.options.onHide=this.options.onHide||function(D,E){new Effect.Fade(E,{duration:0.15})
};
if(typeof (this.options.tokens)=="string"){this.options.tokens=new Array(this.options.tokens)
}if(!this.options.tokens.include("\n")){this.options.tokens.push("\n")
}this.observer=null;
this.element.setAttribute("autocomplete","off");
Element.hide(this.update);
Event.observe(this.element,"blur",this.onBlur.bindAsEventListener(this));
Event.observe(this.element,"keydown",this.onKeyPress.bindAsEventListener(this))
},show:function(){if(Element.getStyle(this.update,"display")=="none"){this.options.onShow(this.element,this.update)
}if(!this.iefix&&(Prototype.Browser.IE)&&(Element.getStyle(this.update,"position")=="absolute")){new Insertion.After(this.update,'<iframe id="'+this.update.id+'_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
this.iefix=$(this.update.id+"_iefix")
}if(this.iefix){setTimeout(this.fixIEOverlapping.bind(this),50)
}},fixIEOverlapping:function(){Position.clone(this.update,this.iefix,{setTop:(!this.update.style.height)});
this.iefix.style.zIndex=1;
this.update.style.zIndex=2;
Element.show(this.iefix)
},hide:function(){this.stopIndicator();
if(Element.getStyle(this.update,"display")!="none"){this.options.onHide(this.element,this.update)
}if(this.iefix){Element.hide(this.iefix)
}},startIndicator:function(){if(this.options.indicator){Element.show(this.options.indicator)
}},stopIndicator:function(){if(this.options.indicator){Element.hide(this.options.indicator)
}},onKeyPress:function(A){if(this.active){switch(A.keyCode){case Event.KEY_TAB:case Event.KEY_RETURN:this.selectEntry();
Event.stop(A);
case Event.KEY_ESC:this.hide();
this.active=false;
Event.stop(A);
return ;
case Event.KEY_LEFT:case Event.KEY_RIGHT:return ;
case Event.KEY_UP:this.markPrevious();
this.render();
Event.stop(A);
return ;
case Event.KEY_DOWN:this.markNext();
this.render();
Event.stop(A);
return 
}}else{if(A.keyCode==Event.KEY_TAB||A.keyCode==Event.KEY_RETURN||(Prototype.Browser.WebKit>0&&A.keyCode==0)){return 
}}this.changed=true;
this.hasFocus=true;
if(this.observer){clearTimeout(this.observer)
}this.observer=setTimeout(this.onObserverEvent.bind(this),this.options.frequency*1000)
},activate:function(){this.changed=false;
this.hasFocus=true;
this.getUpdatedChoices()
},onHover:function(B){var A=Event.findElement(B,"LI");
if(this.index!=A.autocompleteIndex){this.index=A.autocompleteIndex;
this.render()
}Event.stop(B)
},onClick:function(B){var A=Event.findElement(B,"LI");
this.index=A.autocompleteIndex;
this.selectEntry();
this.hide()
},onBlur:function(A){setTimeout(this.hide.bind(this),250);
this.hasFocus=false;
this.active=false
},render:function(){if(this.entryCount>0){for(var A=0;
A<this.entryCount;
A++){this.index==A?Element.addClassName(this.getEntry(A),"selected"):Element.removeClassName(this.getEntry(A),"selected")
}if(this.hasFocus){this.show();
this.active=true
}}else{this.active=false;
this.hide()
}},markPrevious:function(){if(this.index>0){this.index--
}else{this.index=this.entryCount-1
}this.getEntry(this.index).scrollIntoView(true)
},markNext:function(){if(this.index<this.entryCount-1){this.index++
}else{this.index=0
}this.getEntry(this.index).scrollIntoView(false)
},getEntry:function(A){return this.update.firstChild.childNodes[A]
},getCurrentEntry:function(){return this.getEntry(this.index)
},selectEntry:function(){this.active=false;
this.updateElement(this.getCurrentEntry())
},updateElement:function(F){if(this.options.updateElement){this.options.updateElement(F);
return 
}var D="";
if(this.options.select){var A=$(F).select("."+this.options.select)||[];
if(A.length>0){D=Element.collectTextNodes(A[0],this.options.select)
}}else{D=Element.collectTextNodesIgnoreClass(F,"informal")
}var C=this.getTokenBounds();
if(C[0]!=-1){var E=this.element.value.substr(0,C[0]);
var B=this.element.value.substr(C[0]).match(/^\s+/);
if(B){E+=B[0]
}this.element.value=E+D+this.element.value.substr(C[1])
}else{this.element.value=D
}this.oldElementValue=this.element.value;
this.element.focus();
if(this.options.afterUpdateElement){this.options.afterUpdateElement(this.element,F)
}},updateChoices:function(C){if(!this.changed&&this.hasFocus){this.update.innerHTML=C;
Element.cleanWhitespace(this.update);
Element.cleanWhitespace(this.update.down());
if(this.update.firstChild&&this.update.down().childNodes){this.entryCount=this.update.down().childNodes.length;
for(var A=0;
A<this.entryCount;
A++){var B=this.getEntry(A);
B.autocompleteIndex=A;
this.addObservers(B)
}}else{this.entryCount=0
}this.stopIndicator();
this.index=0;
if(this.entryCount==1&&this.options.autoSelect){this.selectEntry();
this.hide()
}else{this.render()
}}},addObservers:function(A){Event.observe(A,"mouseover",this.onHover.bindAsEventListener(this));
Event.observe(A,"click",this.onClick.bindAsEventListener(this))
},onObserverEvent:function(){this.changed=false;
this.tokenBounds=null;
if(this.getToken().length>=this.options.minChars){this.getUpdatedChoices()
}else{this.active=false;
this.hide()
}this.oldElementValue=this.element.value
},getToken:function(){var A=this.getTokenBounds();
return this.element.value.substring(A[0],A[1]).strip()
},getTokenBounds:function(){if(null!=this.tokenBounds){return this.tokenBounds
}var E=this.element.value;
if(E.strip().empty()){return[-1,0]
}var F=arguments.callee.getFirstDifferencePos(E,this.oldElementValue);
var H=(F==this.oldElementValue.length?1:0);
var D=-1,C=E.length;
var G;
for(var B=0,A=this.options.tokens.length;
B<A;
++B){G=E.lastIndexOf(this.options.tokens[B],F+H-1);
if(G>D){D=G
}G=E.indexOf(this.options.tokens[B],F+H);
if(-1!=G&&G<C){C=G
}}return(this.tokenBounds=[D+1,C])
}});
Autocompleter.Base.prototype.getTokenBounds.getFirstDifferencePos=function(C,A){var D=Math.min(C.length,A.length);
for(var B=0;
B<D;
++B){if(C[B]!=A[B]){return B
}}return D
};
Ajax.Autocompleter=Class.create(Autocompleter.Base,{initialize:function(C,D,B,A){this.baseInitialize(C,D,A);
this.options.asynchronous=true;
this.options.onComplete=this.onComplete.bind(this);
this.options.defaultParams=this.options.parameters||null;
this.url=B
},getUpdatedChoices:function(){this.startIndicator();
var A=encodeURIComponent(this.options.paramName)+"="+encodeURIComponent(this.getToken());
this.options.parameters=this.options.callback?this.options.callback(this.element,A):A;
if(this.options.defaultParams){this.options.parameters+="&"+this.options.defaultParams
}new Ajax.Request(this.url,this.options)
},onComplete:function(A){this.updateChoices(A.responseText)
}});
Autocompleter.Local=Class.create(Autocompleter.Base,{initialize:function(B,D,C,A){this.baseInitialize(B,D,A);
this.options.array=C
},getUpdatedChoices:function(){this.updateChoices(this.options.selector(this))
},setOptions:function(A){this.options=Object.extend({choices:10,partialSearch:true,partialChars:2,ignoreCase:true,fullSearch:false,selector:function(B){var D=[];
var C=[];
var H=B.getToken();
var G=0;
for(var E=0;
E<B.options.array.length&&D.length<B.options.choices;
E++){var F=B.options.array[E];
var I=B.options.ignoreCase?F.toLowerCase().indexOf(H.toLowerCase()):F.indexOf(H);
while(I!=-1){if(I==0&&F.length!=H.length){D.push("<li><strong>"+F.substr(0,H.length)+"</strong>"+F.substr(H.length)+"</li>");
break
}else{if(H.length>=B.options.partialChars&&B.options.partialSearch&&I!=-1){if(B.options.fullSearch||/\s/.test(F.substr(I-1,1))){C.push("<li>"+F.substr(0,I)+"<strong>"+F.substr(I,H.length)+"</strong>"+F.substr(I+H.length)+"</li>");
break
}}}I=B.options.ignoreCase?F.toLowerCase().indexOf(H.toLowerCase(),I+1):F.indexOf(H,I+1)
}}if(C.length){D=D.concat(C.slice(0,B.options.choices-D.length))
}return"<ul>"+D.join("")+"</ul>"
}},A||{})
}});
Field.scrollFreeActivate=function(A){setTimeout(function(){Field.activate(A)
},1)
};
Ajax.InPlaceEditor=Class.create({initialize:function(C,B,A){this.url=B;
this.element=C=$(C);
this.prepareOptions();
this._controls={};
arguments.callee.dealWithDeprecatedOptions(A);
Object.extend(this.options,A||{});
if(!this.options.formId&&this.element.id){this.options.formId=this.element.id+"-inplaceeditor";
if($(this.options.formId)){this.options.formId=""
}}if(this.options.externalControl){this.options.externalControl=$(this.options.externalControl)
}if(!this.options.externalControl){this.options.externalControlOnly=false
}this._originalBackground=this.element.getStyle("background-color")||"transparent";
this.element.title=this.options.clickToEditText;
this._boundCancelHandler=this.handleFormCancellation.bind(this);
this._boundComplete=(this.options.onComplete||Prototype.emptyFunction).bind(this);
this._boundFailureHandler=this.handleAJAXFailure.bind(this);
this._boundSubmitHandler=this.handleFormSubmission.bind(this);
this._boundWrapperHandler=this.wrapUp.bind(this);
this.registerListeners()
},checkForEscapeOrReturn:function(A){if(!this._editing||A.ctrlKey||A.altKey||A.shiftKey){return 
}if(Event.KEY_ESC==A.keyCode){this.handleFormCancellation(A)
}else{if(Event.KEY_RETURN==A.keyCode){this.handleFormSubmission(A)
}}},createControl:function(G,C,B){var E=this.options[G+"Control"];
var F=this.options[G+"Text"];
if("button"==E){var A=document.createElement("input");
A.type="submit";
A.value=F;
A.className="editor_"+G+"_button";
if("cancel"==G){A.onclick=this._boundCancelHandler
}this._form.appendChild(A);
this._controls[G]=A
}else{if("link"==E){var D=document.createElement("a");
D.href="#";
D.appendChild(document.createTextNode(F));
D.onclick="cancel"==G?this._boundCancelHandler:this._boundSubmitHandler;
D.className="editor_"+G+"_link";
if(B){D.className+=" "+B
}this._form.appendChild(D);
this._controls[G]=D
}}},createEditField:function(){var C=(this.options.loadTextURL?this.options.loadingText:this.getText());
var B;
if(1>=this.options.rows&&!/\r|\n/.test(this.getText())){B=document.createElement("input");
B.type="text";
var A=this.options.size||this.options.cols||0;
if(0<A){B.size=A
}}else{B=document.createElement("textarea");
B.rows=(1>=this.options.rows?this.options.autoRows:this.options.rows);
B.cols=this.options.cols||40
}B.name=this.options.paramName;
B.value=C;
B.className="editor_field";
if(this.options.submitOnBlur){B.onblur=this._boundSubmitHandler
}this._controls.editor=B;
if(this.options.loadTextURL){this.loadExternalText()
}this._form.appendChild(this._controls.editor)
},createForm:function(){var B=this;
function A(D,E){var C=B.options["text"+D+"Controls"];
if(!C||E===false){return 
}B._form.appendChild(document.createTextNode(C))
}this._form=$(document.createElement("form"));
this._form.id=this.options.formId;
this._form.addClassName(this.options.formClassName);
this._form.onsubmit=this._boundSubmitHandler;
this.createEditField();
if("textarea"==this._controls.editor.tagName.toLowerCase()){this._form.appendChild(document.createElement("br"))
}if(this.options.onFormCustomization){this.options.onFormCustomization(this,this._form)
}A("Before",this.options.okControl||this.options.cancelControl);
this.createControl("ok",this._boundSubmitHandler);
A("Between",this.options.okControl&&this.options.cancelControl);
this.createControl("cancel",this._boundCancelHandler,"editor_cancel");
A("After",this.options.okControl||this.options.cancelControl)
},destroy:function(){if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML
}this.leaveEditMode();
this.unregisterListeners()
},enterEditMode:function(A){if(this._saving||this._editing){return 
}this._editing=true;
this.triggerCallback("onEnterEditMode");
if(this.options.externalControl){this.options.externalControl.hide()
}this.element.hide();
this.createForm();
this.element.parentNode.insertBefore(this._form,this.element);
if(!this.options.loadTextURL){this.postProcessEditField()
}if(A){Event.stop(A)
}},enterHover:function(A){if(this.options.hoverClassName){this.element.addClassName(this.options.hoverClassName)
}if(this._saving){return 
}this.triggerCallback("onEnterHover")
},getText:function(){return this.element.innerHTML
},handleAJAXFailure:function(A){this.triggerCallback("onFailure",A);
if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML;
this._oldInnerHTML=null
}},handleFormCancellation:function(A){this.wrapUp();
if(A){Event.stop(A)
}},handleFormSubmission:function(D){var B=this._form;
var C=$F(this._controls.editor);
this.prepareSubmission();
var E=this.options.callback(B,C)||"";
if(Object.isString(E)){E=E.toQueryParams()
}E.editorId=this.element.id;
if(this.options.htmlResponse){var A=Object.extend({evalScripts:true},this.options.ajaxOptions);
Object.extend(A,{parameters:E,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
new Ajax.Updater({success:this.element},this.url,A)
}else{var A=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(A,{parameters:E,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
new Ajax.Request(this.url,A)
}if(D){Event.stop(D)
}},leaveEditMode:function(){this.element.removeClassName(this.options.savingClassName);
this.removeForm();
this.leaveHover();
this.element.style.backgroundColor=this._originalBackground;
this.element.show();
if(this.options.externalControl){this.options.externalControl.show()
}this._saving=false;
this._editing=false;
this._oldInnerHTML=null;
this.triggerCallback("onLeaveEditMode")
},leaveHover:function(A){if(this.options.hoverClassName){this.element.removeClassName(this.options.hoverClassName)
}if(this._saving){return 
}this.triggerCallback("onLeaveHover")
},loadExternalText:function(){this._form.addClassName(this.options.loadingClassName);
this._controls.editor.disabled=true;
var A=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(A,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(C){this._form.removeClassName(this.options.loadingClassName);
var B=C.responseText;
if(this.options.stripLoadedTextTags){B=B.stripTags()
}this._controls.editor.value=B;
this._controls.editor.disabled=false;
this.postProcessEditField()
}.bind(this),onFailure:this._boundFailureHandler});
new Ajax.Request(this.options.loadTextURL,A)
},postProcessEditField:function(){var A=this.options.fieldPostCreation;
if(A){$(this._controls.editor)["focus"==A?"focus":"activate"]()
}},prepareOptions:function(){this.options=Object.clone(Ajax.InPlaceEditor.DefaultOptions);
Object.extend(this.options,Ajax.InPlaceEditor.DefaultCallbacks);
[this._extraDefaultOptions].flatten().compact().each(function(A){Object.extend(this.options,A)
}.bind(this))
},prepareSubmission:function(){this._saving=true;
this.removeForm();
this.leaveHover();
this.showSaving()
},registerListeners:function(){this._listeners={};
var A;
$H(Ajax.InPlaceEditor.Listeners).each(function(B){A=this[B.value].bind(this);
this._listeners[B.key]=A;
if(!this.options.externalControlOnly){this.element.observe(B.key,A)
}if(this.options.externalControl){this.options.externalControl.observe(B.key,A)
}}.bind(this))
},removeForm:function(){if(!this._form){return 
}this._form.remove();
this._form=null;
this._controls={}
},showSaving:function(){this._oldInnerHTML=this.element.innerHTML;
this.element.innerHTML=this.options.savingText;
this.element.addClassName(this.options.savingClassName);
this.element.style.backgroundColor=this._originalBackground;
this.element.show()
},triggerCallback:function(B,A){if("function"==typeof this.options[B]){this.options[B](this,A)
}},unregisterListeners:function(){$H(this._listeners).each(function(A){if(!this.options.externalControlOnly){this.element.stopObserving(A.key,A.value)
}if(this.options.externalControl){this.options.externalControl.stopObserving(A.key,A.value)
}}.bind(this))
},wrapUp:function(A){this.leaveEditMode();
this._boundComplete(A,this.element)
}});
Object.extend(Ajax.InPlaceEditor.prototype,{dispose:Ajax.InPlaceEditor.prototype.destroy});
Ajax.InPlaceCollectionEditor=Class.create(Ajax.InPlaceEditor,{initialize:function($super,C,B,A){this._extraDefaultOptions=Ajax.InPlaceCollectionEditor.DefaultOptions;
$super(C,B,A)
},createEditField:function(){var A=document.createElement("select");
A.name=this.options.paramName;
A.size=1;
this._controls.editor=A;
this._collection=this.options.collection||[];
if(this.options.loadCollectionURL){this.loadCollection()
}else{this.checkForExternalText()
}this._form.appendChild(this._controls.editor)
},loadCollection:function(){this._form.addClassName(this.options.loadingClassName);
this.showLoadingText(this.options.loadingCollectionText);
var options=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(options,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(transport){var js=transport.responseText.strip();
if(!/^\[.*\]$/.test(js)){throw"Server returned an invalid collection representation."
}this._collection=eval(js);
this.checkForExternalText()
}.bind(this),onFailure:this.onFailure});
new Ajax.Request(this.options.loadCollectionURL,options)
},showLoadingText:function(B){this._controls.editor.disabled=true;
var A=this._controls.editor.firstChild;
if(!A){A=document.createElement("option");
A.value="";
this._controls.editor.appendChild(A);
A.selected=true
}A.update((B||"").stripScripts().stripTags())
},checkForExternalText:function(){this._text=this.getText();
if(this.options.loadTextURL){this.loadExternalText()
}else{this.buildOptionList()
}},loadExternalText:function(){this.showLoadingText(this.options.loadingText);
var A=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(A,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(B){this._text=B.responseText.strip();
this.buildOptionList()
}.bind(this),onFailure:this.onFailure});
new Ajax.Request(this.options.loadTextURL,A)
},buildOptionList:function(){this._form.removeClassName(this.options.loadingClassName);
this._collection=this._collection.map(function(D){return 2===D.length?D:[D,D].flatten()
});
var B=("value" in this.options)?this.options.value:this._text;
var A=this._collection.any(function(D){return D[0]==B
}.bind(this));
this._controls.editor.update("");
var C;
this._collection.each(function(E,D){C=document.createElement("option");
C.value=E[0];
C.selected=A?E[0]==B:0==D;
C.appendChild(document.createTextNode(E[1]));
this._controls.editor.appendChild(C)
}.bind(this));
this._controls.editor.disabled=false;
Field.scrollFreeActivate(this._controls.editor)
}});
Ajax.InPlaceEditor.prototype.initialize.dealWithDeprecatedOptions=function(A){if(!A){return 
}function B(C,D){if(C in A||D===undefined){return 
}A[C]=D
}B("cancelControl",(A.cancelLink?"link":(A.cancelButton?"button":A.cancelLink==A.cancelButton==false?false:undefined)));
B("okControl",(A.okLink?"link":(A.okButton?"button":A.okLink==A.okButton==false?false:undefined)));
B("highlightColor",A.highlightcolor);
B("highlightEndColor",A.highlightendcolor)
};
Object.extend(Ajax.InPlaceEditor,{DefaultOptions:{ajaxOptions:{},autoRows:3,cancelControl:"link",cancelText:"cancel",clickToEditText:"Click to edit",externalControl:null,externalControlOnly:false,fieldPostCreation:"activate",formClassName:"inplaceeditor-form",formId:null,highlightColor:"#ffff99",highlightEndColor:"#ffffff",hoverClassName:"",htmlResponse:true,loadingClassName:"inplaceeditor-loading",loadingText:"Loading...",okControl:"button",okText:"ok",paramName:"value",rows:1,savingClassName:"inplaceeditor-saving",savingText:"Saving...",size:0,stripLoadedTextTags:false,submitOnBlur:false,textAfterControls:"",textBeforeControls:"",textBetweenControls:""},DefaultCallbacks:{callback:function(A){return Form.serialize(A)
},onComplete:function(B,A){new Effect.Highlight(A,{startcolor:this.options.highlightColor,keepBackgroundImage:true})
},onEnterEditMode:null,onEnterHover:function(A){A.element.style.backgroundColor=A.options.highlightColor;
if(A._effect){A._effect.cancel()
}},onFailure:function(B,A){alert("Error communication with the server: "+B.responseText.stripTags())
},onFormCustomization:null,onLeaveEditMode:null,onLeaveHover:function(A){A._effect=new Effect.Highlight(A.element,{startcolor:A.options.highlightColor,endcolor:A.options.highlightEndColor,restorecolor:A._originalBackground,keepBackgroundImage:true})
}},Listeners:{click:"enterEditMode",keydown:"checkForEscapeOrReturn",mouseover:"enterHover",mouseout:"leaveHover"}});
Ajax.InPlaceCollectionEditor.DefaultOptions={loadingCollectionText:"Loading options..."};
Form.Element.DelayedObserver=Class.create({initialize:function(B,A,C){this.delay=A||0.5;
this.element=$(B);
this.callback=C;
this.timer=null;
this.lastValue=$F(this.element);
Event.observe(this.element,"keyup",this.delayedListener.bindAsEventListener(this))
},delayedListener:function(A){if(this.lastValue==$F(this.element)){return 
}if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(this.onTimerEvent.bind(this),this.delay*1000);
this.lastValue=$F(this.element)
},onTimerEvent:function(){this.timer=null;
this.callback(this.element,$F(this.element))
}});
if(!Control){var Control={}
}Control.Slider=Class.create({initialize:function(D,A,B){var C=this;
if(Object.isArray(D)){this.handles=D.collect(function(E){return $(E)
})
}else{this.handles=[$(D)]
}this.track=$(A);
this.options=B||{};
this.axis=this.options.axis||"horizontal";
this.increment=this.options.increment||1;
this.step=parseInt(this.options.step||"1");
this.range=this.options.range||$R(0,1);
this.value=0;
this.values=this.handles.map(function(){return 0
});
this.spans=this.options.spans?this.options.spans.map(function(E){return $(E)
}):false;
this.options.startSpan=$(this.options.startSpan||null);
this.options.endSpan=$(this.options.endSpan||null);
this.restricted=this.options.restricted||false;
this.maximum=this.options.maximum||this.range.end;
this.minimum=this.options.minimum||this.range.start;
this.alignX=parseInt(this.options.alignX||"0");
this.alignY=parseInt(this.options.alignY||"0");
this.trackLength=this.maximumOffset()-this.minimumOffset();
this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));
this.active=false;
this.dragging=false;
this.disabled=false;
if(this.options.disabled){this.setDisabled()
}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;
if(this.allowedValues){this.minimum=this.allowedValues.min();
this.maximum=this.allowedValues.max()
}this.eventMouseDown=this.startDrag.bindAsEventListener(this);
this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.update.bindAsEventListener(this);
this.handles.each(function(F,E){E=C.handles.length-1-E;
C.setValue(parseFloat((Object.isArray(C.options.sliderValue)?C.options.sliderValue[E]:C.options.sliderValue)||C.range.start),E);
F.makePositioned().observe("mousedown",C.eventMouseDown)
});
this.track.observe("mousedown",this.eventMouseDown);
document.observe("mouseup",this.eventMouseUp);
document.observe("mousemove",this.eventMouseMove);
this.initialized=true
},dispose:function(){var A=this;
Event.stopObserving(this.track,"mousedown",this.eventMouseDown);
Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
this.handles.each(function(B){Event.stopObserving(B,"mousedown",A.eventMouseDown)
})
},setDisabled:function(){this.disabled=true
},setEnabled:function(){this.disabled=false
},getNearestValue:function(A){if(this.allowedValues){if(A>=this.allowedValues.max()){return(this.allowedValues.max())
}if(A<=this.allowedValues.min()){return(this.allowedValues.min())
}var C=Math.abs(this.allowedValues[0]-A);
var B=this.allowedValues[0];
this.allowedValues.each(function(D){var E=Math.abs(D-A);
if(E<=C){B=D;
C=E
}});
return B
}if(A>this.range.end){return this.range.end
}if(A<this.range.start){return this.range.start
}return A
},setValue:function(B,A){if(!this.active){this.activeHandleIdx=A||0;
this.activeHandle=this.handles[this.activeHandleIdx];
this.updateStyles()
}A=A||this.activeHandleIdx||0;
if(this.initialized&&this.restricted){if((A>0)&&(B<this.values[A-1])){B=this.values[A-1]
}if((A<(this.handles.length-1))&&(B>this.values[A+1])){B=this.values[A+1]
}}B=this.getNearestValue(B);
this.values[A]=B;
this.value=this.values[0];
this.handles[A].style[this.isVertical()?"top":"left"]=this.translateToPx(B);
this.drawSpans();
if(!this.dragging||!this.event){this.updateFinished()
}},setValueBy:function(B,A){this.setValue(this.values[A||this.activeHandleIdx||0]+B,A||this.activeHandleIdx||0)
},translateToPx:function(A){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(A-this.range.start))+"px"
},translateToValue:function(A){return((A/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start)
},getRange:function(B){var A=this.values.sortBy(Prototype.K);
B=B||0;
return $R(A[B],A[B+1])
},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX)
},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX)
},isVertical:function(){return(this.axis=="vertical")
},drawSpans:function(){var A=this;
if(this.spans){$R(0,this.spans.length-1).each(function(B){A.setSpan(A.spans[B],A.getRange(B))
})
}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value))
}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum))
}},setSpan:function(B,A){if(this.isVertical()){B.style.top=this.translateToPx(A.start);
B.style.height=this.translateToPx(A.end-A.start+this.range.start)
}else{B.style.left=this.translateToPx(A.start);
B.style.width=this.translateToPx(A.end-A.start+this.range.start)
}},updateStyles:function(){this.handles.each(function(A){Element.removeClassName(A,"selected")
});
Element.addClassName(this.activeHandle,"selected")
},startDrag:function(C){if(Event.isLeftClick(C)){if(!this.disabled){this.active=true;
var D=Event.element(C);
var E=[Event.pointerX(C),Event.pointerY(C)];
var A=D;
if(A==this.track){var B=Position.cumulativeOffset(this.track);
this.event=C;
this.setValue(this.translateToValue((this.isVertical()?E[1]-B[1]:E[0]-B[0])-(this.handleLength/2)));
var B=Position.cumulativeOffset(this.activeHandle);
this.offsetX=(E[0]-B[0]);
this.offsetY=(E[1]-B[1])
}else{while((this.handles.indexOf(D)==-1)&&D.parentNode){D=D.parentNode
}if(this.handles.indexOf(D)!=-1){this.activeHandle=D;
this.activeHandleIdx=this.handles.indexOf(this.activeHandle);
this.updateStyles();
var B=Position.cumulativeOffset(this.activeHandle);
this.offsetX=(E[0]-B[0]);
this.offsetY=(E[1]-B[1])
}}}Event.stop(C)
}},update:function(A){if(this.active){if(!this.dragging){this.dragging=true
}this.draw(A);
if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}Event.stop(A)
}},draw:function(B){var C=[Event.pointerX(B),Event.pointerY(B)];
var A=Position.cumulativeOffset(this.track);
C[0]-=this.offsetX+A[0];
C[1]-=this.offsetY+A[1];
this.event=B;
this.setValue(this.translateToValue(this.isVertical()?C[1]:C[0]));
if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this)
}},endDrag:function(A){if(this.active&&this.dragging){this.finishDrag(A,true);
Event.stop(A)
}this.active=false;
this.dragging=false
},finishDrag:function(A,B){this.active=false;
this.dragging=false;
this.updateFinished()
},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this)
}this.event=null
}});
Sound={tracks:{},_enabled:true,template:new Template('<embed style="height:0" id="sound_#{track}_#{id}" src="#{url}" loop="false" autostart="true" hidden="true"/>'),enable:function(){Sound._enabled=true
},disable:function(){Sound._enabled=false
},play:function(B){if(!Sound._enabled){return 
}var A=Object.extend({track:"global",url:B,replace:false},arguments[1]||{});
if(A.replace&&this.tracks[A.track]){$R(0,this.tracks[A.track].id).each(function(D){var C=$("sound_"+A.track+"_"+D);
C.Stop&&C.Stop();
C.remove()
});
this.tracks[A.track]=null
}if(!this.tracks[A.track]){this.tracks[A.track]={id:0}
}else{this.tracks[A.track].id++
}A.id=this.tracks[A.track].id;
$$("body")[0].insert(Prototype.Browser.IE?new Element("bgsound",{id:"sound_"+A.track+"_"+A.id,src:A.url,loop:1,autostart:true}):Sound.template.evaluate(A))
}};
if(Prototype.Browser.Gecko&&navigator.userAgent.indexOf("Win")>0){if(navigator.plugins&&$A(navigator.plugins).detect(function(A){return A.name.indexOf("QuickTime")!=-1
})){Sound.template=new Template('<object id="sound_#{track}_#{id}" width="0" height="0" type="audio/mpeg" data="#{url}"/>')
}else{Sound.play=function(){}
}}
(function(){var _jQuery=window.jQuery,_$=window.$;
var jQuery=window.jQuery=window.$=function(selector,context){if(arguments[0]==arguments.callee){return arguments.callee
}return new jQuery.fn.init(selector,context)
};
var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;
jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;
if(selector.nodeType){this[0]=selector;
this.length=1;
return this
}if(typeof selector=="string"){var match=quickExpr.exec(selector);
if(match&&(match[1]||!context)){if(match[1]){selector=jQuery.clean([match[1]],context)
}else{var elem=document.getElementById(match[3]);
if(elem){if(elem.id!=match[3]){return jQuery().find(selector)
}return jQuery(elem)
}selector=[]
}}else{return jQuery(context).find(selector)
}}else{if(jQuery.isFunction(selector)){return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector)
}}return this.setArray(jQuery.makeArray(selector))
},jquery:"1.2.6",size:function(){return this.length
},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]
},pushStack:function(elems){var ret=jQuery(elems);
ret.prevObject=this;
return ret
},setArray:function(elems){this.length=0;
Array.prototype.push.apply(this,elems);
return this
},each:function(callback,args){return jQuery.each(this,callback,args)
},index:function(elem){var ret=-1;
return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this)
},attr:function(name,value,type){var options=name;
if(name.constructor==String){if(value===undefined){return this[0]&&jQuery[type||"attr"](this[0],name)
}else{options={};
options[name]=value
}}return this.each(function(i){for(name in options){jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))
}})
},css:function(key,value){if((key=="width"||key=="height")&&parseFloat(value)<0){value=undefined
}return this.attr(key,value,"curCSS")
},text:function(text){if(typeof text!="object"&&text!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))
}var ret="";
jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8){ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])
}})
});
return ret
},wrapAll:function(html){if(this[0]){jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;
while(elem.firstChild){elem=elem.firstChild
}return elem
}).append(this)
}return this
},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)
})
},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)
})
},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1){this.appendChild(elem)
}})
},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1){this.insertBefore(elem,this.firstChild)
}})
},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)
})
},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})
},end:function(){return this.prevObject||jQuery([])
},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)
});
return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)
},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");
container.appendChild(clone);
return jQuery.clean([container.innerHTML])[0]
}else{return this.cloneNode(true)
}});
var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined){this[expando]=null
}});
if(events===true){this.find("*").andSelf().each(function(i){if(this.nodeType==3){return 
}var events=jQuery.data(this,"events");
for(var type in events){for(var handler in events[type]){jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)
}}})
}return ret
},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)
})||jQuery.multiFilter(selector,this))
},not:function(selector){if(selector.constructor==String){if(isSimple.test(selector)){return this.pushStack(jQuery.multiFilter(selector,this,true))
}else{selector=jQuery.multiFilter(selector,this)
}}var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;
return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector
})
},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=="string"?jQuery(selector):jQuery.makeArray(selector))))
},is:function(selector){return !!selector&&jQuery.multiFilter(selector,this).length>0
},hasClass:function(selector){return this.is("."+selector)
},val:function(value){if(value==undefined){if(this.length){var elem=this[0];
if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";
if(index<0){return null
}for(var i=one?index:0,max=one?index+1:options.length;
i<max;
i++){var option=options[i];
if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;
if(one){return value
}values.push(value)
}}return values
}else{return(this[0].value||"").replace(/\r/g,"")
}}return undefined
}if(value.constructor==Number){value+=""
}return this.each(function(){if(this.nodeType!=1){return 
}if(value.constructor==Array&&/radio|checkbox/.test(this.type)){this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0)
}else{if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);
jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)
});
if(!values.length){this.selectedIndex=-1
}}else{this.value=value
}}})
},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value)
},replaceWith:function(value){return this.after(value).remove()
},eq:function(i){return this.slice(i,i+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))
},andSelf:function(){return this.add(this.prevObject)
},data:function(key,value){var parts=key.split(".");
parts[1]=parts[1]?"."+parts[1]:"";
if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);
if(data===undefined&&this.length){data=jQuery.data(this[0],key)
}return data===undefined&&parts[1]?this.data(parts[0]):data
}else{return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)
})
}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)
})
},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;
return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);
if(reverse){elems.reverse()
}}var obj=this;
if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr")){obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}var scripts=jQuery([]);
jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;
if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem)
}else{if(elem.nodeType==1){scripts=scripts.add(jQuery("script",elem).remove())
}callback.call(obj,elem)
}});
scripts.each(evalScript)
})
}};
jQuery.fn.init.prototype=jQuery.fn;
function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})
}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}function now(){return +new Date
}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;
if(target.constructor==Boolean){deep=target;
target=arguments[1]||{};
i=2
}if(typeof target!="object"&&typeof target!="function"){target={}
}if(length==i){target=this;
--i
}for(;
i<length;
i++){if((options=arguments[i])!=null){for(var name in options){var src=target[name],copy=options[name];
if(target===copy){continue
}if(deep&&copy&&typeof copy=="object"&&!copy.nodeType){target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy)
}else{if(copy!==undefined){target[name]=copy
}}}}}return target
};
var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};
jQuery.extend({noConflict:function(deep){window.$=_$;
if(deep){window.jQuery=_jQuery
}return jQuery
},isFunction:function(fn){return !!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"")
},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body
},globalEval:function(data){data=jQuery.trim(data);
if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");
script.type="text/javascript";
if(jQuery.browser.msie){script.text=data
}else{script.appendChild(document.createTextNode(data))
}head.insertBefore(script,head.firstChild);
head.removeChild(script)
}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()
},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;
var id=elem[expando];
if(!id){id=elem[expando]=++uuid
}if(name&&!jQuery.cache[id]){jQuery.cache[id]={}
}if(data!==undefined){jQuery.cache[id][name]=data
}return name?jQuery.cache[id][name]:id
},removeData:function(elem,name){elem=elem==window?windowData:elem;
var id=elem[expando];
if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];
name="";
for(name in jQuery.cache[id]){break
}if(!name){jQuery.removeData(elem)
}}}else{try{delete elem[expando]
}catch(e){if(elem.removeAttribute){elem.removeAttribute(expando)
}}delete jQuery.cache[id]
}},each:function(object,callback,args){var name,i=0,length=object.length;
if(args){if(length==undefined){for(name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(;
i<length;
){if(callback.apply(object[i++],args)===false){break
}}}}else{if(length==undefined){for(name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(var value=object[0];
i<length&&callback.call(value,i,value)!==false;
value=object[++i]){}}}return object
},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value)){value=value.call(elem,i)
}return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value
},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className)){elem.className+=(elem.className?" ":"")+className
}})
},remove:function(elem,classNames){if(elem.nodeType==1){elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return !jQuery.className.has(classNames,className)
}).join(" "):""
}},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1
}},swap:function(elem,options,callback){var old={};
for(var name in options){old[name]=elem.style[name];
elem.style[name]=options[name]
}callback.call(elem);
for(var name in options){elem.style[name]=old[name]
}},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];
function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;
var padding=0,border=0;
jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;
border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0
});
val-=Math.round(padding+border)
}if(jQuery(elem).is(":visible")){getWH()
}else{jQuery.swap(elem,props,getWH)
}return Math.max(0,val)
}return jQuery.curCSS(elem,name,force)
},curCSS:function(elem,name,force){var ret,style=elem.style;
function color(elem){if(!jQuery.browser.safari){return false
}var ret=defaultView.getComputedStyle(elem,null);
return !ret||ret.getPropertyValue("color")==""
}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");
return ret==""?"1":ret
}if(jQuery.browser.opera&&name=="display"){var save=style.outline;
style.outline="0 solid black";
style.outline=save
}if(name.match(/float/i)){name=styleFloat
}if(!force&&style&&style[name]){ret=style[name]
}else{if(defaultView.getComputedStyle){if(name.match(/float/i)){name="float"
}name=name.replace(/([A-Z])/g,"-$1").toLowerCase();
var computedStyle=defaultView.getComputedStyle(elem,null);
if(computedStyle&&!color(elem)){ret=computedStyle.getPropertyValue(name)
}else{var swap=[],stack=[],a=elem,i=0;
for(;
a&&color(a);
a=a.parentNode){stack.unshift(a)
}for(;
i<stack.length;
i++){if(color(stack[i])){swap[i]=stack[i].style.display;
stack[i].style.display="block"
}}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";
for(i=0;
i<swap.length;
i++){if(swap[i]!=null){stack[i].style.display=swap[i]
}}}if(name=="opacity"&&ret==""){ret="1"
}}else{if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()
});
ret=elem.currentStyle[name]||elem.currentStyle[camelCase];
if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;
style.left=ret||0;
ret=style.pixelLeft+"px";
style.left=left;
elem.runtimeStyle.left=rsLeft
}}}}return ret
},clean:function(elems,context){var ret=[];
context=context||document;
if(typeof context.createElement=="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}jQuery.each(elems,function(i,elem){if(!elem){return 
}if(elem.constructor==Number){elem+=""
}if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"
});
var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");
var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
div.innerHTML=wrap[1]+elem+wrap[2];
while(wrap[0]--){div=div.lastChild
}if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];
for(var j=tbody.length-1;
j>=0;
--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}if(/^\s/.test(elem)){div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)
}}elem=jQuery.makeArray(div.childNodes)
}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select"))){return 
}if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options){ret.push(elem)
}else{ret=jQuery.merge(ret,elem)
}});
return ret
},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8){return undefined
}var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;
name=notxml&&jQuery.props[name]||name;
if(elem.tagName){var special=/href|src|style/.test(name);
if(name=="selected"&&jQuery.browser.safari){elem.parentNode.selectedIndex
}if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode){throw"type property can't be changed"
}elem[name]=value
}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){return elem.getAttributeNode(name).nodeValue
}return elem[name]
}if(msie&&notxml&&name=="style"){return jQuery.attr(elem.style,"cssText",value)
}if(set){elem.setAttribute(name,""+value)
}var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);
return attr===null?undefined:attr
}if(msie&&name=="opacity"){if(set){elem.zoom=1;
elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+""=="NaN"?"":"alpha(opacity="+value*100+")")
}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()
});
if(set){elem[name]=value
}return elem[name]
},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(array){var ret=[];
if(array!=null){var i=array.length;
if(i==null||array.split||array.setInterval||array.call){ret[0]=array
}else{while(i){ret[--i]=array[i]
}}}return ret
},inArray:function(elem,array){for(var i=0,length=array.length;
i<length;
i++){if(array[i]===elem){return i
}}return -1
},merge:function(first,second){var i=0,elem,pos=first.length;
if(jQuery.browser.msie){while(elem=second[i++]){if(elem.nodeType!=8){first[pos++]=elem
}}}else{while(elem=second[i++]){first[pos++]=elem
}}return first
},unique:function(array){var ret=[],done={};
try{for(var i=0,length=array.length;
i<length;
i++){var id=jQuery.data(array[i]);
if(!done[id]){done[id]=true;
ret.push(array[i])
}}}catch(e){ret=array
}return ret
},grep:function(elems,callback,inv){var ret=[];
for(var i=0,length=elems.length;
i<length;
i++){if(!inv!=!callback(elems[i],i)){ret.push(elems[i])
}}return ret
},map:function(elems,callback){var ret=[];
for(var i=0,length=elems.length;
i<length;
i++){var value=callback(elems[i],i);
if(value!=null){ret[ret.length]=value
}}return ret.concat.apply([],ret)
}});
var userAgent=navigator.userAgent.toLowerCase();
jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};
var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";
jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});
jQuery.each({parent:function(elem){return elem.parentNode
},parents:function(elem){return jQuery.dir(elem,"parentNode")
},next:function(elem){return jQuery.nth(elem,2,"nextSibling")
},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")
},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)
},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);
if(selector&&typeof selector=="string"){ret=jQuery.multiFilter(selector,ret)
}return this.pushStack(jQuery.unique(ret))
}
});
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;
return this.each(function(){for(var i=0,length=args.length;
i<length;
i++){jQuery(args[i])[original](this)
}})
}
});
jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");
if(this.nodeType==1){this.removeAttribute(name)
}},addClass:function(classNames){jQuery.className.add(this,classNames)
},removeClass:function(classNames){jQuery.className.remove(this,classNames)
},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)
},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);
jQuery.removeData(this)
});
if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){jQuery(">*",this).remove();
while(this.firstChild){this.removeChild(this.firstChild)
}}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)
}
});
jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();
jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")
}
});
function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0
}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");
jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2])
},"#":function(a,i,m){return a.getAttribute("id")==m[2]
},":":{lt:function(a,i,m){return i<m[3]-0
},gt:function(a,i,m){return i>m[3]-0
},nth:function(a,i,m){return m[3]-0==i
},eq:function(a,i,m){return m[3]-0==i
},first:function(a,i){return i==0
},last:function(a,i,m,r){return i==r.length-1
},even:function(a,i){return i%2==0
},odd:function(a,i){return i%2
},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a
},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a
},"only-child":function(a){return !jQuery.nth(a.parentNode.lastChild,2,"previousSibling")
},parent:function(a){return a.firstChild
},empty:function(a){return !a.firstChild
},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0
},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"
},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"
},enabled:function(a){return !a.disabled
},disabled:function(a){return a.disabled
},checked:function(a){return a.checked
},selected:function(a){return a.selected||jQuery.attr(a,"selected")
},text:function(a){return"text"==a.type
},radio:function(a){return"radio"==a.type
},checkbox:function(a){return"checkbox"==a.type
},file:function(a){return"file"==a.type
},password:function(a){return"password"==a.type
},submit:function(a){return"submit"==a.type
},image:function(a){return"image"==a.type
},reset:function(a){return"reset"==a.type
},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button")
},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)
},has:function(a,i,m){return jQuery.find(m[3],a).length
},header:function(a){return/h\d/i.test(a.nodeName)
},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem
}).length
}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];
while(expr&&expr!=old){old=expr;
var f=jQuery.filter(expr,elems,not);
expr=f.t.replace(/^\s*,\s*/,"");
cur=not?elems=f.r:jQuery.merge(cur,f.r)
}return cur
},find:function(t,context){if(typeof t!="string"){return[t]
}if(context&&context.nodeType!=1&&context.nodeType!=9){return[]
}context=context||document;
var ret=[context],done=[],last,nodeName;
while(t&&last!=t){var r=[];
last=t;
t=jQuery.trim(t);
var foundToken=false,re=quickChild,m=re.exec(t);
if(m){nodeName=m[1].toUpperCase();
for(var i=0;
ret[i];
i++){for(var c=ret[i].firstChild;
c;
c=c.nextSibling){if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName)){r.push(c)
}}}ret=r;
t=t.replace(re,"");
if(t.indexOf(" ")==0){continue
}foundToken=true
}else{re=/^([>+~])\s*(\w*)/i;
if((m=re.exec(t))!=null){r=[];
var merge={};
nodeName=m[2].toUpperCase();
m=m[1];
for(var j=0,rl=ret.length;
j<rl;
j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;
for(;
n;
n=n.nextSibling){if(n.nodeType==1){var id=jQuery.data(n);
if(m=="~"&&merge[id]){break
}if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~"){merge[id]=true
}r.push(n)
}if(m=="+"){break
}}}}ret=r;
t=jQuery.trim(t.replace(re,""));
foundToken=true
}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0]){ret.shift()
}done=jQuery.merge(done,ret);
r=ret=[context];
t=" "+t.substr(1,t.length)
}else{var re2=quickID;
var m=re2.exec(t);
if(m){m=[0,m[2],m[3],m[1]]
}else{re2=quickClass;
m=re2.exec(t)
}m[2]=m[2].replace(/\\/g,"");
var elem=ret[ret.length-1];
if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);
if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2]){oid=jQuery('[@id="'+m[2]+'"]',elem)[0]
}ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]
}else{for(var i=0;
ret[i];
i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];
if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object"){tag="param"
}r=jQuery.merge(r,ret[i].getElementsByTagName(tag))
}if(m[1]=="."){r=jQuery.classFilter(r,m[2])
}if(m[1]=="#"){var tmp=[];
for(var i=0;
r[i];
i++){if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];
break
}}r=tmp
}ret=r
}t=t.replace(re2,"")
}}if(t){var val=jQuery.filter(t,r);
ret=r=val.r;
t=jQuery.trim(val.t)
}}if(t){ret=[]
}if(ret&&context==ret[0]){ret.shift()
}done=jQuery.merge(done,ret);
return done
},classFilter:function(r,m,not){m=" "+m+" ";
var tmp=[];
for(var i=0;
r[i];
i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;
if(!not&&pass||not&&!pass){tmp.push(r[i])
}}return tmp
},filter:function(t,r,not){var last;
while(t&&t!=last){last=t;
var p=jQuery.parse,m;
for(var i=0;
p[i];
i++){m=p[i].exec(t);
if(m){t=t.substring(m[0].length);
m[2]=m[2].replace(/\\/g,"");
break
}}if(!m){break
}if(m[1]==":"&&m[2]=="not"){r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3])
}else{if(m[1]=="."){r=jQuery.classFilter(r,m[2],not)
}else{if(m[1]=="["){var tmp=[],type=m[3];
for(var i=0,rl=r.length;
i<rl;
i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];
if(z==null||/href|src|selected/.test(m[2])){z=jQuery.attr(a,m[2])||""
}if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not){tmp.push(a)
}}r=tmp
}else{if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;
for(var i=0,rl=r.length;
i<rl;
i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);
if(!merge[id]){var c=1;
for(var n=parentNode.firstChild;
n;
n=n.nextSibling){if(n.nodeType==1){n.nodeIndex=c++
}}merge[id]=true
}var add=false;
if(first==0){if(node.nodeIndex==last){add=true
}}else{if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0){add=true
}}if(add^not){tmp.push(node)
}}r=tmp
}else{var fn=jQuery.expr[m[1]];
if(typeof fn=="object"){fn=fn[m[2]]
}if(typeof fn=="string"){fn=eval("false||function(a,i){return "+fn+";}")
}r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r)
},not)
}}}}}return{r:r,t:t}
},dir:function(elem,dir){var matched=[],cur=elem[dir];
while(cur&&cur!=document){if(cur.nodeType==1){matched.push(cur)
}cur=cur[dir]
}return matched
},nth:function(cur,result,dir,elem){result=result||1;
var num=0;
for(;
cur;
cur=cur[dir]){if(cur.nodeType==1&&++num==result){break
}}return cur
},sibling:function(n,elem){var r=[];
for(;
n;
n=n.nextSibling){if(n.nodeType==1&&n!=elem){r.push(n)
}}return r
}});
jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8){return 
}if(jQuery.browser.msie&&elem.setInterval){elem=window
}if(!handler.guid){handler.guid=this.guid++
}if(data!=undefined){var fn=handler;
handler=this.proxy(fn,function(){return fn.apply(this,arguments)
});
handler.data=data
}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered){return jQuery.event.handle.apply(arguments.callee.elem,arguments)
}});
handle.elem=elem;
jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];
handler.type=parts[1];
var handlers=events[type];
if(!handlers){handlers=events[type]={};
if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener){elem.addEventListener(type,handle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,handle)
}}}}handlers[handler.guid]=handler;
jQuery.event.global[type]=true
});
elem=null
},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8){return 
}var events=jQuery.data(elem,"events"),ret,index;
if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)==".")){for(var type in events){this.remove(elem,type+(types||""))
}}else{if(types.type){handler=types.handler;
types=types.type
}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];
if(events[type]){if(handler){delete events[type][handler.guid]
}else{for(handler in events[type]){if(!parts[1]||events[type][handler].type==parts[1]){delete events[type][handler]
}}}for(ret in events[type]){break
}if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener){elem.removeEventListener(type,jQuery.data(elem,"handle"),false)
}else{if(elem.detachEvent){elem.detachEvent("on"+type,jQuery.data(elem,"handle"))
}}}ret=null;
delete events[type]
}}})
}for(ret in events){break
}if(!ret){var handle=jQuery.data(elem,"handle");
if(handle){handle.elem=null
}jQuery.removeData(elem,"events");
jQuery.removeData(elem,"handle")
}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);
if(type.indexOf("!")>=0){type=type.slice(0,-1);
var exclusive=true
}if(!elem){if(this.global[type]){jQuery("*").add([window,document]).trigger(type,data)
}}else{if(elem.nodeType==3||elem.nodeType==8){return undefined
}var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;
if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});
data[0][expando]=true
}data[0].type=type;
if(exclusive){data[0].exclusive=true
}var handle=jQuery.data(elem,"handle");
if(handle){val=handle.apply(elem,data)
}if((!fn||(jQuery.nodeName(elem,"a")&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false){val=false
}if(event){data.shift()
}if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));
if(ret!==undefined){val=ret
}}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,"a")&&type=="click")){this.triggered=true;
try{elem[type]()
}catch(e){}}this.triggered=false
}return val
},handle:function(event){var val,ret,namespace,all,handlers;
event=arguments[0]=jQuery.event.fix(event||window.event);
namespace=event.type.split(".");
event.type=namespace[0];
namespace=namespace[1];
all=!namespace&&!event.exclusive;
handlers=(jQuery.data(this,"events")||{})[event.type];
for(var j in handlers){var handler=handlers[j];
if(all||handler.type==namespace){event.handler=handler;
event.data=handler.data;
ret=handler.apply(this,arguments);
if(val!==false){val=ret
}if(ret===false){event.preventDefault();
event.stopPropagation()
}}}return val
},fix:function(event){if(event[expando]==true){return event
}var originalEvent=event;
event={originalEvent:originalEvent};
var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");
for(var i=props.length-1;
i>=0;
i--){event[props[i]]=originalEvent[props[i]]
}event[expando]=true;
event.preventDefault=function(){if(originalEvent.preventDefault){originalEvent.preventDefault()
}originalEvent.returnValue=false
};
event.stopPropagation=function(){if(originalEvent.stopPropagation){originalEvent.stopPropagation()
}originalEvent.cancelBubble=true
};
event.timeStamp=event.timeStamp||now();
if(!event.target){event.target=event.srcElement||document
}if(event.target.nodeType==3){event.target=event.target.parentNode
}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)
}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey
}if(!event.which&&event.button){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event
},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;
return proxy
},special:{ready:{setup:function(){bindReady();
return 
},teardown:function(){return 
}},mouseenter:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);
return true
},teardown:function(){if(jQuery.browser.msie){return false
}jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);
return true
},handler:function(event){if(withinElement(event,this)){return true
}event.type="mouseenter";
return jQuery.event.handle.apply(this,arguments)
}},mouseleave:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);
return true
},teardown:function(){if(jQuery.browser.msie){return false
}jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);
return true
},handler:function(event){if(withinElement(event,this)){return true
}event.type="mouseleave";
return jQuery.event.handle.apply(this,arguments)
}}}};
jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)
})
},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);
return(fn||data).apply(this,arguments)
});
return this.each(function(){jQuery.event.add(this,type,one,fn&&data)
})
},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)
})
},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)
})
},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn)
},toggle:function(fn){var args=arguments,i=1;
while(i<args.length){jQuery.event.proxy(fn,args[i++])
}return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;
event.preventDefault();
return args[this.lastToggle++].apply(this,arguments)||false
}))
},hover:function(fnOver,fnOut){return this.bind("mouseenter",fnOver).bind("mouseleave",fnOut)
},ready:function(fn){bindReady();
if(jQuery.isReady){fn.call(document,jQuery)
}else{jQuery.readyList.push(function(){return fn.call(this,jQuery)
})
}return this
}});
jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;
if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document)
});
jQuery.readyList=null
}jQuery(document).triggerHandler("ready")
}}});
var readyBound=false;
function bindReady(){if(readyBound){return 
}readyBound=true;
if(document.addEventListener&&!jQuery.browser.opera){document.addEventListener("DOMContentLoaded",jQuery.ready,false)
}if(jQuery.browser.msie&&window==top){(function(){if(jQuery.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(error){setTimeout(arguments.callee,0);
return 
}jQuery.ready()
})()
}if(jQuery.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady){return 
}for(var i=0;
i<document.styleSheets.length;
i++){if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);
return 
}}jQuery.ready()
},false)
}if(jQuery.browser.safari){var numStyles;
(function(){if(jQuery.isReady){return 
}if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);
return 
}if(numStyles===undefined){numStyles=jQuery("style, link[rel=stylesheet]").length
}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);
return 
}jQuery.ready()
})()
}jQuery.event.add(window,"load",jQuery.ready)
}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)
}
});
var withinElement=function(event,elem){var parent=event.relatedTarget;
while(parent&&parent!=elem){try{parent=parent.parentNode
}catch(error){parent=elem
}}return parent==elem
};
jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()
});
jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!="string"){return this._load(url)
}var off=url.indexOf(" ");
if(off>=0){var selector=url.slice(off,url.length);
url=url.slice(0,off)
}callback=callback||function(){};
var type="GET";
if(params){if(jQuery.isFunction(params)){callback=params;
params=null
}else{params=jQuery.param(params);
type="POST"
}}var self=this;
jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified"){self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText)
}self.each(callback,[res.responseText,status,res])
}});
return this
},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();
return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}
}):{name:elem.name,value:val}
}).get()
}});
jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)
}
});
var jsc=now();
jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data=null
}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})
},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data={}
}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})
},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)
},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));
var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();
if(s.data&&s.processData&&typeof s.data!="string"){s.data=jQuery.param(s.data)
}if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre)){s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"
}}else{if(!s.data||!s.data.match(jsre)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"
}}s.dataType="json"
}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;
if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")
}s.url=s.url.replace(jsre,"="+jsonp+"$1");
s.dataType="script";
window[jsonp]=function(tmp){data=tmp;
success();
complete();
window[jsonp]=undefined;
try{delete window[jsonp]
}catch(e){}if(head){head.removeChild(script)
}}
}if(s.dataType=="script"&&s.cache==null){s.cache=false
}if(s.cache===false&&type=="GET"){var ts=now();
var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");
s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")
}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;
s.data=null
}if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")
}var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;
if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];
var script=document.createElement("script");
script.src=s.url;
if(s.scriptCharset){script.charset=s.scriptCharset
}if(!jsonp){var done=false;
script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;
success();
complete();
head.removeChild(script)
}}
}head.appendChild(script);
return undefined
}var requestDone=false;
var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
if(s.username){xhr.open(type,s.url,s.async,s.username,s.password)
}else{xhr.open(type,s.url,s.async)
}try{if(s.data){xhr.setRequestHeader("Content-Type",s.contentType)
}if(s.ifModified){xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)
}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;
xhr.abort();
return false
}if(s.global){jQuery.event.trigger("ajaxSend",[xhr,s])
}var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;
if(ival){clearInterval(ival);
ival=null
}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";
if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter)
}catch(e){status="parsererror"
}}if(status=="success"){var modRes;
try{modRes=xhr.getResponseHeader("Last-Modified")
}catch(e){}if(s.ifModified&&modRes){jQuery.lastModified[s.url]=modRes
}if(!jsonp){success()
}}else{jQuery.handleError(s,xhr,status)
}complete();
if(s.async){xhr=null
}}};
if(s.async){var ival=setInterval(onreadystatechange,13);
if(s.timeout>0){setTimeout(function(){if(xhr){xhr.abort();
if(!requestDone){onreadystatechange("timeout")
}}},s.timeout)
}}try{xhr.send(s.data)
}catch(e){jQuery.handleError(s,xhr,null,e)
}if(!s.async){onreadystatechange()
}function success(){if(s.success){s.success(data,status)
}if(s.global){jQuery.event.trigger("ajaxSuccess",[xhr,s])
}}function complete(){if(s.complete){s.complete(xhr,status)
}if(s.global){jQuery.event.trigger("ajaxComplete",[xhr,s])
}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")
}}return xhr
},handleError:function(s,xhr,status,e){if(s.error){s.error(xhr,status,e)
}if(s.global){jQuery.event.trigger("ajaxError",[xhr,s,e])
}},active:0,httpSuccess:function(xhr){try{return !xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined
}catch(e){}return false
},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");
return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined
}catch(e){}return false
},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.tagName=="parsererror"){throw"parsererror"
}if(filter){data=filter(data,type)
}if(type=="script"){jQuery.globalEval(data)
}if(type=="json"){data=eval("("+data+")")
}return data
},param:function(a){var s=[];
if(a.constructor==Array||a.jquery){jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))
})
}else{for(var j in a){if(a[j]&&a[j].constructor==Array){jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))
})
}else{s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]))
}}}return s.join("&").replace(/%20/g,"+")
}});
jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";
if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");
this.style.display=elem.css("display");
if(this.style.display=="none"){this.style.display="block"
}elem.remove()
}}).end()
},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");
this.style.display="none"
}).end()
},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()
})
},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)
},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)
},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)
},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)
},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)
},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);
return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1){return false
}var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;
for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden){return opt.complete.call(this)
}if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");
opt.overflow=this.style.overflow
}}if(opt.overflow!=null){this.style.overflow="hidden"
}opt.curAnim=jQuery.extend({},prop);
jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);
if(/toggle|show|hide/.test(val)){e[val=="toggle"?hidden?"show":"hide":val](prop)
}else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;
if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";
if(unit!="px"){self.style[name]=(end||1)+unit;
start=((end||1)/e.cur(true))*start;
self.style[name]=start+unit
}if(parts[1]){end=((parts[1]=="-="?-1:1)*end)+start
}e.custom(start,end,unit)
}else{e.custom(start,val,"")
}}});
return true
})
},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;
type="fx"
}if(!type||(typeof type=="string"&&!fn)){return queue(this[0],type)
}return this.each(function(){if(fn.constructor==Array){queue(this,type,fn)
}else{queue(this,type).push(fn);
if(queue(this,type).length==1){fn.call(this)
}}})
},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;
if(clearQueue){this.queue([])
}this.each(function(){for(var i=timers.length-1;
i>=0;
i--){if(timers[i].elem==this){if(gotoEnd){timers[i](true)
}timers.splice(i,1)
}}});
if(!gotoEnd){this.dequeue()
}return this
}});
var queue=function(elem,type,array){if(elem){type=type||"fx";
var q=jQuery.data(elem,type+"queue");
if(!q||array){q=jQuery.data(elem,type+"queue",jQuery.makeArray(array))
}}return q
};
jQuery.fn.dequeue=function(type){type=type||"fx";
return this.each(function(){var q=queue(this,type);
q.shift();
if(q.length){q[0].call(this)
}})
};
jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};
opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;
opt.old=opt.complete;
opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()
}if(jQuery.isFunction(opt.old)){opt.old.call(this)
}};
return opt
},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p
},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum
}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;
this.elem=elem;
this.prop=prop;
if(!options.orig){options.orig={}
}}});
jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);
if(this.prop=="height"||this.prop=="width"){this.elem.style.display="block"
}},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null){return this.elem[this.prop]
}var r=parseFloat(jQuery.css(this.elem,this.prop,force));
return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0
},custom:function(from,to,unit){this.startTime=now();
this.start=from;
this.end=to;
this.unit=unit||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
this.update();
var self=this;
function t(gotoEnd){return self.step(gotoEnd)
}t.elem=this.elem;
jQuery.timers.push(t);
if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;
for(var i=0;
i<timers.length;
i++){if(!timers[i]()){timers.splice(i--,1)
}}if(!timers.length){clearInterval(jQuery.timerId);
jQuery.timerId=null
}},13)
}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.show=true;
this.custom(0,this.cur());
if(this.prop=="width"||this.prop=="height"){this.elem.style[this.prop]="1px"
}jQuery(this.elem).show()
},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(gotoEnd){var t=now();
if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
var done=true;
for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false
}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;
if(jQuery.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){this.elem.style.display="none"
}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.attr(this.elem.style,p,this.options.orig[p])
}}}if(done){this.options.complete.call(this.elem)
}return false
}else{var n=t-this.startTime;
this.state=n/this.options.duration;
this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now
},scrollTop:function(fx){fx.elem.scrollTop=fx.now
},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)
},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit
}}});
jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;
if(elem){with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";
if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();
add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));
add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)
}else{add(elem.offsetLeft,elem.offsetTop);
while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);
if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2){border(offsetParent)
}if(!fixed&&css(offsetParent,"position")=="fixed"){fixed=true
}offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;
offsetParent=offsetParent.offsetParent
}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display"))){add(-parent.scrollLeft,-parent.scrollTop)
}if(mozilla&&css(parent,"overflow")!="visible"){border(parent)
}parent=parent.parentNode
}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute")){add(-doc.body.offsetLeft,-doc.body.offsetTop)
}if(fixed){add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))
}}results={top:top,left:left}
}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))
}function add(l,t){left+=parseInt(l,10)||0;
top+=parseInt(t,10)||0
}return results
};
jQuery.fn.extend({position:function(){var left=0,top=0,results;
if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();
offset.top-=num(this,"marginTop");
offset.left-=num(this,"marginLeft");
parentOffset.top+=num(offsetParent,"borderTopWidth");
parentOffset.left+=num(offsetParent,"borderLeftWidth");
results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}
}return results
},offsetParent:function(){var offsetParent=this[0].offsetParent;
while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,"position")=="static")){offsetParent=offsetParent.offsetParent
}return jQuery(offsetParent)
}});
jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;
jQuery.fn[method]=function(val){if(!this[0]){return 
}return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val
}):this[0]==window||this[0]==document?self[i?"pageYOffset":"pageXOffset"]||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method]
}
});
jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";
jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br)
};
jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0)
}
})
})();
jQuery.noConflict();
if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.Memory){window.RichFaces.Memory={cleaners:{},addCleaner:function(A,B){this.cleaners[A]=B
},applyCleaners:function(B){for(var A in this.cleaners){this.cleaners[A](B)
}},clean:function(E){if(E){this.applyCleaners(E);
var B=E.all;
if(B){var A=0;
var D=B.length;
for(var A=0;
A<D;
A++){this.applyCleaners(B[A])
}}else{var C=E.firstChild;
while(C){this.clean(C);
C=C.nextSibling
}}}}};
window.RichFaces.Memory.addCleaner("richfaces",function(D){var B=D.component;
if(B){var C=B["rich:destructor"];
if(C){var A=B[C];
if(A){A.call(B)
}}}});
if(window.attachEvent){window.attachEvent("onunload",function(){var A=window.RichFaces.Memory;
A.clean(document);
A.clean(window)
})
}}if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.isJQueryWrapped){var oldJQuery=jQuery;
if(window.RichFaces&&window.RichFaces.Memory){window.RichFaces.Memory.addCleaner("jquery",function(A){if(A&&A[oldJQuery.expando]){oldJQuery.event.remove(A)
}})
}window.RichFaces.isJQueryWrapped=true
}
var DnD={CODE_ACCEPT:"accept",CODE_DEFAULT:"default",CODE_REJECT:"reject",startDrag:function(A){if(!window.drag){this.init();
window.drag=A;
Event.observe(document,"mousemove",this.mousemove);
Event.observe(document,"mouseup",this.mouseup)
}else{alert("drag in progress")
}},endDrag:function(C){Event.stopObserving(document,"mousemove",this.mousemove);
Event.stopObserving(document,"mouseup",this.mouseup);
var B=window.drag;
if(B){window.drag=null;
var A=B.dropzone;
B.source.endDrag(C,B);
if(A){A.onbeforedrag(C,B);
if(A.accept(B)){A.drop(C,B)
}A.onafterdrag(C)
}}},updateDrag:function(C){var B=window.drag;
if(!B.source.onupdatedrag||(B.source.onupdatedrag(C)!=false)){var A=Event.pointerX(C);
var D=Event.pointerY(C);
B.indicator.position(A+5,D+14);
Event.stop(C)
}},initialized:false,init:function(){if(!this.initialized){this.mousemove=this.updateDrag.bindAsEventListener(this);
this.mouseup=this.endDrag.bindAsEventListener(this);
this.initialized=true
}}};
DnD.Drag=Class.create();
DnD.Drag.prototype={initialize:function(C,A,B){this.source=C;
this.indicator=A;
this.type=B;
this.params={}
},dragged:false,dropzone:null,getParameters:function(){var A={};
Object.extend(A,this.params);
return A
}}

A4J_Command=Class.create();
A4J_Command.prototype={initialize:function(B,C,A){this.form=Event.findElement(B,"form");
this.target=A;
this.objectsCreated=new Array();
this.oldValuesOfExistingInputs={};
this.appendParameters(C);
this.processClick();
this.cleanUp()
},processClick:function(){var B=this.form;
var A=B.target;
$A(this.objectsCreated).each(function(C){B.appendChild(C)
});
if(this.target){B.target=this.target
}B.submit();
B.target=A
},appendParameters:function(B){var A=this;
$H(B).each(function(C){A.createOrInitHiddenInput(C.key,C.value)
})
},cleanUp:function(){var A=this.form;
$H(this.oldValuesOfExistingInputs).each(function(B){($(B.key)||A[B.key]).value=B.value
});
$A(this.objectsCreated).each(function(B){A.removeChild(B)
});
delete (this.objectsCreated)
},createOrInitHiddenInput:function(B,C){var A=$(B)||this.form[B];
if(!A){A=document.createElement("input");
A.setAttribute("type","hidden");
A.setAttribute("name",B);
A.setAttribute("id",B);
this.objectsCreated.push(A)
}else{this.oldValuesOfExistingInputs[B]=A.value
}A.value=C
}}

if(!window.A4J){window.A4J={}
}if(!A4J.findForm){function _JSFFormSubmit(I,K,F,J){var C=(typeof K=="string"?document.getElementById(K):K);
if(C){var B=[];
var G=C.target;
if(F){C.target=F
}if(J){for(var D in J){B.push(D);
if(C.elements[D]){C.elements[D].value=J[D]
}else{var H=document.createElement("input");
H.type="hidden";
H.id=D;
H.name=D;
H.value=J[D];
C.appendChild(H)
}}}var E;
if(C.fireEvent){E=C.fireEvent("onsubmit")
}else{var A=document.createEvent("HTMLEvents");
A.initEvent("submit",true,true);
E=C.dispatchEvent(A)
}if(E){C.submit()
}_clearJSFFormParameters(K,G,B)
}else{alert("Form "+K+" not found in document")
}return false
}function _clearJSFFormParameters(D,G,A){var E=(typeof D=="string"?document.getElementById(D):D);
if(E){if(G){E.target=G
}else{E.target=""
}if(A){for(var C=0;
C<A.length;
C++){var F=E.elements[A[C]];
if(F){var B=F.parentNode;
if(B){B.removeChild(F)
}}}}}}function clearFormHiddenParams(B,C,A){_clearJSFFormParameters(B,C,A)
}A4J.findForm=function(A){var B=A;
do{B=B.parentNode
}while(B&&B.nodeName.toLowerCase()!="form");
if(!B){B={reset:function(){},submit:function(){}}
}return B
};
A4J._formInput=null;
A4J.setupForm=function(C){var B=(typeof C=="string"?window.document.getElementById(C):C);
var A="click";
if(B.addEventListener){B.addEventListener(A,A4J._observer,false)
}else{if(B.attachEvent){B.attachEvent("on"+A,A4J._observer)
}}};
A4J._observer=function(A){var B=A.target||A.srcElement;
if(B&&B.nodeName.toUpperCase()=="INPUT"&&B.type.toUpperCase()=="SUBMIT"){A4J._formInput=B
}else{A4J._formInput=null
}}
}
if(!window.Richfaces){window.Richfaces={}
}Richfaces.setImages=function(B,A){B=$(B);
if(!B){return 
}for(imageSrc in A){if(typeof imageSrc!="function"){B[imageSrc]=new Image();
B[imageSrc].src=A[imageSrc]
}}}

if(!window.Richfaces){window.Richfaces={}
}if(!Richfaces.SmartPosition){Richfaces.SmartPosition={options:$H({"positionX":["right","left","center"],"positionY":["bottom","top"],positionFloat:true}),getBase:function(){return(document.compatMode&&document.compatMode.toLowerCase()=="css1compat"&&!/Netscape|Opera/.test(navigator.userAgent))?document.documentElement:(document.body||null)
},screenOffset:function(G,A){G=$(G);
var B=this.getBase();
var C=/Opera/.test(navigator.userAgent);
var D=0,H=0;
var I="";
var E=G;
do{I+="element: "+E.tagName+", offsetTop = "+E.offsetTop+", offsetLeft = "+E.offsetLeft+"\n";
D+=E.offsetTop||0;
H+=E.offsetLeft||0;
I+="valueT = "+D+", valueL = "+H+"\n";
if(E.offsetParent==B&&Element.getStyle(E,"position")=="absolute"){break
}}while(E=E.offsetParent);
I+="\n\n";
E=G;
do{I+="element: "+E.tagName+", scrollTop = "+E.scrollTop+", scrollLeft = "+E.scrollLeft+"\n";
if(!C||(E.tagName!=undefined&&(E.tagName.toLowerCase()!="tr"&&E!=G&&E!=G.parentNode))){D-=E.scrollTop||0;
H-=E.scrollLeft||0
}I+="valueT = "+D+", valueL = "+H+"\n";
if(E==B){break
}}while(E=E.parentNode);
var F=[H,D];
if(arguments.length>1&&A){alert(I+"\n\noffset = "+F)
}G=$(G);
if(!C&&G.tagName.toLowerCase()=="input"){F[0]+=G.scrollLeft
}return F
},getVSpaces:function(B){var D=this.getBase();
if(this.isElement(B)){var F=this.screenOffset(B);
var C=Element.getDimensions(B);
var E=F[1];
var A=D.clientHeight-F[1]-C.height
}else{var E=B[1]-D.scrollTop;
var A=D.clientHeight-(B[1]-D.scrollTop)
}return{top:E,bottom:A}
},getHSpaces:function(B){var D=this.getBase();
if(this.isElement(B)){var F=this.screenOffset(B);
var C=Element.getDimensions(B);
var E=F[0]+C.width;
var A=D.clientWidth-F[0]
}else{var E=B[0]-D.scrollLeft;
var A=D.clientWidth-(B[0]-D.scrollLeft)
}return{left:E,right:A}
},getPosition:function(D,A,J){var B=this.getBase();
var F=[$(A).offsetWidth,$(A).offsetHeight];
var C=this.getHSpaces(D);
var G=this.getVSpaces(D);
if(this.isElement(D)){var E=this.screenOffset(D);
var I={width:$(D).offsetWidth,height:$(D).offsetHeight};
var H=[E[0],E[1]+I.height]
}else{var H=[D[0],D[1]]
}if(C.right<F[0]&&C.left>=F[0]){if(this.isElement(D)){H[0]=E[0]+I.width-F[0]
}else{H[0]=D[0]-F[0]
}}if(this.isElement(D)){H[0]+=B.scrollLeft
}if(G.bottom<F[1]&&G.top>=F[1]){if(this.isElement(D)){H[1]=E[1]-F[1]
}else{H[1]=H[1]-F[1]
}}if(this.isElement(D)){H[1]+=B.scrollTop
}return H
},getOption:function(A){if(A){return $H(A)
}else{return this.options
}},calcSizes:function(A){if(A.tagName.toLowerCase()=="table"){A.style.width="0px";
A.style.height="0px";
return{width:A.offsetWidth,height:A.offsetHeight}
}},isElement:function(A){return(A.length==undefined)
}}
}
if(!document.observe){throw"prototype.js is required!"
}if(!A4J||!A4J.AJAX||!A4J.AJAX.AddListener){throw"AJAX script is required!"
}if(!window.Richfaces){window.Richfaces={}
}Object.extend(Richfaces,function(){var D=0;
var B={};
var G=false;
var J=null;
var F=function(L,N){if(N instanceof Array){for(var M=0;
M<N.length;
M++){N[M](L)
}}else{N(L)
}};
var H=function(){if(G){Event.stopObserving(document,"mouseover",K,true);
Event.stopObserving(document,"focus",K,true);
Event.stopObserving(document,"focusin",K,true);
G=false;
J=null
}};
var K=function(N){var L=Event.element(N);
while(L){var P=L.id;
if(P){if(!J){J=P
}else{if(J==P){break
}}var M=B[P];
if(M){try{F(L,M)
}catch(O){A();
throw O
}delete B[P];
if(--D==0){H();
break
}}}L=L.parentNode
}};
var C=function(){if(!G){Event.observe(document,"mousemove",K,true);
Event.observe(document,"focus",K,true);
Event.observe(document,"focusin",K,true);
G=true
}};
var A=function(){try{H();
D=0;
B={}
}catch(L){LOG.error("Error occured during cleanup: "+L)
}};
var I=function(){try{for(var M in B){var L=$(M);
if(L){F(L,B[M])
}else{LOG.error("Element with id = "+M+" hasn't been found!")
}}}finally{A()
}};
var E=function(O,P){var N=$(O);
if(N){P(N)
}else{var L=B[O];
if(!L){B[O]=P;
J=null;
D++;
C()
}else{if(L instanceof Array){L.push(P)
}else{var M=new Array();
M.push(L);
M.push(P);
B[O]=M
}}}};
A4J.AJAX.AddListener(I);
document.observe("dom:loaded",I);
return{onAvailable:E}
}())

if(!window.RichFaces){window.RichFaces={}
}RichFaces.MSIE=0;
RichFaces.FF=1;
RichFaces.OPERA=2;
RichFaces.NETSCAPE=3;
RichFaces.SAFARI=4;
RichFaces.KONQ=5;
RichFaces.navigatorType=function(){var A=navigator.userAgent.toLowerCase();
if(A.indexOf("msie")>=0||A.indexOf("explorer")>=0){return RichFaces.MSIE
}if(A.indexOf("firefox")>=0||A.indexOf("iceweasel")>=0){return RichFaces.FF
}if(A.indexOf("opera")>=0){return RichFaces.OPERA
}if(A.indexOf("netscape")>=0){return RichFaces.NETSCAPE
}if(A.indexOf("safari")>=0){return RichFaces.SAFARI
}if(A.indexOf("konqueror")>=0){return RichFaces.KONQ
}return"OTHER"
};
RichFaces.getOperaVersion=function(){var B=navigator.userAgent.toLowerCase();
var A=B.indexOf("opera");
if(A==-1){return 
}return parseFloat(B.substring(A+6))
};
RichFaces.getIEVersion=function(){var C="msie";
var D=navigator.userAgent.toLowerCase();
var A=D.indexOf(C);
if(A!=-1){var E=D.indexOf(";",A);
var B;
if(E!=-1){B=D.substring(A+C.length,E)
}else{B=D.substring(A+C.length)
}return parseFloat(B)
}else{return undefined
}}

DnD.getDnDDefaultParams=function(B){var A=Richfaces.getNSAttribute("defaultdndparams",B);
if(A){var C=A.parseJSON(EventHandlersWalk);
if(C){return C
}}return{}
};
DnD.getDnDMergedParams=function(C,B){var E=DnD.getDnDDefaultParams(C);
var A=Richfaces.getNSAttribute(B,C);
if(A){var D=A.parseJSON(EventHandlersWalk);
if(E){if(D){Object.extend(E,D)
}}else{E=D
}}return E
};
DnD.getDnDDragParams=function(A){return DnD.getDnDMergedParams(A,"dragdndparams")
};
DnD.getDnDDropParams=function(A){return DnD.getDnDMergedParams(A,"dropdndparams")
};
DnD.setDefaultDnDParams=function(B){if(B){if(drag&&drag.source&&drag.source.getDraggableItems&&drag.source.getDraggableItems()>1){var A=drag.source.getDraggableItems();
B["count"]=A;
if(!B["label"]){B["label"]=B["count"]+" "+(B["units"]?B["units"]:"items")
}}}}

DnD.Draggable=function(){};
DnD.ieReleaseCapture=function(){if(document.releaseCapture){document.releaseCapture()
}};
DnD.DragEndListener=Class.create();
DnD.DragEndListener.prototype={initialize:function(A){this.callback=A;
this.onmoveBound=this.onmove.bindAsEventListener(this);
this.onupBound=this.onup.bindAsEventListener(this)
},activate:function(A){Event.observe(document,"mousemove",this.onmoveBound);
Event.observe(document,"mouseup",this.onupBound);
if(A.type=="mousemove"){this.onmoveBound(A)
}},onmove:function(A){if("mousemove"==A.type){if(!this.mouseMoveProvidesButtonChecked){this.mouseMoveProvidesButtonChecked=true;
if(!this.mouseMoveProvidesButton){this.mouseMoveProvidesButton=A.button!=0
}}if(this.mouseMoveProvidesButton&&!Event.isLeftClick(A)&&RichFaces.getIEVersion()!=6){this.endDrag(A)
}}},onup:function(A){this.endDrag(A)
},endDrag:function(A){this.deactivate();
this.callback(A)
},deactivate:function(){Event.stopObserving(document,"mousemove",this.onmoveBound);
Event.stopObserving(document,"mouseup",this.onupBound)
}};
DnD.Cursor=Class.create();
DnD.Cursor.prototype={initialize:function(A,B){this.element=A;
this.cursor=B;
this.visible=false;
if(this.element.style.cursor&&this.element.style.cursor!=""){this.oldcursor=this.element.style.cursor
}},showCursor:function(){var A=this.element;
this.element.style.cursor=this.cursor;
this.visible=true
},hideCursor:function(){var A=this.element;
A.style.cursor="";
this.visible=false;
if(this.oldcursor){this.element.style.cursor=this.oldcursor
}}};
DnD.Draggable.prototype={getElement:function(){return $(this.id)
},getDraggableOptions:function(){return null
},getDnDDefaultParams:function(){return DnD.getDnDDefaultParams(this.getElement())
},getDnDDragParams:function(){return DnD.getDnDDragParams(this.getElement())
},getContentType:function(){return null
},getIndicator:function(){return null
},getOrCreateDefaultIndicator:function(){var A=$("_rfDefaultDragIndicator");
if(!A){A=document.createElement("div");
A.id="_rfDefaultDragIndicatorLeft";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
document.body.appendChild(A);
A=document.createElement("div");
A.id="_rfDefaultDragIndicatorRight";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
document.body.appendChild(A);
A=document.createElement("div");
A.id="_rfDefaultDragIndicatorBottom";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
document.body.appendChild(A);
A=document.createElement("div");
A.id="_rfDefaultDragIndicator";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
Object.extend(A,DefaultDragIndicator);
document.body.appendChild(A)
}DefaultDragIndicator.changeIndicatorColor(A,"black");
return A
},setIndicator:function(C){var A=this.getIndicator();
if(A){var B=this.getDnDDragParams();
DnD.setDefaultDnDParams(B);
if(this.getDraggableItems&&this.getDraggableItems()>1){A.setContent("default",false,B)
}else{A.setContent("default",true,B)
}}},moveDrag:function(B){var A=Event.pointerX(B);
var C=Event.pointerY(B);
if(!window.drag&&(Math.abs(this.lastDragX-A)+Math.abs(this.lastDragY-C))>2){this.updateDrag(B)
}},startDrag:function(A){var B=this.getContentType();
if(B){if(this.grabbingCursor){if(this.grabCursor&&this.grabCursor.visible){this.grabCursor.hideCursor()
}this.grabbingCursor.showCursor()
}if(!this.endDragListener){this.dragTrigger=this.moveDrag.bindAsEventListener(this);
this.endDragListener=new DnD.DragEndListener(function(C){Event.stopObserving(document,"mousemove",this.dragTrigger);
DnD.endDrag(C,window.drag)
}.bind(this))
}this.endDragListener.activate(A);
Event.observe(document,"mousemove",this.dragTrigger);
this.lastDragX=Event.pointerX(A);
this.lastDragY=Event.pointerY(A);
this.onSelectStartHandler=document.onselectstart;
this.onDragStartHandler=document.ondragstart;
document.onselectstart=function(){return false
};
document.ondragstart=function(){DnD.ieReleaseCapture();
return false
};
if(document.releaseCapture){Event.observe(document,"mousemove",DnD.ieReleaseCapture)
}}},updateDrag:function(F){var E=this.getContentType();
var A=this.getIndicator();
var D=new DnD.Drag(this,A,E);
if(A.id.indexOf("_rfDefaultDragIndicator")!=-1){var G=D.source.getElement();
var C=Position.cumulativeOffset(G);
A.indicatorWidth=Element.getWidth(G);
A.indicatorHeight=Element.getHeight(G);
A.position(C[0],C[1]);
A.removalX=Event.pointerX(F)-C[0];
A.removalY=Event.pointerY(F)-C[1]
}DnD.startDrag(D);
DnD.updateDrag(F);
this.ondragstart(F,D);
if(A){A.show()
}var B=this.getDraggableOptions();
if(B&&B.ondragstart){B.ondragstart(F)
}},endDrag:function(E,D){DnD.endDrag(E);
this.lastDragX=undefined;
this.lastDragY=undefined;
document.onselectstart=this.onSelectStartHandler;
document.ondragstart=this.onDragStartHandler;
if(document.releaseCapture){Event.stopObserving(document,"mousemove",DnD.ieReleaseCapture)
}if(this.endDragListener){this.endDragListener.deactivate()
}if(D){var A=D.indicator;
if(A){A.hide()
}this.ondragend(E,D)
}var C=this.getCurrentGrabbingCursor();
if(C){if(C.visible){C.hideCursor()
}}var B=this.getDraggableOptions();
if(B&&B.ondragend){B.ondragend(E)
}},attachCursor:function(){this.cursor=new DnD.Cursor()
},ondragstart:function(B,A){},ondragend:function(B,A){},ondragover:function(B){var A=this.getCurrentGrabCursor();
if(!document.body.style.cursor){if(A){if(!A.visible){A.showCursor()
}}}},ondragout:function(B){var A=this.getCurrentGrabCursor();
if(A){if(A.visible){A.hideCursor()
}}},getCurrentGrabbingCursor:function(){var B=window.drag;
var A=this.grabbingCursor;
if(B){A=B.source.grabbingCursor
}return A
},getCurrentGrabCursor:function(){var B=window.drag;
var A=this.grabCursor;
if(B){A=B.source.grabCursor
}return A
},onmouseup:function(C){var B=this.getCurrentGrabbingCursor();
var A=this.grabCursor;
if(B&&B.visible){B.hideCursor()
}if(A){A.showCursor()
}},ondropover:function(C,B){var A=this.getDraggableOptions();
if(A&&A.ondropover){C.drag=B;
A.ondropover(C)
}},ondropout:function(C,B){var A=this.getDraggableOptions();
if(A&&A.ondropout){C.drag=B;
A.ondropout(C)
}},enableDraggableCursors:function(A,B){var C=this.getElement();
if(A){this.dragOutBound=this.ondragout.bindAsEventListener(this);
this.dragOverBound=this.ondragover.bindAsEventListener(this);
this.dragUpBound=this.onmouseup.bindAsEventListener(this);
Event.observe(C,"mouseout",this.dragOutBound);
Event.observe(C,"mouseover",this.dragOverBound);
Event.observe(C,"mouseup",this.dragUpBound);
this.grabCursor=new DnD.Cursor(C,A)
}if(B){this.grabbingCursor=new DnD.Cursor(document.body,B)
}},disableDraggableCursors:function(){var A=this.getElement();
if(this.dragOutBound&&this.dragOverBound){Event.stopObserving(A,"mouseover",this.dragOutBound);
Event.stopObserving(A,"mouseout",this.dragOverBound)
}else{return false
}return true
},isDraggableCursorsEnabled:function(){if(this.isCursorsEnabled){this.isCursorsEnabled=true
}else{this.isCursorsEnabled=false
}return this.isCursorsEnabled
}};
DefaultDragIndicator={setContent:function(A,C,B){},show:function(){if(window.drag&&window.drag.source){var B=window.drag.source.getElement();
Element.setStyle(this,{"width":Element.getWidth(B)+"px","height":"1px"});
Element.show(this);
this.style.position="absolute";
var A=$("_rfDefaultDragIndicatorLeft");
if(A){Element.setStyle(A,{"width":"1px","height":Element.getHeight(B)+"px"});
Element.show(A);
A.style.position="absolute"
}A=$("_rfDefaultDragIndicatorRight");
if(A){Element.setStyle(A,{"width":"1px","height":Element.getHeight(B)+"px"});
Element.show(A);
A.style.position="absolute"
}A=$("_rfDefaultDragIndicatorBottom");
if(A){Element.setStyle(A,{"width":Element.getWidth(B)+"px","height":"1px"});
Element.show(A);
A.style.position="absolute"
}}},hide:function(){Element.hide(this);
this.style.position="";
var A=$("_rfDefaultDragIndicatorLeft");
if(A){Element.hide(A);
A.style.position=""
}A=$("_rfDefaultDragIndicatorRight");
if(A){Element.hide(A);
A.style.position=""
}A=$("_rfDefaultDragIndicatorBottom");
if(A){Element.hide(A);
A.style.position=""
}},position:function(A,C){if(this.removalX&&this.removalY){A-=(this.removalX+5);
C-=(this.removalY+14)
}Element.setStyle(this,{"left":A+"px","top":C+"px"});
var B=$("_rfDefaultDragIndicatorLeft");
if(B){Element.setStyle(B,{"left":A+"px","top":C+"px"})
}A+=this.indicatorWidth;
B=$("_rfDefaultDragIndicatorRight");
if(B){Element.setStyle(B,{"left":A+"px","top":C+"px"})
}A-=this.indicatorWidth;
C+=this.indicatorHeight;
B=$("_rfDefaultDragIndicatorBottom");
if(B){Element.setStyle(B,{"left":A+"px","top":C+"px"})
}},accept:function(){this.changeIndicatorColor(this,"green")
},reject:function(){this.changeIndicatorColor(this,"red")
},leave:function(){this.changeIndicatorColor(this,"black")
},changeIndicatorColor:function(A,B){Element.setStyle(A,{"borderTop":"1px dashed "+B});
var C=$("_rfDefaultDragIndicatorLeft");
if(C){Element.setStyle(C,{"borderLeft":"1px dashed "+B})
}C=$("_rfDefaultDragIndicatorRight");
if(C){Element.setStyle(C,{"borderRight":"1px dashed "+B})
}C=$("_rfDefaultDragIndicatorBottom");
if(C){Element.setStyle(C,{"borderBottom":"1px dashed "+B})
}}}

DnD.Dropzone=function(){};
DnD.Dropzone.DROP_TARGET_ID="dropTargetId";
DnD.Dropzone.prototype={getElement:function(){return $(this.id)
},getDropzoneOptions:function(){return null
},getDnDDefaultParams:function(){return DnD.getDnDDefaultParams(this.getElement())
},getDnDDropParams:function(){return DnD.getDnDDropParams(this.getElement())
},accept:function(A){return DnD.CLIENT_VALIDATION_OFF||this.getAcceptedTypes().indexOf(A.type)>-1
},getAcceptedTypes:function(){return[]
},getTypeMapping:function(){return{}
},getCursorTypeMapping:function(){return{}
},drop:function(B,A){},getIconCodeForType:function(B){var A=this.getTypeMapping();
if(B&&A){return A[B]
}return null
},getCursorForType:function(B){var A=this.getCursorTypeMapping();
if(B&&A){return A[B]
}},dragEnter:function(C){var F=window.drag;
F.dropzone=this;
F.source.ondropover(C,F);
var H=F.indicator;
var B=this.accept(F);
if(B){var I=this.getCursorForType(F.type);
if(I){this.acceptMappingCursor=new DnD.Cursor(this.getElement(),I);
this.acceptMappingCursor.showCursor()
}else{if(this.acceptCursor){this.acceptCursor.showCursor()
}}}else{if(this.rejectCursor){this.rejectCursor.showCursor()
}}if(H){var G=this.getIconCodeForType(F.type);
var D=F.source.getDnDDragParams();
if(D){Object.extend(D,this.getDnDDropParams())
}else{D=this.getDnDDropParams()
}if(D){if(G){D["marker"]=D[G]
}else{D["marker"]=null
}}var E=B?"accept":"reject";
DnD.setDefaultDnDParams(D);
if(F.source.getDraggableItems&&F.source.getDraggableItems()>1){H.setContent(E,false,D)
}else{H.setContent(E,true,D)
}if(B){H.accept()
}else{H.reject()
}}var A=this.getDropzoneOptions();
if(A&&A.ondragenter){A.ondragenter.call(C)
}},dragLeave:function(D){var B=window.drag;
B.dropzone=null;
B.source.ondropout(D,B);
B.source.setIndicator(D);
var A=B.indicator;
if(A){A.leave()
}var C=this.getDropzoneOptions();
if(C&&C.ondragexit){C.ondragexit(D)
}if(this.acceptCursor){if(this.acceptCursor.visible){this.acceptCursor.hideCursor()
}}if(this.rejectCursor){if(this.rejectCursor.visible){this.rejectCursor.hideCursor()
}}if(this.acceptMappingCursor){if(this.acceptMappingCursor.visible){this.acceptMappingCursor.hideCursor()
}}},dragUp:function(B){this.ondropend(B);
if(this.acceptCursor){if(this.acceptCursor.visible){this.acceptCursor.hideCursor()
}}if(this.rejectCursor){if(this.rejectCursor.visible){this.rejectCursor.hideCursor()
}}if(this.acceptMappingCursor){if(this.acceptMappingCursor.visible){this.acceptMappingCursor.hideCursor()
}}var A=this.getDropzoneOptions();
if(A&&A.ondropend){A.ondropend()
}},enableDropzoneCursors:function(B,A){if(B){this.acceptCursor=new DnD.Cursor(this.getElement(),B)
}if(A){this.rejectCursor=new DnD.Cursor(this.getElement(),A)
}},ondropend:function(A){},onafterdrag:function(A){},onbeforedrag:function(B,A){},ondragenter:function(A){},ondragexit:function(A){}}

if(!window.Richfaces){window.Richfaces={}
}Richfaces.SYNTHETIC_EVENT="Richfaces.SYNTHETIC_EVENT";
Richfaces.createEvent=function(F,D,C,E){var G;
if(document.createEventObject){if(C){G=document.createEventObject(C)
}else{G=document.createEventObject()
}}else{var B=C&&C.bubbles||false;
var A=C&&C.cancelable||true;
switch(F){case"abort":case"blur":case"change":case"error":case"focus":case"load":case"reset":case"resize":case"scroll":case"select":case"submit":case"unload":G=document.createEvent("HTMLEvents");
G.initEvent(F,B,A);
break;
case"DOMActivate":case"DOMFocusIn":case"DOMFocusOut":case"keydown":case"keypress":case"keyup":G=document.createEvent("UIEvents");
if(C){G.initUIEvent(F,B,A,C.windowObject,C.detail)
}else{G.initEvent(F,B,A)
}break;
case"click":case"mousedown":case"mousemove":case"mouseout":case"mouseover":case"mouseup":G=document.createEvent("MouseEvents");
if(C){G.initMouseEvent(F,B,A,C.windowObject,C.detail,C.screenX,C.screenY,C.clientX,C.clientY,C.ctrlKey,C.altKey,C.shiftKey,C.metaKey,C.button,C.relatedTarget)
}else{G.initEvent(F,B,A)
}break;
case"DOMAttrModified":case"DOMNodeInserted":case"DOMNodeRemoved":case"DOMCharacterDataModified":case"DOMNodeInsertedIntoDocument":case"DOMNodeRemovedFromDocument":case"DOMSubtreeModified":G=document.createEvent("MutationEvents");
if(C){G.initMutationEvent(F,B,A,C.relatedNode,C.prevValue,C.newValue,C.attrName,C.attrChange)
}else{G.initEvent(F,B,A)
}break;
default:G=document.createEvent("Events");
G.initEvent(F,B,A)
}}if(E){Object.extend(G,E)
}G[Richfaces.SYNTHETIC_EVENT]=true;
return{event:G,fire:function(){if(D.fireEvent){D.fireEvent("on"+F,this.event)
}else{D.dispatchEvent(this.event)
}}}
};
Richfaces.eventIsSynthetic=function(A){if(A){return new Boolean(A[Richfaces.SYNTHETIC_EVENT]).valueOf()
}return false
}

if(!window.Richfaces){window.Richfaces={}
}Richfaces.jsFormSubmit=function(F,B,D,E){var C=document.getElementById(B);
if(C){var A=C.target;
var H=new Array();
if(E){for(var G in E){H.push(G)
}}_JSFFormSubmit(F,B,D,E);
_clearJSFFormParameters(B,A,H)
}}

JSNode=function(){};
JSNode.prototype={tag:null,attrs:{},childs:[],value:"",_symbols:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","\u00A0":"&nbsp;"},getInnerHTML:function(F){var B="";
for(var A=0;
A<this.childs.length;
A++){B+=this.childs[A].getContent(F)
}return B
},xmlEscape:function(A){var B=A?A.toString():"";
return B.escapeHTML()
}};
E=function(F,A,B){this.tag=F;
if(A){this.attrs=A
}if(B){this.childs=B
}};
E.prototype=new JSNode();
E.prototype.getContent=function(G){var F="<"+this.tag;
var A=this.getInnerHTML(G);
if(A==""){this.isEmpty=true
}else{this.isEmpty=false
}for(var B in this.attrs){if(!this.attrs.hasOwnProperty(B)){continue
}var H=this.attrs[B];
if(typeof H=="function"){H=H.call(this,G)
}if(H){F+=" "+(B=="className"?"class":B)+'="'+this.xmlEscape(H)+'"'
}}F+=">"+A+"</"+this.tag+">";
return F
};
ET=function(A){this.value=A
};
ET.prototype.getContent=function(A){var B=this.value;
if(typeof B=="function"){B=B(A)
}if(B&&B.getContent){B=B.getContent(A)
}if(B){return B
}return""
};
T=function(A){this.value=A
};
T.prototype=new JSNode();
T.prototype.getContent=function(A){var B=this.value;
if(typeof B=="function"){B=B(A)
}if(B){return this.xmlEscape(B)
}return""
};
C=function(A){this.value=A
};
C.prototype.getContent=function(A){return"<!--"+this.value+"-->"
};
D=function(A){this.value=A
};
D.prototype.getContent=function(A){return"<![CDATA["+this.value+"]]>"
}

if(!String.prototype.parseJSON){String.prototype.parseJSON=function(hook){try{if(!/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/("(\\.|[^"\\])*")|('(\\.|[^'\\])*')/g,""))){var j=eval("("+this+")");
if(typeof hook==="function"){function walk(v){if(v&&typeof v==="object"){for(var i in v){if(v.hasOwnProperty(i)){v[i]=walk(v[i])
}}}return hook(v)
}return walk(j)
}return j
}}catch(e){}throw new SyntaxError("parseJSON")
}
}EventHandlersWalk=function(v){if(v&&typeof v=="object"){var names=new Array();
for(var i in v){if(v.hasOwnProperty(i)){if(i.length>2&&i.substring(0,2)=="on"){names.push(i)
}}}for(var i=0;
i<names.length;
i++){var name=names[i];
var value=v[name];
if(value&&typeof value!="function"){var f=eval("(["+v[name]+"])")[0];
if(typeof f=="function"){v[name]=f
}}}}return v
}

var mediaName="rich-extended-skinning";
var skipNavigator=window.opera||navigator.userAgent.indexOf("AppleWebKit/")>-1;
if(!skipNavigator){var resetMedia=function(A){var B=A.getAttribute("media");
if(mediaName==B){A.removeAttribute("media")
}};
if(!window._RICH_FACES_SKINNING_ADDED_TO_BODY){var getElementByTagName=function(B,A){var E;
try{E=B.selectNodes('.//*[local-name()="'+A+'"]')
}catch(C){try{E=B.getElementsByTagName(A)
}catch(D){}}return E
};
var f=function(){if(window.RICH_FACES_EXTENDED_SKINNING_ON){var D=getElementByTagName(document,"link");
if(D){var A=D.length;
for(var C=0;
C<A;
C++){var B=D[C];
resetMedia(B)
}}}};
if(window.addEventListener){window.addEventListener("load",f,false)
}else{window.attachEvent("onload",f)
}window._RICH_FACES_SKINNING_ADDED_TO_BODY=true
}if(!window._RICH_FACES_SKINNING_ADDED_TO_AJAX&&typeof A4J!="undefined"&&A4J.AJAX){A4J.AJAX.AddHeadElementTransformer(function(A){if(window.RICH_FACES_EXTENDED_SKINNING_ON){if(A.tagName&&A.tagName.toLowerCase()=="link"){resetMedia(A)
}}});
window._RICH_FACES_SKINNING_ADDED_TO_AJAX=true
}}
if(!window.Richfaces){window.Richfaces={}
}Richfaces.getComputedStyle=function(D,A){var B=$(D);
if(B.nodeType!=Node.ELEMENT_NODE){return""
}if(B.currentStyle){return B.currentStyle[A]
}if(document.defaultView&&document.defaultView.getComputedStyle){var C=document.defaultView.getComputedStyle(B,null);
if(C){return C.getPropertyValue(A)
}}return""
};
Richfaces.getComputedStyleSize=function(B,A){var C=Richfaces.getComputedStyle(B,A);
if(C){C=C.strip();
C=C.replace(/px$/,"");
return parseFloat(C)
}return 0
};
Richfaces.getWindowSize=function(){var B=0,A=0;
if(typeof (window.innerWidth)=="number"){B=window.innerWidth;
A=window.innerHeight
}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){B=document.documentElement.clientWidth;
A=document.documentElement.clientHeight
}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){B=document.body.clientWidth;
A=document.body.clientHeight
}}}return{"width":B,"height":A}
};
Richfaces.removePX=function(B){var A=B.indexOf("px");
if(A==-1){return B
}return B.substr(0,A)
};
Richfaces.visitTree=function(A,D){var B=A;
if(!B){B=document
}D.call(this,B);
var C=B.firstChild;
while(C){Richfaces.visitTree(C,D);
C=C.nextSibling
}};
Richfaces.getNSAttribute=function(C,E){if(E.getAttributeNS){var A=E.getAttributeNS("http://richfaces.ajax4jsf.org/rich",C);
if(A){return A
}}var B=E.attributes;
var D="rich:"+C;
var A=B[D];
if(A){return A.nodeValue
}return null
};
Richfaces.VARIABLE_NAME_PATTERN=/^\s*[_,A-Z,a-z][\w,_\.]*\s*$/;
Richfaces.getObjectValue=function(D,B){var A=D.split(".");
var C=B[A[0]];
var E=1;
while(C&&E<A.length){C=C[A[E++]]
}return(C?C:"")
};
Richfaces.evalMacro=function(template,object){var value="";
if(Richfaces.VARIABLE_NAME_PATTERN.test(template)){if(template.indexOf(".")==-1){value=object[template];
if(!value){value=window[template]
}}else{value=Richfaces.getObjectValue(template,object);
if(!value){value=Richfaces.getObjectValue(template,window)
}}if(value&&typeof value=="function"){value=value(object)
}if(!value){value=""
}}else{try{if(Richfaces.browser.isObjectEval){value=object.eval(template)
}else{with(object){value=eval(template)
}}if(typeof value=="function"){value=value(object)
}}catch(e){LOG.warn("Exception: "+e.Message+"\n["+template+"]")
}}return value
};
Richfaces.evalSimpleMacro=function(B,A){var C=A[B];
if(!C){C=window[B];
if(!C){C=""
}}return C
};
Richfaces.getComponent=function(A,B){var D="richfacesComponent";
var C="richfaces:"+A;
while(B.parentNode){if(B[D]&&B[D]==C){return B.component
}else{B=B.parentNode
}}};
Richfaces.browser={isIE:(!window.opera&&/MSIE/.test(navigator.userAgent)),isIE6:(!window.opera&&/MSIE\s*[6][\d,\.]+;/.test(navigator.userAgent)),isSafari:/Safari/.test(navigator.userAgent),isOpera:!!window.opera,isObjectEval:(Richfaces.eval!=undefined),isFF3:(!window.opera&&/Firefox\s*[\/]3[\.]/.test(navigator.userAgent))};
Richfaces.eval=function(template,object){var value="";
try{with(object){value=eval(template)
}}catch(e){LOG.warn("Exception: "+e.message+"\n["+template+"]")
}return value
};
Richfaces.interpolate=function(A,D){for(var C in D){var B=D[C];
var E=new RegExp("\\{"+C+"\\}","g");
A=A.replace(E,B)
}return A
};
if(!Richfaces.position){Richfaces.Position={}
}Richfaces.Position.setElementPosition=function(D,M,H,K,C){var P=Richfaces.Position.getOffsetDimensions(D);
var L=Richfaces.Position.getOffsetDimensions(M);
var F=Richfaces.Position.getWindowViewport();
var N=Position.cumulativeOffset(M);
var B=N[0];
var A=N[1];
var O=/^(top|bottom)-(left|right)$/;
var E;
if(typeof H=="object"){B=H.x;
A=H.y
}else{if(H&&(E=H.toLowerCase().match(O))!=null){if(E[2]=="right"){B+=L.width
}if(E[1]=="bottom"){A+=L.height
}}else{}}if(K&&(E=K.toLowerCase().match(O))!=null){var G=K.toLowerCase().split("-");
if(E[2]=="left"){B-=P.width+C.x
}else{B+=C.x
}if(E[1]=="top"){A-=P.height+C.y
}else{A+=C.y
}}else{var J={square:0};
var I={right:N[0]+L.width,top:N[1]+L.height};
I.left=I.right-P.width;
I.bottom=I.top+P.height;
B=I.left;
A=I.top;
var Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B>=0&&A>=0&&J.square<Q){J={x:B,y:A,square:Q}
}I={right:N[0]+L.width,bottom:N[1]};
I.left=I.right-P.width;
I.top=I.bottom-P.height;
B=I.left;
A=I.top;
Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B>=0&&A>=0&&J.square<Q){J={x:B,y:A,square:Q}
}I={left:N[0],top:N[1]+L.height};
I.right=I.left+P.width;
I.bottom=I.top+P.height;
B=I.left;
A=I.top;
Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B>=0&&A>=0&&J.square<Q){J={x:B,y:A,square:Q}
}I={left:N[0],bottom:N[1]};
I.right=I.left+P.width;
I.top=I.bottom-P.height;
B=I.left;
A=I.top;
Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B<0||A<0||J.square>Q){B=J.x;
A=J.y
}}}}}}D.style.left=B+"px";
D.style.top=A+"px"
};
Richfaces.Position.getOffsetDimensions=function(C){C=$(C);
var G=$(C).getStyle("display");
if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;
var F=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="block";
var H=C.offsetWidth;
var E=C.offsetHeight;
B.display=A;
B.position=D;
B.visibility=F;
return{width:H,height:E}
};
Richfaces.writeAttribute=function(B,A,D){var C=B.getAttributeNode(A);
if(D!==null){if(C){C.nodeValue=D
}else{C=document.createAttribute(A);
C.nodeValue=D;
B.setAttributeNode(C)
}}else{if(C){B.removeAttributeNode(C)
}}}

