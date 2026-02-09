(function(){"use strict";const n=document.getElementById("search-input"),s=document.getElementById("search-results"),e=document.getElementById("search-stats"),d=document.getElementById("search-clear");if(!n||!s)return;let o=null,a=[];fetch("/index.json").then(e=>e.json()).then(e=>{a=e,o=new Fuse(a,{keys:[{name:"title",weight:3},{name:"tags",weight:2},{name:"categories",weight:2},{name:"summary",weight:1.5},{name:"content",weight:1}],threshold:.4,includeScore:!0,includeMatches:!0,minMatchCharLength:2});const s=new URLSearchParams(window.location.search),t=s.get("q");t&&(n.value=t,r(t))}).catch(e=>{console.log("Error loading search index",e),s.innerHTML='<p class="search-error">Failed to load search index.</p>'});let i;n.addEventListener("input",function(){clearTimeout(i);const e=this.value.trim();if(e.length===0){l();return}i=setTimeout(()=>{r(e)},300)}),d&&d.addEventListener("click",()=>{n.value="",l(),n.focus()});function r(e){if(!o)return;const t=performance.now(),n=o.search(e),s=performance.now(),i=((s-t)/1e3).toFixed(3);u(n,e,i)}function u(n,o,i){if(n.length===0){s.innerHTML=`
                <div class="no-results">
                    <div class="no-results__icon">🔍</div>
                    <h3>No results found for "${t(o)}"</h3>
                    <p>Try different keywords or check the spelling.</p>
                </div>
            `,e&&(e.textContent=`No results found in ${i}s`);return}e&&(e.innerHTML=`Found <span>${n.length}</span> result${n.length!==1?"s":""} in ${i}s`);const a=n.map(e=>{const{item:t}=e,n=Math.round((1-e.score)*100);return`
                <article class="search-result">
                    <div class="search-result__header">
                        <h2 class="search-result__title">
                            <a href="${t.permalink}">${c(t.title,e.matches,"title")}</a>
                        </h2>
                        <span class="search-result__score">${n}%</span>
                    </div>
                    <div class="search-result__meta">
                        <span>${h(t.date)}</span>
                        ${t.categories?`<span>${t.categories[0]}</span>`:""}
                        ${t.readingTime?`<span>${t.readingTime} min read</span>`:""}
                    </div>
                    <p class="search-result__summary">
                        ${c(t.summary||`${t.content.substring(0,200)}...`,e.matches,"summary","content")}
                    </p>
                    ${t.tags&&t.tags.length>0?`
                        <div class="search-result__tags">
                            ${t.tags.slice(0,5).map(e=>`<span class="tag">${e}</span>`).join("")}
                        </div>
                    `:""}
                </article>
            `}).join("");s.innerHTML=a}function c(i,a,...c){if(!a)return t(i);const r=a.filter(e=>c.includes(e.key));if(r.length===0)return t(i);let s=i;const e=[];r.forEach(t=>{t.indices.forEach(t=>{const[n,s]=t;e.push({start:n,end:s})})}),e.sort((e,t)=>e.start-t.start);const o=[];let n=e[0];for(let t=1;t<e.length;t++)e[t].start<=n.end+1?n.end=Math.max(n.end,e[t].end):(o.push(n),n=e[t]);n&&o.push(n);for(let e=o.length-1;e>=0;e--){const a=o[e],{start:n,end:i}=a,r=t(s.substring(0,n)),c=t(s.substring(n,i+1)),l=t(s.substring(i+1));s=`${r}<mark>${c}</mark>${l}`}return s}function l(){s.innerHTML="",e&&(e.textContent="")}function h(e){const t=new Date(e);return t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}function t(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}})()