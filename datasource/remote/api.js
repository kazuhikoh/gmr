const Rx = require('rxjs/Rx');
const axios = require('axios');

class Api {
  constructor(config) {
    this.axios = axios.create({
      headers: config.headers,
    });

    this.urlGetFeeds = config.urlGetFeeds;
    this.urlGetMypageActivity = config.urlGetMypageActivity;

    this.urlGetOfficialFeeds = config.urlGetOfficialFeeds;

    this.urlGetMusicAlbums = config.urlGetMusicAlbums;
    this.urlGetMusicAlbumDetail = config.urlGetMusicAlbumDetail;
    this.urlGetDownloadURL = config.urlGetDownloadURL;

    this.urlGetBooks = config.urlGetBooks;
    this.urlGetBookEpisodes = config.urlGetBookEpisodes;
    this.urlGetBookEpisodePages = config.urlGetBookEpisodePages;
    
    this.urlGetUser = config.urlGetUser;
  }

  async httpGet(urlSkel, arg1, arg2, arg3) {
    let url = urlSkel
    if (arg1 != null) { url = url.replace(/ 1 /, arg1) }
    if (arg2 != null) { url = url.replace(/ 2 /, arg2) }
    if (arg3 != null) { url = url.replace(/ 3 /, arg3) }
      
    const res = await this.axios.get(url)

    if (!res.data.head || !res.data.head.resultCode || !res.data.head.resultCode.match(/^SS.*/g)) {
      const json = JSON.stringify(res.data, undefined, null)
      throw json
    }

    return res.data
  }

  async getFeeds(arg1, arg2, arg3) {
    const body = await this.httpGet(this.urlGetFeeds, arg1, arg2, arg3)
    return body.data.feed_list
  }

  async getMypageActivity(arg1, arg2, arg3) {
    const body = await this.httpGet(this.urlGetMypageActivity, arg1, arg2, arg3)
    return body.data.activity_list
  }

  async getOfficialFeeds(arg1, arg2) {
    const body = await this.httpGet(this.urlGetOfficialFeeds, arg1, arg2)
    return body.data.fanfeed_list_info
  }

  async getMusicAlbums(arg1, arg2) {
    const body = await this.httpGet(this.urlGetMusicAlbums, arg1, arg2)
    return body.data.music_album_list_info
  }

  async getMusicAlbumDetail(arg1, arg2) {
    const body = await this.httpGet(this.urlGetMusicAlbumDetail, arg1, arg2)
    return body.data.album_detail_info.track_info
  }

  async getDownloadURL(arg1) {
    const body = await this.httpGet(this.urlGetDownloadURL, arg1)
    return body.data.url
  }

  async getBooks(arg1, arg2) {
    const body = await this.httpGet(this.urlGetBooksi, arg1, arg2)
    return body.data.book_info
  }

  async getBookEpisodes(arg1) {
    const body = await this.httpGet(this.urlGetBookEpisodes, arg1)
    return body.data.book_episode_list_info
  }

  async getBookEpisodePages(arg1, arg2, arg3) {
    const body = await this.httpGet(this.urlGetBookEpisodePages, arg1, arg2, arg3)
    return body.data.book_res_info
  }

  async getUser(arg1) {
    const body = await this.httpGet(this.urlGetUser, arg1)
    return body.data
  }

}

module.exports = Api;
