"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var consts_1 = require("../consts");
var get_inner_html_method_1 = require("./get-inner-html.method");
var proxify_image_src_1 = require("../proxify-image-src");
var remove_child_nodes_method_1 = require("./remove-child-nodes.method");
function a(el, forApp, webp) {
    var href = el.getAttribute('href');
    // Continue if href has no value
    if (!href) {
        return;
    }
    var className = el.getAttribute('class');
    // Don't touch user and hashtag links
    if (['markdown-author-link', 'markdown-tag-link'].indexOf(className) !== -1) {
        return;
    }
    // Do not allow js hrefs
    if (href.startsWith('javascript')) {
        el.removeAttribute('href');
        return;
    }
    // if href is an image url and innerHTML same with href then mark it as image
    // & => &amp; can break equality
    if (href.match(consts_1.IMG_REGEX) &&
        href.trim().replace(/&amp;/g, '&') ===
            (0, get_inner_html_method_1.getSerializedInnerHTML)(el).trim().replace(/&amp;/g, '&')) {
        var attrs = forApp ? "data-href=\"".concat(href, "\" class=\"markdown-img-link\" src=\"").concat((0, proxify_image_src_1.proxifyImageSrc)(href, 0, 0, webp ? 'webp' : 'match'), "\"") : "class=\"markdown-img-link\" src=\"".concat((0, proxify_image_src_1.proxifyImageSrc)(href, 0, 0, webp ? 'webp' : 'match'), "\"");
        var replaceNode = consts_1.DOMParser.parseFromString("<img ".concat(attrs, "/>"));
        el.parentNode.replaceChild(replaceNode, el);
        return;
    }
    if (href.match(consts_1.IPFS_REGEX) &&
        href.trim().replace(/&amp;/g, '&') ===
            (0, get_inner_html_method_1.getSerializedInnerHTML)(el).trim().replace(/&amp;/g, '&') &&
        href.indexOf('#') === -1) {
        if (forApp) {
            el.setAttribute('data-href', href);
            el.removeAttribute('href');
        }
        el.setAttribute('class', 'markdown-img-link');
        (0, remove_child_nodes_method_1.removeChildNodes)(el);
        var img = el.ownerDocument.createElement('img');
        img.setAttribute('src', href);
        el.appendChild(img);
        return;
    }
    // If a hive post
    var postMatch = href.match(consts_1.POST_REGEX);
    if (postMatch && consts_1.WHITE_LIST.includes(postMatch[1].replace(/www./, ''))) {
        el.setAttribute('class', 'markdown-post-link');
        var tag = postMatch[2];
        var author = postMatch[3].replace('@', '');
        var permlink = postMatch[4];
        if (el.textContent === href) {
            el.textContent = "/@".concat(author, "/").concat(permlink);
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-tag', tag);
            el.setAttribute('data-author', author);
            el.setAttribute('data-permlink', permlink);
        }
        else {
            var h = "/".concat(tag, "/@").concat(author, "/").concat(permlink);
            el.setAttribute('href', h);
        }
        return;
    }
    // If a hive user with url
    var mentionMatch = href.match(consts_1.MENTION_REGEX);
    if (mentionMatch && consts_1.WHITE_LIST.includes(mentionMatch[1].replace(/www./, '')) && mentionMatch.length === 3) {
        el.setAttribute('class', 'markdown-author-link');
        var author = mentionMatch[2].replace('@', '').toLowerCase();
        if (el.textContent === href) {
            el.textContent = "@".concat(author);
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-author', author);
        }
        else {
            var h = "/@".concat(author);
            el.setAttribute('href', h);
        }
        return;
    }
    // If a copied post and profile section links
    var cpostMatch = href.match(consts_1.COPIED_POST_REGEX);
    if ((cpostMatch && consts_1.WHITE_LIST.includes(cpostMatch[1].substring(1))) || (cpostMatch && cpostMatch.length === 4 && cpostMatch[1].indexOf('/') !== 0)) {
        if (['wallet', 'feed', 'followers', 'following', 'points', 'communities', 'posts', 'blog', 'comments', 'replies', 'settings'].includes(cpostMatch[3])) {
            el.setAttribute('class', 'markdown-profile-link');
            var author = cpostMatch[2].replace('@', '').toLowerCase();
            var section = cpostMatch[3];
            if (el.textContent === href) {
                el.textContent = "/@".concat(author, "/").concat(section);
            }
            if (forApp) {
                var ha = "https://ecency.com/@".concat(author, "/").concat(section);
                el.setAttribute('href', ha);
            }
            else {
                var h = "/@".concat(author, "/").concat(section);
                el.setAttribute('href', h);
            }
            return;
        }
        else {
            el.setAttribute('class', 'markdown-post-link');
            var tag = 'post';
            if (!consts_1.WHITE_LIST.includes(cpostMatch[1].substring(1))) {
                tag = cpostMatch[1];
            }
            var author = cpostMatch[2].replace('@', '');
            var permlink = cpostMatch[3];
            if (el.textContent === href) {
                el.textContent = "/@".concat(author, "/").concat(permlink);
            }
            if (forApp) {
                el.removeAttribute('href');
                el.setAttribute('data-tag', tag);
                el.setAttribute('data-author', author);
                el.setAttribute('data-permlink', permlink);
            }
            else {
                var h = "/".concat(tag, "/@").concat(author, "/").concat(permlink);
                el.setAttribute('href', h);
            }
            return;
        }
    }
    // If a custom hive community link
    var comMatch = href.match(consts_1.COMMUNITY_REGEX);
    if (comMatch && consts_1.WHITE_LIST.includes(comMatch[1])) {
        el.setAttribute('class', 'markdown-community-link');
        var community = comMatch[2];
        var filter = comMatch[3].substring(1);
        if (!filter)
            filter = 'created';
        if (filter === 'about' || filter === 'discord') {
            filter = 'created';
        }
        if (el.textContent === href) {
            el.textContent = "".concat(filter, "/").concat(community);
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-community', community);
            el.setAttribute('data-filter', filter);
        }
        else {
            var h = "/".concat(filter, "/").concat(community);
            el.setAttribute('href', h);
        }
        return;
    }
    // If a collections post
    var cccMatch = href.match(consts_1.CCC_REGEX);
    if (cccMatch && consts_1.WHITE_LIST.includes(cccMatch[1])) {
        el.setAttribute('class', 'markdown-post-link');
        var tag = 'ccc';
        var author = cccMatch[2].replace('@', '');
        var permlink = cccMatch[3];
        if (el.textContent === href) {
            el.textContent = "/@".concat(author, "/").concat(permlink);
        }
        if (forApp) {
            el.removeAttribute('href');
            el.setAttribute('data-tag', tag);
            el.setAttribute('data-author', author);
            el.setAttribute('data-permlink', permlink);
        }
        else {
            var h = "/".concat(tag, "/@").concat(author, "/").concat(permlink);
            el.setAttribute('href', h);
        }
        return;
    }
    var BCmatch = href.match(consts_1.BITCHUTE_REGEX);
    if (BCmatch && el.textContent.trim() === href) {
        var e = consts_1.BITCHUTE_REGEX.exec(href);
        var vid = e[1];
        el.setAttribute('class', 'markdown-video-link');
        el.removeAttribute('href');
        var embedSrc = "https://www.bitchute.com/embed/".concat(vid, "/");
        el.textContent = '';
        el.setAttribute('data-embed-src', embedSrc);
        var play = el.ownerDocument.createElement('span');
        play.setAttribute('class', 'markdown-video-play');
        el.appendChild(play);
        return;
    }
    // If a youtube video
    var match = href.match(consts_1.YOUTUBE_REGEX);
    if (match && el.textContent.trim() === href) {
        var e = consts_1.YOUTUBE_REGEX.exec(href);
        if (e[1]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-youtube');
            el.removeAttribute('href');
            var vid = e[1];
            var thumbnail = (0, proxify_image_src_1.proxifyImageSrc)("https://img.youtube.com/vi/".concat(vid.split('?')[0], "/hqdefault.jpg"), 0, 0, webp ? 'webp' : 'match');
            var embedSrc = "https://www.youtube.com/embed/".concat(vid, "?autoplay=1");
            el.textContent = '';
            el.setAttribute('data-embed-src', embedSrc);
            var thumbImg = el.ownerDocument.createElement('img');
            thumbImg.setAttribute('class', 'no-replace video-thumbnail');
            thumbImg.setAttribute('itemprop', 'thumbnailUrl');
            thumbImg.setAttribute('src', thumbnail);
            var play = el.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            el.appendChild(thumbImg);
            el.appendChild(play);
            return;
        }
    }
    // If vimeo video
    match = href.match(consts_1.VIMEO_REGEX);
    if (match && href === el.textContent) {
        var e = consts_1.VIMEO_REGEX.exec(href);
        if (e[3]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-vimeo');
            el.removeAttribute('href');
            var embedSrc = "https://player.vimeo.com/video/".concat(e[3]);
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            el.appendChild(ifr);
            return;
        }
    }
    // If twitch video
    match = href.match(consts_1.TWITCH_REGEX);
    if (match && href === el.textContent) {
        var e = consts_1.TWITCH_REGEX.exec(href);
        if (e[2]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-twitch');
            el.removeAttribute('href');
            var embedSrc = '';
            if (e[1] === undefined) {
                embedSrc = "https://player.twitch.tv/?channel=".concat(e[2]);
            }
            else {
                embedSrc = "https://player.twitch.tv/?video=".concat(e[1]);
            }
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            el.appendChild(ifr);
            return;
        }
    }
    // If a spotify audio
    match = href.match(consts_1.SPOTIFY_REGEX);
    if (match && el.textContent.trim() === href) {
        var e = consts_1.SPOTIFY_REGEX.exec(href);
        if (e[1]) {
            el.setAttribute('class', 'markdown-audio-link markdown-audio-link-spotify');
            el.removeAttribute('href');
            var embedSrc = "https://open.spotify.com/embed/playlist/".concat(e[1]);
            el.textContent = '';
            var ifr = el.ownerDocument.createElement('iframe');
            ifr.setAttribute('frameborder', '0');
            ifr.setAttribute('allowfullscreen', 'true');
            ifr.setAttribute('src', embedSrc);
            ifr.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
            el.appendChild(ifr);
            return;
        }
    }
    // If a d.tube video
    match = href.match(consts_1.D_TUBE_REGEX);
    if (match) {
        // Only d.tube links contains an image
        var imgEls = el.getElementsByTagName('img');
        if (imgEls.length === 1) {
            var e = consts_1.D_TUBE_REGEX.exec(href);
            // e[2] = username, e[3] object id
            if (e[2] && e[3]) {
                el.setAttribute('class', 'markdown-video-link markdown-video-link-dtube');
                el.removeAttribute('href');
                var thumbnail = (0, proxify_image_src_1.proxifyImageSrc)(imgEls[0].getAttribute('src').replace(/\s+/g, ''), 0, 0, webp ? 'webp' : 'match');
                var videoHref = "https://emb.d.tube/#!/".concat(e[2], "/").concat(e[3]);
                // el.setAttribute('data-video-href', videoHref);
                el.setAttribute('data-embed-src', videoHref);
                var thumbImg = el.ownerDocument.createElement('img');
                thumbImg.setAttribute('class', 'no-replace video-thumbnail');
                thumbImg.setAttribute('itemprop', 'thumbnailUrl');
                thumbImg.setAttribute('src', thumbnail);
                var play = el.ownerDocument.createElement('span');
                play.setAttribute('class', 'markdown-video-play');
                el.appendChild(thumbImg);
                el.appendChild(play);
                // Remove image.
                el.removeChild(imgEls[0]);
                return;
            }
        }
    }
    match = href.match(consts_1.D_TUBE_REGEX2);
    if (match) {
        var e = consts_1.D_TUBE_REGEX2.exec(href);
        // e[2] = username, e[3] object id
        if (e[2] && e[3]) {
            el.setAttribute('class', 'markdown-video-link markdown-video-link-dtube');
            el.removeAttribute('href');
            var videoHref = "https://emb.d.tube/#!/".concat(e[2], "/").concat(e[3]);
            // el.setAttribute('data-video-href', videoHref);
            el.setAttribute('data-embed-src', videoHref);
            var play = el.ownerDocument.createElement('span');
            play.setAttribute('class', 'markdown-video-play');
            el.appendChild(play);
            return;
        }
    }
    // Detect 3Speak
    match = href.match(consts_1.SPEAK_REGEX);
    if (match) {
        var imgEls = el.getElementsByTagName('img');
        if (imgEls.length === 1 || el.textContent.trim() === href) {
            var e = consts_1.SPEAK_REGEX.exec(href);
            // e[1] = tld , e[3] = embed address
            if (e[1] && e[3]) {
                var videoHref = "https://3speak.".concat(e[1], "/embed?v=").concat(e[3]);
                el.setAttribute('class', 'markdown-video-link markdown-video-link-speak');
                el.removeAttribute('href');
                el.setAttribute('data-embed-src', videoHref);
                if (el.textContent.trim() === href) {
                    el.textContent = '';
                }
                if (imgEls.length === 1) {
                    var thumbnail = (0, proxify_image_src_1.proxifyImageSrc)(imgEls[0].getAttribute('src').replace(/\s+/g, ''), 0, 0, webp ? 'webp' : 'match');
                    var thumbImg = el.ownerDocument.createElement('img');
                    thumbImg.setAttribute('class', 'no-replace video-thumbnail');
                    thumbImg.setAttribute('itemprop', 'thumbnailUrl');
                    thumbImg.setAttribute('src', thumbnail);
                    el.appendChild(thumbImg);
                    // Remove image.
                    el.removeChild(imgEls[0]);
                }
                var play = el.ownerDocument.createElement('span');
                play.setAttribute('class', 'markdown-video-play');
                el.appendChild(play);
                return;
            }
        }
    }
    // If tweets
    var matchT = href.match(consts_1.TWITTER_REGEX);
    if (matchT && el.textContent.trim() === href) {
        var e = consts_1.TWITTER_REGEX.exec(href);
        if (e) {
            var url = e[0].replace(/(<([^>]+)>)/gi, '');
            var author = e[1].replace(/(<([^>]+)>)/gi, '');
            var twitterCode = "<blockquote class=\"twitter-tweet\"><p>".concat(url, "</p>- <a href=\"").concat(url, "\">").concat(author, "</a></blockquote>");
            var replaceNode = consts_1.DOMParser.parseFromString(twitterCode);
            el.parentNode.replaceChild(replaceNode, el);
            return;
        }
    }
    if (href.indexOf('https://hivesigner.com/sign/account-witness-vote?witness=') === 0 && forApp) {
        el.setAttribute('class', 'markdown-witnesses-link');
        el.setAttribute('data-href', href);
        el.removeAttribute('href');
        return;
    }
    if (href.indexOf('hivesigner.com/sign/update-proposal-votes?proposal_ids') > 0 && forApp) {
        var m = decodeURI(href).match(/proposal_ids=\[(\d+)]/);
        if (m) {
            el.setAttribute('class', 'markdown-proposal-link');
            el.setAttribute('data-href', href);
            el.setAttribute('data-proposal', m[1]);
            el.removeAttribute('href');
            return;
        }
    }
    // If nothing matched element as external link so it will be opened in external window
    el.setAttribute('class', 'markdown-external-link');
    // Prepend https if no scheme provided
    if (!(/^((#)|(mailto:)|(\/(?!\/))|(((steem|hive|esteem|ecency|https?):)?\/\/))/.test(href))) {
        href = "https://".concat(href);
    }
    if (forApp) {
        el.setAttribute('data-href', href);
        el.removeAttribute('href');
    }
    else {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
    }
}
exports.a = a;
//# sourceMappingURL=a.method.js.map