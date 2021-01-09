// 加入投影座標系統
// wgs84
proj4.defs('urn:ogc:def:crs:OGC:1.3:CRS:84',  proj4.defs('EPSG:4326'));
// twd97
proj4.defs('EPSG:3826', "+title=二度分帶：TWD97 TM2 台灣 +proj=tmerc  +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs");
// 地圖底圖



$(function(){
    var window_size = $(window).height();
    var window_w_size = $(window).width();
    var top_h = $("#navBar").outerHeight();
    var bottom_h = $("#footer").outerHeight();
    $(".map").height(window_size-top_h-bottom_h);
    $(".map").last().offset({ top: top_h, bottom: bottom_h});
    // console.log(window_size);
    if( window_w_size < 600){
        console.log(window_w_size);
        $(".map").height((window_size-top_h-bottom_h)*0.75);
        var map_size = $("#Map").outerHeight();
        console.log(map_size);
        $("#Map").removeClass( "col-8" );
        $("#Map").toggleClass('col-12');
        $("#description").offset({top: map_size+top_h});
        $("#description").removeClass( "col-4" );
        $("#description").toggleClass('col-12');      
    }else{    
        console.log(window_w_size);
    }
    var map = new ol.Map({
      target: 'Map',
      layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([121.517268, 25.046719,]),
          zoom: 11
        })
  });
});

function changeSize() {
  setTimeout(function () {
    map.updateSize();
}, 10);
}

// https://api.mapbox.com/styles/v1/meiyiliu/ckghuxlgr0t6u19p2ksvd8woj/wmts?access_token=pk.eyJ1IjoibWVpeWlsaXUiLCJhIjoiY2p5bG1iYzhwMDV6aTNscGVzNGd5aWFyOSJ9.mfB2eRaIf1l5p6KlCNCgsw