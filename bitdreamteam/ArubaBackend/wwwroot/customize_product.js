
function setupInputListener(inputId, headingId) {
    var textInput = document.getElementById(inputId);
    var headline = document.getElementById(headingId);
    function updateHeadline() {
        headline.textContent = textInput.value;
    }
    textInput.addEventListener('input', updateHeadline);
}

function setupImagePreview(inputId, imgId) {
    var imageInput = document.getElementById(inputId);
    var imagePreview = document.getElementById(imgId);

    function updateImagePreview() {
      var file = imageInput.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    }

    imageInput.addEventListener('input', updateImagePreview);
}

// Call setupInputListener for each pair of input and heading elements
document.addEventListener('DOMContentLoaded', function() {
    setupInputListener('title_modify', 'title');
    setupInputListener('text1-modify', 'text1');

    setupInputListener('title2_modify', 'title2');
    setupInputListener('text2_modify', 'text2');
    setupInputListener('subtitle1_modify', 'subtitle1');
    setupInputListener('subtitle2_modify', 'subtitle2');
    setupInputListener('subtitle3_modify', 'subtitle3');
    setupInputListener('text3_modify', 'text3');
    setupInputListener('text4_modify', 'text4');
    setupInputListener('text5_modify', 'text5');

    setupInputListener('title3_modify', 'title3');
    setupInputListener('text6_modify', 'text6');
    setupInputListener('tier1_modify', 'tier1');
    setupInputListener('tier2_modify', 'tier2');
    setupInputListener('tier1Price_modify', 'tier1Price');
    setupInputListener('tier2Price_modify', 'tier2Price');
    setupInputListener('tier1Text_modify', 'tier1Text');
    setupInputListener('tier2Text_modify', 'tier2Text');
    setupInputListener('tier1Feature1_modify', 'tier1Feature1');
    setupInputListener('tier1Feature2_modify', 'tier1Feature2');
    setupInputListener('tier1Feature3_modify', 'tier1Feature3');
    setupInputListener('tier1Feature4_modify', 'tier1Feature4');
    setupInputListener('tier1Feature5_modify', 'tier1Feature5');
    setupInputListener('tier1Feature6_modify', 'tier1Feature6');
    setupInputListener('tier2Feature1_modify', 'tier2Feature1');
    setupInputListener('tier2Feature2_modify', 'tier2Feature2');
    setupInputListener('tier2Feature3_modify', 'tier2Feature3');
    setupInputListener('tier2Feature4_modify', 'tier2Feature4');
    // Set up the image preview for your input and img elements
    setupImagePreview('img1_modify', 'img1Preview');
});
// ... and so on for any additional pairs

function changeBackgroundColor_BusinessCasual() {
  var div1 = document.getElementById('section1Div');
  var div2 = document.getElementById('section2Div');
  var div3 = document.getElementById('section3Div');
  div1.classList.remove('bg-green-300', 'bg-blue-100')
  div1.classList.add('bg-gray-300');
  div2.classList.remove('bg-green-500', 'bg-blue-300')
  div2.classList.add('bg-white');
  div3.classList.remove('bg-green-300', 'bg-blue-100')
  div3.classList.add('bg-gray-300');

  var changeBg = document.querySelectorAll('.changeBg');
  var changetxt = document.querySelectorAll('.changeTxt');
  var changetxt2 = document.querySelectorAll('.changeTxt2');

  changetxt.forEach(function(element) {
    element.classList.remove('text-indigo-600','text-green-800','text-blue-800');
    element.classList.add('text-gray-600');
  });

  changeBg.forEach(function(element) {
    element.classList.remove('bg-indigo-500','bg-green-800','bg-blue-800');
    element.classList.add('bg-gray-600');
  });

  changetxt2.forEach(function(element) {
    element.classList.remove('text-indigo-600','text-green-800','text-blue-800');
    element.classList.add('text-gray-600');
  });

}

function changeBackgroundColor_RainForrest() {
  var div1 = document.getElementById('section1Div');
  var div2 = document.getElementById('section2Div');
  var div3 = document.getElementById('section3Div');
  div1.classList.remove('bg-gray-300', 'bg-blue-100')
  div1.classList.add('bg-green-300');
  div2.classList.remove('bg-white', 'bg-blue-300')
  div2.classList.add('bg-green-500');
  div3.classList.remove('bg-gray-300', 'bg-blue-100')
  div3.classList.add('bg-green-300');

  var changeBg = document.querySelectorAll('.changeBg');
  var changetxt = document.querySelectorAll('.changeTxt');
  var changetxt2 = document.querySelectorAll('.changeTxt2');

  changetxt.forEach(function(element) {
    element.classList.remove('text-indigo-600','text-gray-600','text-blue-800');
    element.classList.add('text-white');
  });

  changeBg.forEach(function(element) {
    element.classList.remove('bg-indigo-500','bg-gray-600','bg-blue-800');
    element.classList.add('bg-green-800');
  });

  changetxt2.forEach(function(element) {
    element.classList.remove('text-indigo-600','text-gray-600','text-blue-800');
    element.classList.add('text-green-800');
  });

}

function changeBackgroundColor_Sky() {
  var div1 = document.getElementById('section1Div');
  var div2 = document.getElementById('section2Div');
  var div3 = document.getElementById('section3Div');
  div1.classList.remove('bg-gray-300', 'bg-green-300')
  div1.classList.add('bg-blue-100');
  div2.classList.remove('bg-white', 'bg-green-500')
  div2.classList.add('bg-blue-300');
  div3.classList.remove('bg-gray-300', 'bg-green-300')
  div3.classList.add('bg-blue-100');

  var changeBg = document.querySelectorAll('.changeBg');
  var changetxt = document.querySelectorAll('.changeTxt');
  var changetxt2 = document.querySelectorAll('.changeTxt2');

  changetxt.forEach(function(element) {
    element.classList.remove('text-indigo-600','text-gray-600','text-green-800');
    element.classList.add('text-white');
  });

  changeBg.forEach(function(element) {
    element.classList.remove('bg-indigo-500','bg-gray-600','bg-green-800');
    element.classList.add('bg-blue-800');
  });

  changetxt2.forEach(function(element) {
    element.classList.remove('text-indigo-600','text-gray-600','text-green-800');
    element.classList.add('text-blue-800');
  });
}