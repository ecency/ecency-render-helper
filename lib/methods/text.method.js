"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = void 0;
var consts_1 = require("../consts");
var proxify_image_src_1 = require("../proxify-image-src");
var linkify_method_1 = require("./linkify.method");
function text(node, forApp, webp) {
    if (['a', 'code'].includes(node.parentNode.nodeName)) {
        return;
    }
    var linkified = (0, linkify_method_1.linkify)(node.nodeValue, forApp, webp);
    if (linkified !== node.nodeValue) {
        var replaceNode = consts_1.DOMParser.parseFromString("<span class=\"wr\">".concat(linkified, "</span>"));
        node.parentNode.insertBefore(replaceNode, node);
        node.parentNode.removeChild(node);
        return;
    }
    if (node.nodeValue.match(consts_1.IMG_REGEX)) {
        var attrs = forApp ? "data-href=\"".concat(node.nodeValue, "\" class=\"markdown-img-link\" src=\"").concat((0, proxify_image_src_1.proxifyImageSrc)(node.nodeValue, 0, 0, webp ? 'webp' : 'match'), "\"") : "class=\"markdown-img-link\" src=\"".concat((0, proxify_image_src_1.proxifyImageSrc)(node.nodeValue, 0, 0, webp ? 'webp' : 'match'), "\"");
        var replaceNode = consts_1.DOMParser.parseFromString("<img ".concat(attrs, "/>"));
        node.parentNode.replaceChild(replaceNode, node);
    }
    // If a youtube video
    if (node.nodeValue.match(consts_1.YOUTUBE_REGEX)) {
        var e = consts_1.YOUTUBE_REGEX.exec(node.nodeValue);
        if (e[1]) {
            var vid = e[1];
            var thumbnail = (0, proxify_image_src_1.proxifyImageSrc)("https://img.youtube.com/vi/".concat(vid.split('?')[0], "/hqdefault.jpg"), 0, 0, webp ? 'webp' : 'match');
            var embedSrc = "https://www.youtube.com/embed/".concat(vid, "?autoplay=1");
            var attrs = "class=\"markdown-video-link markdown-video-link-youtube\" data-embed-src=\"".concat(embedSrc, "\"");
            var thumbImg = node.ownerDocument.createElement('img');
            thumbImg.setAttribute('class', 'no-replace video-thumbnail');
            thumbImg.setAttribute('src', thumbnail);
            var play = node.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            var replaceNode = consts_1.DOMParser.parseFromString("<p><a ".concat(attrs, ">").concat(thumbImg).concat(play, "</a></p>"));
            node.parentNode.replaceChild(replaceNode, node);
        }
    }
}
exports.text = text;
//# sourceMappingURL=text.method.js.map