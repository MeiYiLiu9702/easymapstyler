

function changeSize() {
  setTimeout(function () {
    map.updateSize();
}, 10);
}
// 
function loadJsonSourceWithAjax(url){
    var source=new ol.source.Vector({});  
    $.ajax({
      url: url,
      dataType: "json",
      success: function(geojson){
        var options={};
        if(
          typeof(geojson.crs                )!='undefined' && 
          typeof(geojson.crs.properties     )!='undefined' && 
          typeof(geojson.crs.properties.name)!='undefined' 
        ){
          options={
            dataProjection: ol.proj.get(geojson.crs.properties.name),    //'EPSG:3826','EPSG:4326'
            featureProjection: ol.proj.get('EPSG:3857'),
          };
        }
        var features = (new ol.format.GeoJSON()).readFeatures(geojson,options);
        source.addFeatures(features);
        
        console.log(features.length);
      }
    });  
    return source;
  }

// 加入投影座標系統
// wgs84
proj4.defs('urn:ogc:def:crs:OGC:1.3:CRS:84',  proj4.defs('EPSG:4326'));
// twd97
proj4.defs('EPSG:3826', "+title=二度分帶：TWD97 TM2 台灣 +proj=tmerc  +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs");
// 地圖底圖
// 中心預設經緯度
var init_lon = 121.517268;
var init_lat = 25.046719;
var init_zoom = 11;
var user_loc = null;
// 開地圖底圖圖台
var view = new ol.View({
    center: ol.proj.fromLonLat([init_lon,init_lat]), // 直接用經緯度座標，所以不用另外轉座標系統
    zoom: init_zoom,
    minZoom: 4,
    maxZoom:20
});

var map = new ol.Map({
    layers:[],
    target:'Map', // 欲顯示的div的位置
    view = view,
    interactions: ol.interaction.defaults({ doubleClickZoom: false }),
});

// 增加圖層
var layers = {
    'OSM': {
        'title': 'OpenStreetMap',
        'type': 'base',
        'layer': new ol.layer.Tile({
            visible:false,
            source: new ol.source.OSM()
        })
    },
};


var setLayer=function(key){     //function setLayer(idx)
    for (i = 0; i < Object.keys(layers).length; i++) {
      var tlayer = layers[Object.keys(layers)[i]];
      if (tlayer.type == 'base') 
        layers[Object.keys(layers)[i]].layer.setVisible(Object.keys(layers)[i]==key);    
    }
  }
  

function initLayers() {
    //console.log("layers:",layers[Object.keys(layers)[0]].layer);
    //console.log("layers:",Object.keys(layers)[0].layer);
    for (i = 0; i < Object.keys(layers).length; i++) {
      var tlayer = layers[Object.keys(layers)[i]];
      if (tlayer.type == 'base') {
        $('<div class="radio"><label><input type="radio" class="basecontrol" name="baselayer" id=' + Object.keys(layers)[i] + ' value="' + Object.keys(layers)[i] +'"'+ (i==2?' checked':'')   +' >' + tlayer.title + '</label></div>').appendTo("#baselayerlist");
        //console.log(layers[Object.keys(layers)[i]].title);
        map.addLayer(tlayer.layer);           
      }else if(tlayer.type == 'overlay') {
        $('<div class="checkbox"><label><input type="checkbox" class="overlaycontrol" name="overlayer" value="' + Object.keys(layers)[i] + '">' + tlayer.title + '</label></div>').appendTo("#overlayerlist");
        map.addLayer(tlayer.layer);
        tlayer.layer.setZIndex(10000-i);
        tlayer.layer.setStyle(styleFunction(Object.keys(layers)[i]));
      }
    }
   
  }

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
    console.log(map.getView().calculateExtent(map.getSize()));
    setLayer('OpenStreetMap');
    $("input.basecontrol").change(function() {
      if($(this).is(':checked'))
        setLayer($(this).attr('value'));    
    });
});




// https://api.mapbox.com/styles/v1/meiyiliu/ckghuxlgr0t6u19p2ksvd8woj/wmts?access_token=pk.eyJ1IjoibWVpeWlsaXUiLCJhIjoiY2p5bG1iYzhwMDV6aTNscGVzNGd5aWFyOSJ9.mfB2eRaIf1l5p6KlCNCgsw