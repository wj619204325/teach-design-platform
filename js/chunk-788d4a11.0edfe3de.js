(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-788d4a11"],{cc04:function(e,a,n){},e5f4:function(e,a,n){"use strict";n.r(a),n("b0c0");var t=n("6625"),l=n.n(t),o=n("f1ad"),r=[{name:"记忆",value:"对学习过的知识能够识记、保持和再现。",word1:{name:"背诵",value:"学生能够流利背诵《岳阳楼记》，无明显错误。"},word2:{name:"复述",value:"学生能够复述“武昌起义”的原因与经过。"},word3:{name:"列举",value:"学生能够准确列举出100以内的所有质数。"},word4:{name:"默写",value:"学生能够准确默写出陆游的整首《游山西村》。"},word5:{name:"辨别",value:"学生能够准确地辨别出地图上的东南西北方位。"}},{name:"理解",value:"将“新”的知识与原有的“旧”知识联系起来，并纳入到已有的认知结构中或重构已有的认知结构。",word1:{name:"阐释",value:"学生能够有条理地阐释出红军长征主要精神。"},word2:{name:"举例说明",value:"学生能够正确举例说明1公顷与1平方千米各有多大。"},word3:{name:"对比",value:"学生能够对比出热带与亚热带的典型气候类型、气候特征、成因、分布地点、降水型等特点。"},word4:{name:"分类",value:"学生能够将一个数字分类到正确的数的类型。"},word5:{name:"总结",value:"学生能够正确总结出《落花生》课文主旨。"}},{name:"运用",value:"在特定的情境中，使用一定的方法和程序完成某一任务。",word1:{name:"运用",value:"学生能够运用等腰三角形的概念和性质解决简单的几何问题。"},word2:{name:"计算",value:"学生能够通过树状图和列表法计算简单事件发生的概率，明确计算步骤并给出相应的结果。"},word3:{name:"实施",value:"学生能够按照实验设计和要求正确实施实验方案，遵守实验步骤，正确操作实验。"},word4:{name:"操作",value:"学生能够动手操作完成创意贺卡的制作，明确各操作之间的关系及相应的操作结果。"},word5:{name:"制定",value:"学生能够根据温度、湿度和光照三个条件综合制定实验方案，实验方案设计明确，具有可行性。"}},{name:"分析",value:"分析是将材料分解，剖析其各组成部分之间的关系，以了解其总体结构和目的。",word1:{name:"分析",value:"学生能够从人物外貌、性格、行为等方面综合分析文中的人物形象，能够给予适当的理由进行解释、说明。"},word2:{name:"分解",value:"学生能够将利用Scratch制作抽奖转盘的大任务分解为各个小任务，通过任务切分和重组综合进行问题解决。"},word3:{name:"辨析",value:"学生能够根据音色和音长正确辨别鼓、锣、叉、沙锤等乐器，并指出各乐器的音色特点。"},word4:{name:"区分",value:"学生能够根据蔬菜的外形、颜色与功能对蔬菜进行分类，正确区分不同种类的蔬菜。"},word5:{name:"组织",value:"学生能够根据“总-分-总”的文章结构合理组织段落内容，各段落之间具有一定的逻辑性与连贯性。"}},{name:"评价",value:"评价是根据标准或规格做出判断。",word1:{name:"判断",value:"学生能够判断摩擦力的方向和大小，及不同方向力对摩擦力的影响。"},word2:{name:"验证",value:"学生能验证实验中提出的假设，并能给出验证思路和结果。"},word3:{name:"选择",value:"学生能够搜索和选择素材，用于完成编程作品。"},word4:{name:"衡量",value:"学生能够衡量和修改设计图初稿及意见，共同制定评价量表。"},word5:{name:"评定",value:"学生能合理有效评定各组作品质量，并完成组内同伴互评。"}},{name:"创造",value:"创造是将各要素组合，形成形式新颖、内在一致的有机整体，或创造出原创作品。例。",word1:{name:"生成",value:"学生能生成设计的小组作品，并能拼装硬件和实现功能。"},word2:{name:"撰写",value:"学生能独立撰写议论文，语言通顺、论据论点清晰合理。"},word3:{name:"设计",value:"学生能够设计用程序绘制的花园，并完成设计图。"},word4:{name:"改进",value:"学生能够不断改进代码积木块，实现目标功能，并能简化代码。"},word5:{name:"提出",value:"学生能够根据问题代码提出问题，并能组织有效讨论，解决部分问题。"}}],s=n("7722"),c={components:{VueUeditorWrap:l.a},data:function(){return{name:"Teach_Demand",editContent:Object(s.b)("Teach_Demand"),observerDebounceTime:5e3,exampleDialogVisiable:!1,tableData:r,showTable:!0,wordName:"",wordValue:"",clickDemandTagIndex:0,demandList:["布鲁姆教学目标","布鲁姆教学目标","布鲁姆教学目标","布鲁姆教学目标"],config:o.a}},methods:{setColSpan:function(){},cellClickEvent:function(e,a){var n=a.property;if("name"!==n){this.showTable=!1;var t=e[n];this.wordName=t.name,this.wordValue=t.value}},headerCellStyle:function(e){switch(e.row,e.column,e.rowIndex,e.columnIndex){case 1:case 2:case 4:return{borderRight:"none",color:"#fff"};case 3:return{borderRight:"none"};case 5:return{color:"#fff"}}},handleOptionTagClick:function(e,a){this.clickDemandTagIndex=a}},watch:{editContent:function(e){Object(s.e)(this.name,e),this.$message({message:"本地自动保存成功！",iconClass:"el-icon-success",duration:2e3,customClass:"message-class"})}},mounted:function(){}},d=(n("f31b"),n("2877")),i=Object(d.a)(c,(function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("el-container",{staticClass:"demand-wrap"},[n("el-main",[n("div",{staticClass:"top-half"},[e.showTable?n("div",{staticClass:"table-wrap"},[n("p",[e._v("布鲁姆将教学目标按照由低到高分为"),n("strong",[n("i",[e._v("记忆、理解、运用、分析、评价、创造")])]),e._v("六个维度，每个教学目标维度可以用一系列的动词进行描述，具体如下表所示。")]),n("el-table",{ref:"table",attrs:{data:e.tableData,"cell-class-name":"cellClass",size:"small",border:"","header-cell-style":e.headerCellStyle},on:{"cell-click":e.cellClickEvent}},[n("el-table-column",{attrs:{label:"认知目标",prop:"name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[n("el-tooltip",{attrs:{placement:"top","popper-class":"table-tooltip",enterable:!1,content:a.row.value}},[n("div",{attrs:{slot:"content"},slot:"content"},[e._v(e._s(a.row.name)+"含义："),n("br"),e._v(e._s(a.row.value))]),n("div",[e._v(e._s(a.row.name))])])]}}],null,!1,591869904)}),e._l(5,(function(a){return[n("el-table-column",{key:a,attrs:{label:"常用动词",prop:"word"+a,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tooltip",{attrs:{placement:"top","popper-class":"table-tooltip",enterable:!1}},[n("div",{attrs:{slot:"content"},slot:"content"},[e._v(e._s(t.row["word"+a].name)+"范例："),n("br"),e._v(e._s(t.row["word"+a].value))]),n("div",[e._v(e._s(t.row["word"+a].name))])])]}}],null,!0)})]}))],2)],1):n("div",{staticClass:"example-content"},[n("p",[e._v(e._s(e.wordName+"范例："))]),n("p",[e._v(e._s(e.wordValue))]),n("el-button",{attrs:{type:"primary"},on:{click:function(a){e.showTable=!0}}},[e._v("返回")]),n("div",{staticStyle:{clear:"both"}})],1)]),n("div",{staticClass:"bottom-half"},[n("div",{staticClass:"editor-container"},[n("vue-ueditor-wrap",{attrs:{mode:"observer",observerDebounceTime:e.observerDebounceTime,config:e.config},model:{value:e.editContent,callback:function(a){e.editContent=a},expression:"editContent"}})],1)])]),n("el-aside",{staticClass:"demand-tag-aside",attrs:{width:"200px"}},e._l(e.demandList,(function(a,t){return n("el-tag",{key:"demandtag_"+t,class:{"chosen-style":t===e.clickDemandTagIndex},on:{click:function(n){return e.handleOptionTagClick(a,t)}}},[e._v(" "+e._s(a)+" ")])})),1)],1)}),[],!1,null,null,null);a.default=i.exports},f31b:function(e,a,n){"use strict";var t=n("cc04");n.n(t).a}}]);