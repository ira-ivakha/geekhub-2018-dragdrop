// // console.dir(jQuery.fn)
// // //
$.fn.extend(
  {
    hello:  function (options = {}) {
      options.customText = options.customText || "jkshgkjdshgjkdshgjkdshkgj";
      // console.log(arguments);

      const items = this;

      this.each(function(i, el) {
        // $(this).text(options.customText);
        el.innerText = options.customText;
      });



      return this;
    }
  }
);
// //
// // //
// // (function ($) {
  console.log($('p').css('border', '1px solid red').hello({customText: 'hahaha'}).eq(2).hello());
// // //   // const pList = document.querySelectorAll('p');
// // //   // console.log($(pList).css('border', '1px solid red').eq(2).css('border', '3px solid blue'));
// //
// // //   console.log($('p').hello())
// //
// //
// //
// //
// //
// // })(jQuery)
//
// console.log($(window));


jQuery(function ($) {
  console.log('1', $('p'));
})


console.log('2', $('p'));