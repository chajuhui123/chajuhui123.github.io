"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[678],{8102:function(e,t,n){n.r(t),n.d(t,{Head:function(){return d},default:function(){return g}});var r=n(5785),a=n(7294),l=n(1082),c=n(8771),o=n(8678),i=n(9357),m=n(9373),u=function(e){var t=e.selectedCategory,n=e.category,r=e.onClick;return a.createElement("div",{className:t===n?"category-item selected":"category-item non-selected",onClick:r},a.createElement("li",null,n))},s=function(e){var t=e.categories,n=e.selectedCategory,r=e.handleChangeCategory;return a.createElement("ul",{className:"category-wrapper"},a.createElement(u,{selectedCategory:n,category:"ALL",onClick:function(){return r("ALL")}}),t.map((function(e,t){return a.createElement(u,{key:t,selectedCategory:n,category:e,onClick:function(){return r(e)}})})))},g=function(e){var t,n=e.data,i=e.location,u=(0,a.useState)("ALL"),g=u[0],d=u[1],f=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",y=n.allMarkdownRemark.nodes,E=(0,a.useMemo)((function(){return(0,r.Z)(new Set(y.map((function(e){return e.frontmatter.category}))))}),[]);return 0===y.length?a.createElement(o.Z,{location:i,title:f},a.createElement(c.Z,null),a.createElement("p",null,"포스팅이 존재하지 않습니다 😢")):a.createElement(o.Z,{location:i,title:f},a.createElement(c.Z,null),a.createElement(s,{categories:E,selectedCategory:g,handleChangeCategory:function(e){E.includes(e)?d(e):d("ALL")}}),a.createElement("ol",{style:{listStyle:"none"}},y.map((function(e){if("ALL"===g||g===e.frontmatter.category){var t=e.frontmatter.title||e.fields.slug,n=new Date(e.frontmatter.date),r=n.getFullYear()+"년 "+(n.getMonth()+1)+"월 "+n.getDate()+"일";return a.createElement("li",{key:e.fields.slug},a.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("div",{style:{marginBottom:"10px"}},a.createElement(m.Z,{category:e.frontmatter.category})),a.createElement("h2",null,a.createElement(l.Link,{to:e.fields.slug,itemProp:"url"},a.createElement("span",{className:"underline gray",itemProp:"headline"},t))),a.createElement("small",null,r)),a.createElement("section",null,a.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}}))))},d=function(){return a.createElement(i.Z,{title:"JOY DEVLOG"})}}}]);
//# sourceMappingURL=component---src-pages-index-js-9a9ec7b774df4cf892f9.js.map