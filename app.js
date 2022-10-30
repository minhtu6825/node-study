var http = require('http');
const axios = require('axios');
// console.log(1);
let key;

async function getKey() {
  await axios.get('https://www.flickr.com').then(
    res1 => {
      // console.log('res:', res1.data);
      let dt_str = res1.data;
      let temp_idx = dt_str.indexOf('site_key = ');
      let startIndex = dt_str.indexOf('"', temp_idx + 1);
      // console.log(startIndex);
      let endIndex = dt_str.indexOf('";', startIndex + 1);
      // console.log(endIndex);
      key = dt_str.substring(startIndex + 1, endIndex);
      console.log(key);
      getData();
    }
  ).catch(
    err => {
      console.log('err:', err);
    }
  ).finally(
    console.log('request by axios done')
  )
}

async function getData() {
  await axios.get(`https://api.flickr.com/services/rest?extras=can_addmeta,can_comment,can_download,can_print,can_share,contact,count_comments,count_faves,count_views,date_taken,date_upload,description,icon_urls_deep,isfavorite,ispro,license,media,needs_interstitial,owner_name,owner_datecreate,path_alias,perm_print,realname,rotation,safety_level,secret_k,secret_h,url_sq,url_q,url_t,url_s,url_n,url_w,url_m,url_z,url_c,url_l,url_h,url_k,url_3k,url_4k,url_f,url_5k,url_6k,url_o,visibility,visibility_source,o_dims,publiceditability,system_moderation&per_page=500&page=1&get_user_info=1&jump_to=&user_id=184021330@N06&viewerNSID=&method=flickr.favorites.getList&csrf=&api_key=${key}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`).then(
    res1 => {
      console.log('res:', res1.data);

      http.createServer(function (req, res) {
        console.log(`Just got a request at ${req.url}!`)
        res.write(JSON.stringify(res1.data));
        res.end();
      }).listen(process.env.PORT || 3001);
    }
  ).catch(
    err => {
      console.log('err:', err);
    }
  ).finally(
    console.log('request by axios done')
  )
}
getKey();
