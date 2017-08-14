/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","e36be3becbf99a8d7bad6545df0810b4"],["/about.html","23d7108afea7bd7c5704c52b39958b51"],["/assets/css/main.css","e00b401941487efdf9421176c35e1c74"],["/assets/fonts/materialdesignicons-webfont.woff","eec7f0f7c8944b878af8fb7fcc091ade"],["/assets/fonts/materialdesignicons-webfont.woff2","9b9f2c447d27a622fcb78f6b7f38a095"],["/assets/images/2017/angular-cli-bootstrap-01.png","e8ca1c1f81cc39c0aaacf11a734e7067"],["/assets/images/2017/angular-cli-bootstrap-02.png","2bbc328d80256b789af64ebf4a73c340"],["/assets/images/2017/angular-cli-bootstrap-03.png","2f99a953d68a51576f5a411d5512bb0e"],["/assets/images/2017/angular-cli-bootstrap-04.png","2423ae9ea30d1dc0b849006407c8545b"],["/assets/images/2017/angular-cli-bootstrap.png","626da43cd390612e619145bf0ccbb5c2"],["/assets/images/2017/angular-login-hide-navbar-01.png","6389fe32cc52ed34349ffcecc4b188e7"],["/assets/images/2017/angular-login-hide-navbar-02.png","3e9eb99dc329ac221404ae471de557d8"],["/assets/images/2017/angular-login-hide-navbar-03.png","4e47d93e2a9e7ac9ffec5dc4aac1290f"],["/assets/images/2017/angular-login-hide-navbar-04.png","e677f653aec05b02b6c39e6425b3fe1c"],["/assets/images/2017/angular-login-hide-navbar-05.png","a4f13af0dc34dd428d082719e7c524ab"],["/assets/images/2017/angular-login-hide-navbar.png","63cac4abeba63594ceed52b7e7900aae"],["/assets/images/2017/angular-material-01.png","5a2a3a12fa70020a1ac654c654ee158b"],["/assets/images/2017/angular-material-02.png","68b4323fba45ba1ee44185fa2203406e"],["/assets/images/2017/angular-material-03.png","de4e00b5d02d11b8c43324da80e815cb"],["/assets/images/2017/angular-material-03_.png","5878663b5795b939a728038dd58d21b7"],["/assets/images/2017/angular-material-04.png","4505a14f07cb3a17daaee02bacf95d1a"],["/assets/images/2017/angular-material-05.png","2992edf3974afa16a94abb6677c5542f"],["/assets/images/2017/angular-material.png","f81f12107e0c39e21567ad1265e38ee3"],["/assets/images/2017/angular-reactive-forms-validate-submit-01.png","290bdb8bf48eb194138a00717f8d3c2d"],["/assets/images/2017/angular-reactive-forms-validate-submit-02.png","942658a6e9bb4b851cade642d7e9e8af"],["/assets/images/2017/angular-reactive-forms-validate-submit-03.png","3b14cdbac10f761a6743e9aa0c304680"],["/assets/images/2017/angular-reactive-forms-validate-submit-04.png","61cc2bf60b7ff721f585ba203e0ff8f3"],["/assets/images/2017/angular-reactive-forms-validate-submit.png","d58b7a39ff8a22c53d9d3c4eb8c09707"],["/assets/images/2017/angular-rxjs-imports.png","1a03e54784504e0c0a53339b2aee8c2d"],["/assets/images/2017/angular-rxjs-imports_.png","0a156d7a6c96cb3147208672dc018a87"],["/assets/images/icons/android-chrome-192x192.png","2788fca8aab1ab315223b5281f5bb799"],["/assets/images/icons/android-chrome-512x512.png","2503b2ddfa1a21c49ebe24564f9e2448"],["/assets/images/icons/apple-touch-icon.png","ff348716ae048b92c139a91748188ed5"],["/assets/images/icons/favicon-16x16.png","53be739626ff069322d99ef6c1ff2af9"],["/assets/images/icons/favicon-32x32.png","d34101616f0d230f643c30c1f669dc12"],["/assets/images/loiane.jpg","bb729073d2e7c1b5f668c32ed38facd2"],["/assets/images/speaking.jpg","214dbb8998533b1172a77ec054d1a94f"],["/assets/images/tags/angular.svg","cfac5f2654c3abbfab21ee42aff4ca38"],["/assets/images/tags/css3.svg","9bd8a437331bad2883843276f663daa8"],["/assets/images/tags/firebase.svg","7f8d489c1887554fcf61932505d46393"],["/assets/images/tags/hibernate.svg","78957422c4d6b657151cb6a0531c3478"],["/assets/images/tags/html5.svg","4c47611000f6d2b400377bed95fc45e9"],["/assets/images/tags/java.svg","1d0bf59ac1477d6b24ba9c435bb1e0eb"],["/assets/images/tags/js.svg","206ad9ea6c3f5eb5b0998a3d59ca5a1d"],["/assets/images/tags/link.svg","a7ec8303e95c5d6307f3d39096079289"],["/assets/images/tags/pt-br.svg","cbef77f96a510ba4b0132aeecc161fe8"],["/assets/images/tags/rxjs.svg","293e662ce3342876c278981f098eaa56"],["/assets/images/tags/sencha.svg","dc931c6345731401520ecaf3eaafba58"],["/assets/images/tags/spring.svg","6bc6a2787e40baf26d2f50ece8d4084c"],["/assets/images/tags/tag.svg","16dbdb5291b97739e786ac9abb8ca5b7"],["/assets/images/tags/typescript.svg","b29e9955334f81f00666c34bd77916af"],["/assets/scripts/main.min.js","d66db0bcaf970981e278a17780463d4e"],["/google65e7b792c5cf5847.html","cbbff063092ad39621bfa1e366d20a7a"],["/googlehostedservice.html","d616e3f0e15d7e688f3ddaaa233a68ff"],["/index.html","27a91703636663cb2aee79310097b5ff"],["/manifest.json","38755dfd0f623a6cf0b37e7f2bc0698b"],["/manifest.webapp","4516ec9a814473f40c3c60bc08a45b01"],["/speaking.html","c97ececcd8e670d8b007cc9833b28cfc"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







