function numericValues(){ return Array.from(document.getElementsByClassName('numericValue')); }
function setUnit(numericValue){
  var hoursToDays = 7.5;

  chrome.storage.local.get(["selectHRFor"], function(result) {
    var whiteList = ["Days", "Hours"]
    var unit = result.selectHRFor;
    if(unit == numericValue.children[0].innerText) { return; }

    if(whiteList.includes(unit)){
      var timeUnitHtml = `<span class="suffix" style="font-size:0.4em; white-space: pre; display:inline-block;">${unit}</span>`;

      if(unit == 'Hours') {
        numericValue.innerHTML = `${parseFloat(numericValue.innerText.replace('Days')) * hoursToDays}${timeUnitHtml}`;
      } else if(unit == 'Days') {
        numericValue.innerHTML = `${parseFloat(numericValue.innerText.replace('Hours')) / hoursToDays}${timeUnitHtml}`;
      } else {
        // Do nothing as unit not yet set
      }
    }
  });
}

function updateUnits(){
  numericValues().forEach(setUnit);
}

updateUnits();
setTimeout(updateUnits, 500); // Hack to make it work om page reload!


