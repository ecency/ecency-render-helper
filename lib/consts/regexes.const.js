"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPOTIFY_REGEX = exports.TWITTER_REGEX = exports.SPEAK_REGEX = exports.ARCH_REGEX = exports.ODYSEE_REGEX = exports.LBRY_REGEX = exports.TRUVVL_REGEX = exports.DAPPLR_REGEX = exports.TWITCH_REGEX = exports.D_TUBE_REGEX2 = exports.D_TUBE_REGEX = exports.BITCHUTE_REGEX = exports.VIMEO_REGEX = exports.YOUTUBE_REGEX = exports.COMMUNITY_REGEX = exports.COPIED_POST_REGEX = exports.MENTION_REGEX = exports.CCC_REGEX = exports.POST_REGEX = exports.IPFS_REGEX = exports.IMG_REGEX = void 0;
// link regex
exports.IMG_REGEX = /(https?:\/\/.*\.(?:tiff?|jpe?g|gif|png|svg|ico|heic|webp))(.*)/gim;
exports.IPFS_REGEX = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/gim;
exports.POST_REGEX = /^https?:\/\/(.*)\/(.*)\/(@[\w.\d-]+)\/(.*)/i;
exports.CCC_REGEX = /^https?:\/\/(.*)\/ccc\/([\w.\d-]+)\/(.*)/i;
exports.MENTION_REGEX = /^https?:\/\/(.*)\/(@[\w.\d-]+)$/i;
exports.COPIED_POST_REGEX = /\/(.*)\/(@[\w.\d-]+)\/(.*)/i;
exports.COMMUNITY_REGEX = /^https?:\/\/(.*)\/c\/(hive-\d+)(.*)/i;
exports.YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
exports.VIMEO_REGEX = /(https?:\/\/)?(www\.)?(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
exports.BITCHUTE_REGEX = /^(?:https?:\/\/)?(?:www\.)?bitchute.com\/(?:video|embed)\/([a-z0-9]+)/i;
exports.D_TUBE_REGEX = /(https?:\/\/d.tube.#!\/v\/)(\w+)\/(\w+)/g;
exports.D_TUBE_REGEX2 = /(https?:\/\/d.tube\/v\/)(\w+)\/(\w+)/g;
exports.TWITCH_REGEX = /https?:\/\/(?:www.)?twitch.tv\/(?:(videos)\/)?([a-zA-Z0-9][\w]{3,24})/i;
exports.DAPPLR_REGEX = /^(https?:)?\/\/[a-z]*\.dapplr.in\/file\/dapplr-videos\/.*/i;
exports.TRUVVL_REGEX = /^https?:\/\/embed.truvvl.com\/(@[\w.\d-]+)\/(.*)/i;
exports.LBRY_REGEX = /^(https?:)?\/\/lbry.tv\/\$\/embed\/.*/i;
exports.ODYSEE_REGEX = /^(https?:)?\/\/odysee.com\/\$\/embed\/.*/i;
exports.ARCH_REGEX = /^(https?:)?\/\/archive.org\/embed\/.*/i;
exports.SPEAK_REGEX = /(?:https?:\/\/(?:3speak.([a-z]+)\/watch\?v=)|(?:3speak.([a-z]+)\/embed\?v=))([A-Za-z0-9\_\-\.\/]+)(&.*)?/i;
exports.TWITTER_REGEX = /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/gi;
exports.SPOTIFY_REGEX = /^https:\/\/open\.spotify\.com\/playlist\/(.*)?$/gi;
//# sourceMappingURL=regexes.const.js.map