(function(e){var t=function(e){return"number"==typeof e||e&&e==1*e},n=function(e,t){return"number"==typeof e||e&&e==1*e?1*e:t},i=["step","min","max","readonly","title","disabled","tabindex"],a={_create:function(){var t;for(this.element.addClass("ws-range").attr({role:"slider"}).append('<span class="ws-range-min" /><span class="ws-range-rail"><span class="ws-range-thumb" /></span>'),this.trail=e(".ws-range-rail",this.element),this.range=e(".ws-range-min",this.element),this.thumb=e(".ws-range-thumb",this.trail),this.updateMetrics(),this.orig=this.options.orig,t=0;i.length>t;t++)this[i[t]](this.options[i[t]]);this.value=this._value,this.value(this.options.value),this.initDataList(),this.element.data("rangeUi",this),this.addBindings(),this._init=!0},value:e.noop,_value:function(t,n,i){var a,r,s=this.options,o=t,l={},u={};n||parseFloat(t,10)==t||(t=s.min+(s.max-s.min)/2),n||(t=this.normalizeVal(t)),a=100*((t-s.min)/(s.max-s.min)),this._init&&t==s.value&&o==t||(this.options.value=t,this.thumb.stop(),this.range.stop(),u[this.dirs.width]=a+"%",this.vertical&&(a=Math.abs(a-100)),l[this.dirs.left]=a+"%",i?(i="object"!=typeof i?{}:e.extend({},i),i.duration||(r=Math.abs(a-parseInt(this.thumb[0].style[this.dirs.left]||50,10)),i.duration=Math.max(Math.min(999,5*r),99)),this.thumb.animate(l,i),this.range.animate(u,i)):(this.thumb.css(l),this.range.css(u)),this.orig&&(o!=t||!this._init&&this.orig.value!=t)&&this.options._change(t),this.element.attr({"aria-valuenow":this.options.value,"aria-valuetext":this.options.textValue?this.options.textValue(this.options.value):this.options.options[this.options.value]||this.options.value}))},initDataList:function(){if(this.orig){var t,n=this,i=function(){e(n.orig).jProp("list").off("updateDatalist",i).on("updateDatalist",i),clearTimeout(t),t=setTimeout(function(){n.list&&n.list()},9)};e(this.orig).on("listdatalistchange",i),this.list()}},list:function(){var n=this.options,i=n.min,a=n.max,r=this.trail,s=this;this.element.attr({"aria-valuetext":n.options[n.value]||n.value}),e(".ws-range-ticks",r).remove(),e(this.orig).jProp("list").find("option:not([disabled])").each(function(){n.options[e.prop(this,"value")]=e.prop(this,"label")||""}),e.each(n.options,function(o,l){if(!(!t(o)||i>o||o>a)){var u=100*((o-i)/(a-i)),c=n.showLabels&&l?' title="'+l+'"':"";s.vertical&&(u=Math.abs(u-100)),s.posCenter(e('<span class="ws-range-ticks"'+c+' data-label="'+l+'" style="'+s.dirs.left+": "+u+'%;" />').appendTo(r))}})},readonly:function(e){e=!!e,this.options.readonly=e,this.element.attr("aria-readonly",""+e),this._init&&this.updateMetrics()},disabled:function(e){e=!!e,this.options.disabled=e,e?this.element.attr({tabindex:-1,"aria-disabled":"true"}):this.element.attr({tabindex:this.options.tabindex,"aria-disabled":"false"}),this._init&&this.updateMetrics()},tabindex:function(e){this.options.tabindex=e,this.options.disabled||this.element.attr({tabindex:e})},title:function(e){this.element.prop("title",e)},min:function(e){this.options.min=n(e,0),this.value(this.options.value,!0)},max:function(e){this.options.max=n(e,100),this.value(this.options.value,!0)},step:function(e){this.options.step="any"==e?"any":n(e,1),this.value(this.options.value)},normalizeVal:function(e){var t,n,i,a=this.options;return a.min>=e?e=a.min:e>=a.max?e=a.max:"any"!=a.step&&(i=a.step,t=(e-a.min)%i,n=e-t,2*Math.abs(t)>=i&&(n+=t>0?i:-i),e=1*n.toFixed(5)),e},doStep:function(e,t){var i=n(this.options.step,1);"any"==this.options.step&&(i=Math.min(i,(this.options.max-this.options.min)/10)),this.value(this.options.value+i*e,!1,t)},getStepedValueFromPos:function(e){var t,n,i,a;return 0>=e?t=this.options[this.dirs.min]:e>100?t=this.options[this.dirs.max]:(this.vertical&&(e=Math.abs(e-100)),t=(this.options.max-this.options.min)*(e/100)+this.options.min,a=this.options.step,"any"!=a&&(n=(t-this.options.min)%a,i=t-n,2*Math.abs(n)>=a&&(i+=n>0?a:-a),t=1*i.toFixed(5))),t},addRemoveClass:function(e,t){var n,i=-1!=this.element.prop("className").indexOf(e);!t&&i?(n="removeClass",this.element.removeClass(e),this.updateMetrics()):t&&!i&&(n="addClass"),n&&(this.element[n](e),this._init&&this.updateMetrics())},addBindings:function(){var t,n,i,a=this,r=this.options,s=function(){var t={};return{init:function(n,i,r){t[n]||(t[n]={fn:r},a.orig&&e(a.orig).on(n,function(){t[n].val=e.prop(a.orig,"value")})),t[n].val=i},call:function(e,n){t[e].val!=n&&(clearTimeout(t[e].timer),t[e].val=n,t[e].timer=setTimeout(function(){t[e].fn(n,a)},0))}}}(),o=function(e,i){var o=a.getStepedValueFromPos((e[a.dirs.mouse]-t)*n);o!=r.value&&(a.value(o,!1,i),s.call("input",o)),e&&"mousemove"==e.type&&e.preventDefault()},l=function(t){t&&"mouseup"==t.type&&(s.call("input",r.value),s.call("change",r.value)),a.addRemoveClass("ws-active"),e(document).off("mousemove",o).off("mouseup",l),e(window).off("blur",u)},u=function(e){e.target==window&&l()},c=function(i){var s;if(i.preventDefault(),e(document).off("mousemove",o).off("mouseup",l),e(window).off("blur",u),!r.readonly&&!r.disabled){if(a.element.focus(),a.addRemoveClass("ws-active",!0),t=a.element.focus().offset(),n=a.element[a.dirs.innerWidth](),!n||!t)return;s=a.thumb[a.dirs.outerWidth](),t=t[a.dirs.pos],n=100/n,o(i,r.animate),e(document).on({mouseup:l,mousemove:o}),e(window).on("blur",u),i.stopPropagation()}},h={mousedown:c,focus:function(){r.disabled||(s.init("input",r.value),s.init("change",r.value),a.addRemoveClass("ws-focus",!0),a.updateMetrics()),i=!0},blur:function(){a.element.removeClass("ws-focus ws-active"),a.updateMetrics(),i=!1,s.init("input",r.value),s.call("change",r.value)},keyup:function(){a.addRemoveClass("ws-active"),s.call("input",r.value),s.call("change",r.value)},keydown:function(e){var t=!0,n=e.keyCode;r.readonly||r.disabled||(39==n||38==n?a.doStep(1):37==n||40==n?a.doStep(-1):33==n?a.doStep(10,r.animate):34==n?a.doStep(-10,r.animate):36==n?a.value(a.options.max,!1,r.animate):35==n?a.value(a.options.min,!1,r.animate):t=!1,t&&(a.addRemoveClass("ws-active",!0),s.call("input",r.value),e.preventDefault()))}};s.init("input",r.value,this.options.input),s.init("change",r.value,this.options.change),h[e.fn.mwheelIntent?"mwheelIntent":"mousewheel"]=function(e,t){t&&i&&!r.readonly&&!r.disabled&&(a.doStep(t),e.preventDefault(),s.call("input",r.value))},this.element.on(h),this.thumb.on({mousedown:c}),window.webshims&&webshims.ready("WINDOWLOAD",function(){webshims.ready("dom-support",function(){e.fn.onWSOff&&a.element.onWSOff("updateshadowdom",function(){a.updateMetrics()})}),!e.fn.onWSOff&&webshims._polyfill&&webshims._polyfill(["dom-support"])})},posCenter:function(e,t){var n;!this.options.calcCenter||this._init&&!this.element[0].offsetWidth||(e||(e=this.thumb),t||(t=e[this.dirs.outerWidth]()),t/=-2,e.css(this.dirs.marginLeft,t),this.options.calcTrail&&e[0]==this.thumb[0]&&(n=this.element[this.dirs.innerHeight](),e.css(this.dirs.marginTop,(e[this.dirs.outerHeight]()-n)/-2),this.range.css(this.dirs.marginTop,(this.range[this.dirs.outerHeight]()-n)/-2),t*=-1,this.trail.css(this.dirs.left,t).css(this.dirs.right,t)))},updateMetrics:function(){var e=this.element.innerWidth();this.vertical=e&&this.element.innerHeight()-e>10,this.dirs=this.vertical?{mouse:"pageY",pos:"top",min:"max",max:"min",left:"top",right:"bottom",width:"height",innerWidth:"innerHeight",innerHeight:"innerWidth",outerWidth:"outerHeight",outerHeight:"outerWidth",marginTop:"marginLeft",marginLeft:"marginTop"}:{mouse:"pageX",pos:"left",min:"min",max:"max",left:"left",right:"right",width:"width",innerWidth:"innerWidth",innerHeight:"innerHeight",outerWidth:"outerWidth",outerHeight:"outerHeight",marginTop:"marginTop",marginLeft:"marginLeft"},this.element[this.vertical?"addClass":"removeClass"]("vertical-range")[this.vertical?"addClass":"removeClass"]("horizontal-range"),this.posCenter()}},r=function(e){function t(){}return t.prototype=e,new t};e.fn.rangeUI=function(t){return t=e.extend({readonly:!1,disabled:!1,tabindex:0,min:0,step:1,max:100,value:50,input:e.noop,change:e.noop,_change:e.noop,showLabels:!0,options:{},calcCenter:!0,calcTrail:!0},t),this.each(function(){var n=e.extend(r(a),{element:e(this)});n.options=t,n._create.call(n)})},window.webshims&&webshims.isReady&&(webshims.ready("es5",function(){webshims.isReady("range-ui",!0)}),webshims._polyfill&&webshims._polyfill(["es5"]))})(window.webshims?webshims.$:jQuery),webshims.register("form-number-date-ui",function(e,t,n,i,a,r){"use strict";var s,o=t.formcfg,l=function(e){e.stopImmediatePropagation()},u=function(t){if(!s.patterns[t+"Obj"]){var n={};e.each(s.patterns[t].split(s[t+"Format"]),function(e,t){n[t]=e}),s.patterns[t+"Obj"]=n}},c={date:{_create:function(){var t={splits:[e('<input type="text" class="yy" size="4" inputmode="numeric" />')[0],e('<input type="text" class="mm" inputmode="numeric" maxlength="2" size="2" />')[0],e('<input type="text" class="dd ws-spin" inputmode="numeric" maxlength="2" size="2" />')[0]]};return t.elements=[t.splits[0],e('<span class="ws-input-seperator" />')[0],t.splits[1],e('<span class="ws-input-seperator" />')[0],t.splits[2]],t},sort:function(t){u("d");var n=0,i=e(".ws-input-seperator",t).html(s.dFormat),a=e("input",t);e.each(s.patterns.dObj,function(e){var r=a.filter("."+e);r[0]&&(r.appendTo(t),i.length>n&&i.eq(n).insertAfter(r),n++)})}},month:{_create:function(t){var n={splits:[e('<input type="text" class="yy" inputmode="numeric" size="4" />')[0],e('<input type="text" class="mm ws-spin" />')[0]]};return t.onlyMonthDigits&&e(n.splits[1]).attr({inputmode:"numeric",size:2,maxlength:2}),n.elements=[n.splits[0],e('<span class="ws-input-seperator" />')[0],n.splits[1]],n},sort:function(t){var n,i=e(".ws-input-seperator",t).html(s.dFormat),a=e("input.mm",t);s.date.showMonthAfterYear?(a.appendTo(t),n="insertBefore"):(a.prependTo(t),n="insertAfter"),i[n](a)}}},h=(new Date).getTime()-1e3*60*(new Date).getTimezoneOffset(),p={number:{step:1},time:{step:60},month:{step:1,start:new Date(h)},date:{step:1,start:new Date(h)}},d=function(){var n=function(){return t.getID(this)};return function(t,i,a){e(t).attr({"aria-labelledby":i.map(n).get().join(" ")}),a||i.on("click",function(e){return t.getShadowFocusElement().focus(),e.preventDefault(),!1})}}(),f=function(e){return e?(e+="",1==e.length?"0"+e:e):""};(function(){var n=["01","02","03","04","05","06","07","08","09","10","11","12"];o.de=e.extend(!0,{numberFormat:{",":".",".":","},timeSigns:":. ",numberSigns:",",dateSigns:".",dFormat:".",patterns:{d:"dd.mm.yy"},month:{currentText:"Aktueller Monat"},date:{close:"schlie\u00dfen",clear:"L\u00f6schen",prevText:"Zur\u00fcck",nextText:"Vor",currentText:"Heute",monthNames:["Januar","Februar","M\u00e4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","M\u00e4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],dayNamesMin:["So","Mo","Di","Mi","Do","Fr","Sa"],weekHeader:"KW",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""}},o.de||{}),o.en=e.extend(!0,{numberFormat:{".":".",",":","},numberSigns:".",dateSigns:"/",timeSigns:":. ",dFormat:"/",patterns:{d:"mm/dd/yy"},month:{currentText:"This month"},date:{closeText:"Done",clear:"Clear",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""}},o.en||{}),o["en-US"]||(o["en-US"]=e.extend(!0,{},o.en)),o["en-GB"]||(o["en-GB"]=e.extend(!0,{},o.en,{date:{firstDay:1},patterns:{d:"dd/mm/yy"}})),o["en-AU"]||(o["en-AU"]=e.extend(!0,{},o["en-GB"])),o[""]||(o[""]=o["en-US"]),s=o[""];var r=function(t){if(!t.date.monthkeys){var i=function(e,n){var i,a=e+1;i=10>a?"0"+a:""+a,t.date.monthkeys[a]=i,t.date.monthkeys[n]=i,t.date.monthkeys[n.toLowerCase()]=i};t.date.monthkeys={},t.date.monthDigits=n,t.numberSigns+="-",e.each(t.date.monthNames,i),e.each(t.date.monthNamesShort,i)}t.colorSigns||(t.colorSigns="#abcdefABCDEF")},l=function(){r(s),e(i).triggerHandler("wslocalechange")};l(),t.activeLang({register:"form-core",callback:function(){e.each(arguments,function(e,t){return o[t]?(o[t]!=s&&(s=o[t],l()),!1):a})}}),t.activeLang({langObj:o,module:"form-core",callback:function(e){s!=e&&(s=e,l())}})})(),function(){var n=function(t){e(this)["mousepressstart"==t.type?"addClass":"removeClass"]("mousepress-ui")},i=function(e,t){return"number"==typeof e||e&&e==1*e?1*e:t},r={number:function(e){return(e+"").replace(/\,/g,"").replace(/\./,s.numberFormat["."])},time:function(e){return e},week:function(e){return e},month:function(e,t){var n,i=e.split("-");return i[0]&&i[1]?(n=s.date[t.formatMonthNames]||s.date[t.monthNames]||s.date.monthNames,i[1]=n[1*i[1]-1],t&&t.splitInput?e=[i[0]||"",i[1]||""]:i[1]&&(e=s.date.showMonthAfterYear?i.join(" "):i[1]+" "+i[0])):t&&t.splitInput&&(e=[i[0]||"",i[1]||""]),e},date:function(e,t){var n=(e+"").split("-");return n[2]&&n[1]&&n[0]?t&&t.splitInput?e=n:(e=s.patterns.d.replace("yy",n[0]||""),e=e.replace("mm",n[1]||""),e=e.replace("dd",n[2]||"")):t&&t.splitInput&&(e=[n[0]||"",n[1]||"",n[2]||""]),e},color:function(e){var t="#000000";return e&&(e=e.toLowerCase(),7==e.length&&d("color").isValid(e)&&(t=e)),t}},o={number:function(e){return(e+"").replace(s.numberFormat[","],"").replace(s.numberFormat["."],".")},time:function(e){return e},month:function(e,t,n){var i=t.splitInput?e:e.trim().split(/[\.\s-\/\\]+/);return 2==i.length&&i[0]&&i[1]?(i[0]=!n&&s.date.monthkeys[i[0]]||i[0],i[1]=!n&&s.date.monthkeys[i[1]]||i[1],e=2==i[1].length&&i[0].length>3?i[0]+"-"+i[1]:2==i[0].length&&i[1].length>3?i[1]+"-"+i[0]:""):t.splitInput&&(e=""),e},date:function(e,t,n){u("d");var i;return t.splitInput?i={yy:0,mm:1,dd:2}:(i=s.patterns.dObj,e=e.split(s.dFormat)),3==e.length&&e[0]&&e[1]&&e[2]&&(!n||e[i.yy].length>3&&2==e[i.mm].length&&2==e[i.dd].length)?[f(e[i.yy]),f(e[i.mm]),f(e[i.dd])].join("-"):""},color:function(e){var t="#000000";return e&&(e=e.toLowerCase(),0!==e.indexOf("#")&&(e="#"+e),4==e.length&&(e="#"+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2)+e.charAt(3)+e.charAt(3)),7==e.length&&d("color").isValid(e)&&(t=e)),t}},h={date:function(e,t){var n=(e||"").split("-");return n=3==n.length?t.splitInput?n:s.patterns.d.replace("yy",n[0]).replace("mm",n[1]).replace("dd",n[2]):t.splitInput?[e,e,e]:e},month:function(e,t){var n=(e||"").split("-");return n=2==n.length?t.splitInput?n:s.patterns.d.replace("yy",n[0]).replace("mm",n[1]):t.splitInput?[e,e]:e}},d=function(){var t={};return function(n){var i;return t[n]||(i=e('<input type="'+n+'" step="any" />'),t[n]={asNumber:function(e){var t="object"==typeof e?"valueAsDate":"value";return i.prop(t,e).prop("valueAsNumber")},asValue:function(e){var t="object"==typeof e?"valueAsDate":"valueAsNumber";return i.prop(t,e).prop("value")},isValid:function(e){return i.prop("value",e).is(":valid")&&i.prop("value")==e}}),t[n]}}();p.range=p.number;var m={_create:function(){var n,i,a,r=this.options,s=this.createOpts;for(this.type=r.type,this.orig=r.orig,this.buttonWrapper=e('<span class="input-buttons '+this.type+'-input-buttons"></span>').insertAfter(this.element),this.options.containerElements.push(this.buttonWrapper[0]),r.mirrorValidity=r.mirrorValidity&&this.orig&&Modernizr.formvalidation&&!t.bugs.bustedValidity,r.splitInput&&this._addSplitInputs?this._addSplitInputs():this.inputElements=this.element,p[this.type]&&"object"==typeof p[this.type].start&&(p[this.type].start=this.asNumber(p[this.type].start)),t.picker[this.type]||(r.buttonOnly=!1),n=0;s.length>n;n++)null!=r[s[n]]&&this[s[n]](r[s[n]],r[s[n]]);"color"==this.type&&this.inputElements.prop("maxLength",7),this.addBindings(),e(this.element).data("wsWidget"+r.type,this),r.buttonOnly&&this.inputElements.prop({readOnly:!0}),this._init=!0,r.mirrorValidity&&(i=this,a=function(){clearTimeout(a._timerDealy),a._timerDealy=setTimeout(a._wsexec,9)},a._wsexec=function(){clearTimeout(a._timerDealy),i.mirrorValidity(!0)},a(),e(this.orig).on("change input",function(e){"input"==e.type?a():a._wsexec()}))},mirrorValidity:function(t){if(this._init&&this.options.mirrorValidity){t||e.prop(this.orig,"validity");var n=e(this.orig).getErrorMessage();n!==this.lastErrorMessage&&(this.inputElements.prop("setCustomValidity",function(e,t){t._supvalue&&t._supvalue.call(this,n)}),this.lastErrorMessage=n)}},addBindings:function(){var t,i=this,r=this.options,o=function(){var t={};return{init:function(n,a,r){t[n]||(t[n]={fn:r},e(i.orig).on(n,function(){t[n].val=e.prop(i.orig,"value")})),t[n].val=a},call:function(e,n){t[e]&&t[e].val!=n&&(clearTimeout(t[e].timer),t[e].val=n,t[e].timer=setTimeout(function(){t[e].fn(n,i)},9))}}}(),u=function(){o.init("input",e.prop(i.orig,"value"),i.options.input),o.init("change",e.prop(i.orig,"value"),i.options.change)},c={},d=function(e){return d.prevent?(e.preventDefault(),(t||i.element.getShadowFocusElement()).focus(),l(e),!0):a};(function(){var t,n=function(n){var a;clearTimeout(t),a=i.parseValue(),"color"==i.type&&i.inputElements.val(a),e.prop(i.orig,"value",a),o.call("input",a),n&&"wsupdatevalue"==n.type||o.call("change",a)},a=function(){clearTimeout(t)},s=function(e){clearTimeout(t),t=setTimeout(n,0),"change"==e.type&&(l(e),r.splitInput||n())};i.element.on("wsupdatevalue",n),i.inputElements.add(i.buttonWrapper).add(i.element).on({"focus focusin":a,"blur focusout change":s}),setTimeout(function(){i.popover&&(i.popover.element.on("wspopoverhide",s),e("> *",i.popover.element).on({focusin:a,focusout:s}))},0)})();var f={},m=r.splitInput?this.inputElements.filter(".ws-spin"):this.inputElements.eq(0),v={blur:function(e){d(e)||r.disabled||r.readonly||d.prevent||(t=!1),l(e)},focus:function(){t||(u(),t=this)},keypress:function(e){if(!e.isDefaultPrevented()){var t,n=!0,a=e.keyCode;e.ctrlKey||e.metaKey||!s[i.type+"Signs"]?n=!1:(t=String.fromCharCode(null==e.charCode?a:e.charCode),n=!(" ">t||(s[i.type+"Signs"]+"0123456789").indexOf(t)>-1)),n&&e.preventDefault()}},input:"color"==this.type&&this.isValid?e.noop:function(){var e,t=function(){var e=i.parseValue(!0);e&&i.isValid(e)&&i.setInput(e)};return function(){clearTimeout(e),e=setTimeout(t,200)}}(),"input keydown keypress":function(){var t,n=!1,i=function(){n===!0?(n="semi",t=setTimeout(i,250)):n=!1},a=function(){n=!0,clearTimeout(t),t=setTimeout(i,300)},s=function(){var e=this;setTimeout(function(){e.focus(),e.select()},4),a()};return function(t){if(r.splitInput&&r.jumpInputs)if("input"==t.type){if(e.prop(this,"value").length===e.prop(this,"maxLength"))try{e(this).next().next("input").each(s)}catch(i){}}else t.shiftKey||t.crtlKey||9!=t.keyCode||n!==!0&&(!n||e.prop(this,"value"))||t.preventDefault()}}()},g=function(){return r.disabled||t||i.element.getShadowFocusElement().focus(),d.set(),!1};d.set=function(){var e,t=function(){d.prevent=!1};return function(){clearTimeout(e),d.prevent=!0,setTimeout(t,9)}}(),this.buttonWrapper.on("mousedown",g),this.setInput=function(e){i.value(e),o.call("input",e)},this.setChange=function(e){i.setInput(e),o.call("change",e)},this.inputElements.on(v),p[this.type]&&(["stepUp","stepDown"].forEach(function(e){c[e]=function(n){if(!r.disabled&&!r.readonly){t||g();var a=!1;n||(n=1);try{i.elemHelper[e](n),a=i.elemHelper.prop("value"),i.value(a),o.call("input",a)}catch(s){}return a}}}),r.noSpinbtn||(f[e.fn.mwheelIntent?"mwheelIntent":"mousewheel"]=function(e,n){n&&t&&!r.disabled&&(c[n>0?"stepUp":"stepDown"](),e.preventDefault())},f.keydown=function(t){if(!(r.list||t.isDefaultPrevented()||e.attr(this,"list"))){var n=!0,i=t.keyCode;38==i?c.stepUp():40==i?c.stepDown():n=!1,n&&t.preventDefault()}},m.attr({autocomplete:"off",role:"spinbutton"}).on(f)),e(this.buttonWrapper).on("mousepressstart mousepressend",".step-up, .step-down",n).on("mousedown mousepress",".step-up",function(){c.stepUp()}).on("mousedown mousepress",".step-down",function(){c.stepDown()})),"color"!=this.type&&function(){var t;r.splitInput?(t=function(){i.reorderInputs()},i.reorderInputs()):t=function(){r.value&&i.value(r.value,!0),h[i.type]&&r.placeholder&&i.placeholder(r.placeholder)},e(i.orig).onWSOff("wslocalechange",t)}(),u()},value:function(e,t){(!this._init||t||e!==this.options.value)&&(this.element.val(this.formatValue(e)),this.options.value=e,this._propertyChange("value"),this.mirrorValidity())},required:function(e,t){this.inputElements.attr({"aria-required":""+t}),this.mirrorValidity()},parseValue:function(t){var n=this.inputElements.map(function(){return e.prop(this,"value")}).get();return this.options.splitInput||(n=n[0]),o[this.type](n,this.options,t)},formatValue:function(e,t){return r[this.type](e,t===!1?!1:this.options)},createOpts:["readonly","title","disabled","tabindex","placeholder","value","required"],placeholder:function(t){var n=this.options;n.placeholder=t;var i=t;h[this.type]&&(i=h[this.type](t,this.options)),n.splitInput&&"object"==typeof i?e.each(this.splits,function(t,n){e.prop(n,"placeholder",i[t])}):this.element.prop("placeholder",i)},initDataList:function(){var t,n=this,i=function(){e(n.orig).jProp("list").off("updateDatalist",i).on("updateDatalist",i),clearTimeout(t),t=setTimeout(function(){n.list&&n.list()},9)};e(this.orig).onTrigger("listdatalistchange",i)},getOptions:function(){var t={},n=e(this.orig).jProp("list");return n.find("option").each(function(){t[e.prop(this,"value")]=e.prop(this,"label")}),[t,n.data("label")]},list:function(t){("number"==this.type||"time"==this.type)&&this.element.attr("list",e.attr(this.orig,"list")),this.options.list=t,this._propertyChange("list")},_propertyChange:e.noop,tabindex:function(t){this.options.tabindex=t,this.inputElements.prop("tabindex",this.options.tabindex),e("button",this.buttonWrapper).prop("tabindex",this.options.tabindex)},title:function(t){!t&&this.orig&&null==e.attr(this.orig,"title")&&(t=null),this.options.title=t,null==t?this.inputElements.removeAttr("title"):this.inputElements.prop("title",this.options.title)}};["readonly","disabled"].forEach(function(t){var n="disabled"==t;m[t]=function(i,a){var r=this.options;r[t]==a&&this._init||(r[t]=!!a,!n&&r.buttonOnly?this.inputElements.attr({"aria-readonly":r[t]}):this.inputElements.prop(t,r[t]),this.buttonWrapper[r[t]?"addClass":"removeClass"]("ws-"+t),n&&e("button",this.buttonWrapper).prop("disabled",r[t]))}});var v=e.extend({},m,{_create:function(){var t=this.options,n=d(t.type);this.elemHelper=e('<input type="'+t.type+'" />'),this.asNumber=n.asNumber,this.asValue=n.asValue,this.isValid=n.isValid,m._create.apply(this,arguments),this._init=!1,this.buttonWrapper.html('<span unselectable="on" class="step-controls"><span class="step-up"></span><span class="step-down"></span></span>'),"number"==this.type&&this.inputElements.attr("inputmode","numeric"),t.min||"number"!=typeof t.relMin||(t.min=this.asValue(this.getRelNumber(t.relMin)),e.prop(this.orig,"min",t.min)),t.max||"number"!=typeof t.relMax||(t.max=this.asValue(this.getRelNumber(t.relMax)),e.prop(this.orig,"max",t.max)),this._init=!0},createOpts:["step","min","max","readonly","title","disabled","tabindex","placeholder","value","required"],_addSplitInputs:function(){if(!this.inputElements){var t=c[this.type]._create(this.options);this.splits=t.splits,this.inputElements=e(t.elements).prependTo(this.element).filter("input")}},getRelNumber:function(e){var t=p[this.type].start||0;return e&&(t+=e),t},addZero:f,_setStartInRange:function(){var e=this.getRelNumber(this.options.relDefaultValue);!isNaN(this.minAsNumber)&&this.minAsNumber>e?e=this.minAsNumber:!isNaN(this.maxAsNumber)&&e>this.maxAsNumber&&(e=this.maxAsNumber),this.elemHelper.prop("valueAsNumber",e),this.options.defValue=this.elemHelper.prop("value")},reorderInputs:function(){if(c[this.type]){var e=this.element;c[this.type].sort(e),setTimeout(function(){var n=t.data(e);n&&n.shadowData&&(n.shadowData.shadowFocusElement=e.find("input")[0]||e[0])},9)}},value:function(t,n){(!this._init||n||this.options.value!==t)&&(this.valueAsNumber=this.asNumber(t),this.options.value=t,isNaN(this.valueAsNumber)||!isNaN(this.minAsNumber)&&this.valueAsNumber<this.minAsNumber||!isNaN(this.maxAsNumber)&&this.valueAsNumber>this.maxAsNumber?this._setStartInRange():(this.elemHelper.prop("value",t),this.options.defValue=""),t=r[this.type](t,this.options),this.options.splitInput?e.each(this.splits,function(n,i){e.prop(i,"value",t[n])}):this.element.prop("value",t),this._propertyChange("value"),this.mirrorValidity())},step:function(e){var t=p[this.type];this.options.step=e,this.elemHelper.prop("step",i(e,t.step)),this.mirrorValidity()}});e.each({min:1,max:-1},function(e,t){var n=e+"AsNumber";v[e]=function(i){this.elemHelper.prop(e,i),this[n]=this.asNumber(i),null!=this.valueAsNumber&&(isNaN(this.valueAsNumber)||!isNaN(this[n])&&this.valueAsNumber*t<this[n]*t)&&this._setStartInRange(),this.options[e]=i,this._propertyChange(e),this.mirrorValidity()}}),e.fn.wsBaseWidget=function(t){return t=e.extend({},t),this.each(function(){e.webshims.objectCreate(m,{element:{value:e(this)}},t)})},e.fn.spinbtnUI=function(t){return t=e.extend({monthNames:"monthNames",size:1,startView:0},t),this.each(function(){e.webshims.objectCreate(v,{element:{value:e(this)}},t)})}}(),function(){var n={},a=function(e,n){return e=("color"==e?"color":"forms")+"-picker",a[n+"Loaded"+e]||(a[n+"Loaded"+e]=!0,t.ready(n,function(){t.loader.loadList([e])})),e};r.addZero=f,t.loader.addModule("forms-picker",{noAutoCallback:!0,options:r}),t.loader.addModule("color-picker",{noAutoCallback:!0,css:"jpicker/jpicker.css",options:r}),n._genericSetFocus=function(t,n){if(t=e(t||this.activeButton),!this.popover.openedByFocus&&!n){var i=this,a=function(e){clearTimeout(i.timer),i.timer=setTimeout(function(){t[0]&&(t[0].focus(),e===!0||t.is(":focus")||a(!0))},i.popover.isVisible?99:360)};this.popover.activateElement(t),a()}},n._actions={changeInput:function(e,t,i){n._actions.cancel(e,t,i),i.setChange(e)},cancel:function(e,t,n){t.stopOpen=!0,n.element.getShadowFocusElement().focus(),setTimeout(function(){t.stopOpen=!1},9),t.hide()}},n.commonInit=function(t,n){var a;n.isDirty=!0,n.element.on("updatepickercontent pickerchange",function(){a=!1}),n.contentElement.on({keydown:function(i){if(9==i.keyCode){a||(a=e('input:not(:disabled), [tabindex="0"]:not(:disabled)',this).filter(":visible"));var r=a.index(i.target);if(i.shiftKey&&0>=r)return a.last().focus(),!1;if(!i.shiftKey&&r>=a.length-1)return a.first().focus(),!1}else if(27==i.keyCode)return t.element.getShadowFocusElement().focus(),n.hide(),!1}}),t._propertyChange=function(){var e,t=function(){n.isVisible&&n.element.triggerHandler("updatepickercontent")};return function(i){"value"!=i&&(n.isDirty=!0,n.isVisible&&(clearTimeout(e),e=setTimeout(t,9)))}}(),n.activeElement=e([]),n.activateElement=function(t){t=e(t),t[0]!=n.activeElement[0]&&(n.activeElement.removeClass("ws-focus"),t.addClass("ws-focus")),n.activeElement=t},n.element.on({wspopoverbeforeshow:function(){t.element.triggerHandler("wsupdatevalue"),n.element.triggerHandler("updatepickercontent")}}),e(t.orig).on("remove",function(n){n.originalEvent||e(i).off("wslocalechange",t._propertyChange)})},n._common=function(i){var r=i.options,s=t.objectCreate(t.wsPopover,{},{prepareFor:i.element,position:r.widgetPosition}),o=e('<button type="button" class="ws-popover-opener"><span /></button>').appendTo(i.buttonWrapper),u=function(){(n[i.type].showPickerContent||n.showPickerContent)(i,s)},c=function(){var e=a(i.type,"DOM");r.disabled||r.readonly||s.isVisible||(t.ready(e,u),s.show(i.element))};r.containerElements.push(s.element[0]),"color"!=i.type&&(r.startView||(r.startView=0),r.minView||(r.minView=0),r.startView<r.minView&&(r.startView=r.minView,t.warn("wrong config for minView/startView.")),r.size||(r.size=1)),s.element.addClass(i.type+"-popover input-picker").attr({role:"application"}).on({wspopoverhide:function(){s.openedByFocus=!1},focusin:function(e){s.activateElement&&(s.openedByFocus=!1,s.activateElement(e.target))},focusout:function(){s.activeElement&&s.activeElement.removeClass("ws-focus")}}),d(s.element.children("div.ws-po-outerbox").attr({role:"group"}),r.labels,!0),d(o,r.labels,!0),null!=r.tabindex&&o.attr({tabindex:r.tabindex}),r.disabled&&o.prop({disabled:!0}),o.on({mousedown:function(){l.apply(this,arguments),s.preventBlur()},click:function(){s.isVisible&&s.activeElement&&(s.openedByFocus=!1,s.activeElement.focus()),c()},focus:function(){s.preventBlur()}}),function(){var e=!1,t=function(){e=!1};i.inputElements.on({focus:function(){!s.stopOpen&&(r.buttonOnly||r.openOnFocus||e&&r.openOnMouseFocus)?(s.openedByFocus=r.buttonOnly?!1:!r.noInput,c()):s.preventBlur()},mousedown:function(){e=!0,setTimeout(t,9),r.buttonOnly&&s.isVisible&&s.activeElement&&(s.openedByFocus=!1,setTimeout(function(){s.openedByFocus=!1,s.activeElement.focus()},4)),i.element.is(":focus")&&(s.openedByFocus=r.buttonOnly?!1:!r.noInput,c()),s.preventBlur()}})}(),i.popover=s,i.opener=o,e(i.orig).on("remove",function(e){e.originalEvent||setTimeout(function(){o.remove(),s.element.remove()},4)}),a(i.type,"WINDOWLOAD")},n.month=n._common,n.date=n._common,n.color=function(t){var i=n._common.apply(this,arguments),a=e(t.orig).data("alphacontrol"),r=t.opener.prepend('<span class="ws-color-indicator-bg"><span class="ws-color-indicator" /></span>').find(".ws-color-indicator"),s=function(){r.css({backgroundColor:e.prop(this,"value")||"#000"})},o=function(){var e,n=function(){try{var e=t.alpha.prop("valueAsNumber")/(t.alpha.prop("max")||1);isNaN(e)||r.css({opacity:e})}catch(n){}};return function(t){clearTimeout(e),e=setTimeout(n,t&&"change"!=t.type?40:4)}}();return t.alpha=a?e("#"+a):e([]),e(t.orig).on("wsupdatevalue change",s).each(s),t.alpha.on("wsupdatevalue change input",o).each(o),i},t.picker=n}(),function(){var n,a,s=Modernizr.inputtypes,o={},u=["disabled","readonly","value","min","max","step","title","required","placeholder"],h=["data-placeholder","tabindex"];if(e.each(u.concat(h),function(e,i){var a=i.replace(/^data\-/,"");t.onNodeNamesPropertyModify("input",i,function(e,i){if(!n){var r=t.data(this,"shadowData");r&&r.data&&r.nativeElement===this&&r.data[a]&&r.data[a](e,i)}})}),r.replaceUI&&"valueAsNumber"in i.createElement("input")){var f=function(){t.data(this,"hasShadow")&&e.prop(this,"value",e.prop(this,"value"))};t.onNodeNamesPropertyModify("input","valueAsNumber",f),t.onNodeNamesPropertyModify("input","valueAsDate",f)}var m=function(){return function(t,n){o[t]=n,n.attrs=e.merge([],h,n.attrs),n.props=e.merge([],u,n.props)}}(),v=function(){return"none"!=e.css(this,"display")},g=function(t){var n,i=function(){e(t.orig).removeClass("ws-important-hide"),e.style(t.orig,"display","");var i,a,r,s=.6;(!n||t.orig.offsetWidth)&&(i=t.buttonWrapper&&t.buttonWrapper.filter(v).length,a=e.css(t.orig,"marginRight"),t.element.css({marginLeft:e.css(t.orig,"marginLeft"),marginRight:i?0:a}),i&&(r=parseInt(t.buttonWrapper.css("marginLeft"),10)||0,t.element.css({paddingRight:""}),0>r?(a=(parseInt(a,10)||0)+-1*(t.buttonWrapper.outerWidth()+r),t.buttonWrapper.css("marginRight",a),t.element.css({paddingRight:""}).css({paddingRight:(parseInt(t.element.css("paddingRight"),10)||0)+t.buttonWrapper.outerWidth()})):(t.buttonWrapper.css("marginRight",a),s=t.buttonWrapper.outerWidth(!0)+.6)),t.element.outerWidth(e(t.orig).outerWidth()-s)),n=!0,e(t.orig).addClass("ws-important-hide")};t.element.onWSOff("updateshadowdom",i,!0)},y=function(){var i,s,c,p,f,m=e.prop(this,"type");if(o[m]&&t.implement(this,"inputwidgets")){for(c={},p=m,f=e(this).jProp("labels"),s=e.extend({},r.widgets,r[m],e(e.prop(this,"form")).data(m)||{},e(this).data(m)||{},{orig:this,type:m,labels:f,options:{},input:function(e){s._change(e,"input")},change:function(e){s._change(e,"change")},_change:function(t,i){n=!0,e.prop(s.orig,"value",t),n=!1,i&&e(s.orig).trigger(i)
},containerElements:[]}),i=0;u.length>i;i++)s[u[i]]=e.prop(this,u[i]);for(i=0;h.length>i;i++)p=h[i].replace(/^data\-/,""),"placeholder"!=p&&s[p]||(s[p]=e.attr(this,h[i])||s[p]);s.onlyMonthDigits&&(s.formatMonthNames="monthDigits"),c.shim=o[m]._create(s),t.addShadowDom(this,c.shim.element,{data:c.shim||{}}),c.shim.options.containerElements.push(c.shim.element[0]),d(e(this).getShadowFocusElement(),f),e(this).on("change",function(){n||c.shim.value(e.prop(this,"value"))}),function(){var t,n={focusin:!0,focus:!0},i=!1,a=!1;e(c.shim.options.containerElements).on({"focusin focus focusout blur":function(r){r.stopImmediatePropagation(),a=n[r.type],clearTimeout(t),t=setTimeout(function(){a!=i&&(i=a,e(s.orig).triggerHandler(a?"focus":"blur"),e(s.orig).trigger(a?"focusin":"focusout")),i=a},0)}})}(),c.shim.element.on("change input",l),Modernizr.formvalidation&&e(s.orig).on("firstinvalid",function(n){(t.fromSubmit||!a)&&e(s.orig).off("invalid.replacedwidgetbubble").on("invalid.replacedwidgetbubble",function(i){n.isInvalidUIPrevented()||i.isDefaultPrevented()||(t.validityAlert.showFor(n.target),n.preventDefault(),i.preventDefault()),e(s.orig).off("invalid.replacedwidgetbubble")})}),c.shim.buttonWrapper&&c.shim.buttonWrapper.filter(v).length&&c.shim.element.addClass("has-input-buttons"),c.shim.element.addClass(e.prop(this,"className")),s.calculateWidth?g(c.shim):e(this).addClass("ws-important-hide")}};Modernizr.formvalidation&&["input","form"].forEach(function(e){var n=t.defineNodeNameProperty(e,"checkValidity",{prop:{value:function(){a=!0;var e=n.prop._supvalue.apply(this,arguments);return a=!1,e}}})}),(!s.range||r.replaceUI)&&m("range",{_create:function(t){var n=e("<span />").insertAfter(t.orig).rangeUI(t).data("rangeUi");return n}});var b=-1!=navigator.userAgent.indexOf("MSIE 10.0")&&-1==navigator.userAgent.indexOf("Touch");["number","time","month","date","color"].forEach(function(n){(!s[n]||r.replaceUI||"number"==n&&b)&&m(n,{_create:function(i){i.splitInput&&!c[n]&&(t.warn("splitInput not supported for "+n),i.splitInput=!1);var a=i.splitInput?'<span class="ws-'+n+' ws-input" role="group"></span>':'<input class="ws-'+n+'" type="text" />',r=e(a).insertAfter(i.orig);return r=p[n]?r.spinbtnUI(i).data("wsWidget"+n):r.wsBaseWidget(i).data("wsWidget"+n),t.picker&&t.picker[n]&&t.picker[n](r),r.buttonWrapper.addClass("input-button-size-"+r.buttonWrapper.children().filter(v).length),r}})}),t.addReady(function(t,n){e("input",t).add(n.filter("input")).each(y)})}()});