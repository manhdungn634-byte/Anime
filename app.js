const anime = [
 {id:1,title:"Hành Trình Của Nhà Giả Kim",genre:"Phiêu lưu",year:"2025",episodes:"24 tập",icon:"✦",c1:"#40366f",c2:"#a15b9b",desc:"Một chuyến phiêu lưu giả tưởng về tình bạn, lòng dũng cảm và những bí mật của thế giới."},
 {id:2,title:"Kiếm Sĩ Ánh Trăng",genre:"Hành động",year:"2025",episodes:"12 tập",icon:"⚔",c1:"#183b61",c2:"#3c8ca6",desc:"Một kiếm sĩ trẻ bước vào hành trình khám phá sức mạnh bí ẩn."},
 {id:3,title:"Mùa Hè Của Chúng Ta",genre:"Tình cảm",year:"2024",episodes:"12 tập",icon:"❀",c1:"#a65c75",c2:"#e6a77d",desc:"Câu chuyện nhẹ nhàng về tuổi trẻ, tình bạn và những rung động đầu đời."},
 {id:4,title:"Vương Quốc Mộng Mơ",genre:"Giả tưởng",year:"2025",episodes:"16 tập",icon:"♜",c1:"#294c65",c2:"#7864ad",desc:"Cánh cổng đến một vương quốc kỳ ảo mở ra với nhiều điều bất ngờ."},
 {id:5,title:"Đường Đua Tương Lai",genre:"Hành động",year:"2024",episodes:"13 tập",icon:"✧",c1:"#75412d",c2:"#c58a52",desc:"Những tay đua trẻ cạnh tranh để chạm đến giấc mơ của mình."},
 {id:6,title:"Khu Vườn Sao Băng",genre:"Tình cảm",year:"2025",episodes:"11 tập",icon:"☾",c1:"#3d477b",c2:"#b477b9",desc:"Một câu chuyện về những cuộc gặp gỡ định mệnh dưới bầu trời đầy sao."},
 {id:7,title:"Thợ Săn Dị Giới",genre:"Phiêu lưu",year:"2025",episodes:"20 tập",icon:"◇",c1:"#24554d",c2:"#67a18c",desc:"Nhóm thợ săn khám phá những vùng đất chưa từng được biết đến."},
 {id:8,title:"Bí Mật Học Viện",genre:"Giả tưởng",year:"2024",episodes:"12 tập",icon:"⌘",c1:"#50375e",c2:"#9a719e",desc:"Những bí mật kỳ lạ ẩn giấu sau cánh cửa của một học viện danh tiếng."},
 {id:9,title:"Chiến Binh Bình Minh",genre:"Hành động",year:"2025",episodes:"24 tập",icon:"☀",c1:"#794c32",c2:"#d19a5c",desc:"Một thế hệ chiến binh đứng lên bảo vệ quê hương."},
 {id:10,title:"Lạc Vào Xứ Sở Mây",genre:"Phiêu lưu",year:"2024",episodes:"10 tập",icon:"☁",c1:"#38627b",c2:"#92b5d4",desc:"Cuộc phiêu lưu kỳ thú trên những hòn đảo trôi giữa tầng mây."}
];
const grid=document.getElementById("animeGrid"), search=document.getElementById("searchInput");
let genre="Tất cả", favorites=JSON.parse(localStorage.getItem("anime-favorites")||"[]"), onlyFavorites=false;
function render(){
 const q=search.value.trim().toLocaleLowerCase("vi");
 const items=anime.filter(a=>(genre==="Tất cả"||a.genre===genre)&&a.title.toLocaleLowerCase("vi").includes(q)&&(!onlyFavorites||favorites.includes(a.id)));
 grid.innerHTML=items.map(a=>`<article class="anime-card" data-id="${a.id}" tabindex="0" role="button" aria-label="Xem ${a.title}"><div class="poster" style="--c1:${a.c1};--c2:${a.c2}"><span class="poster-art">${a.icon}</span><span class="poster-label">${a.genre.toUpperCase()}</span></div><h3>${a.title}</h3><div class="meta">${a.year}　•　${a.episodes}</div></article>`).join("");
 document.getElementById("resultCount").textContent=`${items.length} anime`;
 document.getElementById("emptyState").classList.toggle("hidden",items.length!==0);
}
function openDetail(id){
 const a=anime.find(x=>x.id===id);if(!a)return;
 const saved=favorites.includes(id);
 document.getElementById("detailContent").innerHTML=`<div class="detail-poster" style="background:linear-gradient(135deg,${a.c1},${a.c2})">${a.icon}</div><span class="eyebrow">${a.genre.toUpperCase()} · ${a.year}</span><h2>${a.title}</h2><div class="meta">${a.episodes}</div><p>${a.desc}</p><p><strong>Danh sách tập:</strong> Dữ liệu tập phim sẽ được bổ sung khi kết nối API nội dung được cấp phép.</p><button class="btn primary" id="favoriteToggle">${saved?"♥ Đã yêu thích":"♡ Thêm yêu thích"}</button>`;
 document.getElementById("favoriteToggle").onclick=()=>{favorites=saved?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("anime-favorites",JSON.stringify(favorites));openDetail(id);render();};
 document.getElementById("detailDialog").showModal();
}
grid.addEventListener("click",e=>{const card=e.target.closest("[data-id]");if(card)openDetail(Number(card.dataset.id));});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-id]"))openDetail(Number(e.target.dataset.id));});
document.getElementById("closeDialog").onclick=()=>document.getElementById("detailDialog").close();
document.getElementById("detailDialog").addEventListener("click",e=>{if(e.target.id==="detailDialog")e.target.close();});
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");genre=b.dataset.genre;onlyFavorites=false;render();});
search.addEventListener("input",render);
document.getElementById("searchForm").onsubmit=e=>{e.preventDefault();render();document.getElementById("catalog").scrollIntoView();};
document.getElementById("favoritesBtn").onclick=()=>{onlyFavorites=!onlyFavorites;genre="Tất cả";document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("selected",x.dataset.genre==="Tất cả"));document.getElementById("catalog").scrollIntoView();render();};
document.getElementById("menuBtn").onclick=()=>document.getElementById("catalog").scrollIntoView();
render();
