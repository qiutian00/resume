// 第二种 jquery 来实现

// $(".navbar a").on("click", function(e) {
//   if (this.hash !== "") {
//     console.log(this.hash);
//     e.preventDefault();
//     const hash = this.hash;

//     $("html, body").animate(
//       {
//         scrollTop: $(hash).offset().top
//       },
//       800
//     );
//   }
// });

// 第三种方式 smooth-scroll.js
const scroll = new SmoothScroll(".navbar a[href*='#']", {
  speed: 500
});
