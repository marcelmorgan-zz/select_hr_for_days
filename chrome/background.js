// Copyright 2020 Marcel Morgan. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({selectHRFor: 'Hours'});
});

chrome.browserAction.onClicked.addListener(toggleSelectHR);

setIcon('select-hr-disabled');
checkSelectHR((unit) => setIcon(`select-hr-${unit}`) );

function toggleSelectHR() {
  checkSelectHR((unit) => {
    unit = unit == 'Hours' ? 'Days' : 'Hours';
    chrome.storage.local.set({ "selectHRFor": unit });

    setIcon(`select-hr-${unit}`);

    chrome.tabs.query({active: true}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.executeScript(tab.id, { file: "./content.js" });
      });
    });
  });
};

function checkSelectHR(callback) {
  chrome.storage.local.get(["selectHRFor"], function(result) {
    callback(result.selectHRFor || 'Hours');
  });
}

function setIcon(iconName) {
  chrome.browserAction.setIcon({
    path : {
      "16": `images/${iconName}-16.png`,
      "32": `images/${iconName}-32.png`,
      "48": `images/${iconName}-48.png`,
      "128": `images/${iconName}-128.png`,
    }
  });
}


